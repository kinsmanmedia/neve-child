# Modular Blocks System

## Overview

This is a dynamic, modular block system that automatically discovers and registers WordPress Gutenberg blocks without requiring configuration in parent files. Simply create a new block folder with the required files, and it will be automatically loaded.

## How It Works

The system uses an automatic block loader (`/inc/blocks-loader.php`) that:

1. **Scans the blocks directory** for block folders
2. **Reads each block's configuration** from `block.json`
3. **Automatically registers blocks** with WordPress
4. **Loads associated assets** (CSS, JavaScript, PHP render files)

## Adding New Blocks

To add a new block, create a folder in `/blocks/` with these files:

### Required Files

1. **`block.json`** - Block configuration and metadata
2. **`render.php`** - Server-side rendering function
3. **`style.css`** - Frontend styles
4. **`{block-name}-block.js`** - Gutenberg editor JavaScript

### File Structure Example

```
blocks/
├── your-block/
│   ├── block.json
│   ├── render.php
│   ├── style.css
│   ├── your-block-block.js
│   └── README.md (optional)
```

## Block Configuration (`block.json`)

```json
{
  \"name\": \"neve-child/your-block\",
  \"title\": \"Your Block Title\",
  \"description\": \"Block description\",
  \"category\": \"design\",
  \"icon\": \"layout\",
  \"supports\": {
    \"align\": [\"wide\", \"full\"],
    \"html\": false
  },
  \"attributes\": {
    \"attribute1\": {
      \"type\": \"string\",
      \"default\": \"default value\"
    }
  },
  \"editorScript\": \"neve-child-your-block-block-editor\",
  \"style\": \"neve-child-your-block-block\"
}
```

## Render Function (`render.php`)

```php
<?php
if (!defined('ABSPATH')) {
    exit;
}

function neve_child_render_your_block_block($attributes, $content) {
    // Extract attributes
    $attribute1 = isset($attributes['attribute1']) ? $attributes['attribute1'] : '';
    
    // Build output
    ob_start();
    ?>
    <div class=\"your-block-class\">
        <!-- Your block HTML -->
    </div>
    <?php
    return ob_get_clean();
}
```

## JavaScript Editor (`{block-name}-block.js`)

```javascript
(function() {
    'use strict';

    const { registerBlockType } = wp.blocks;
    const { RichText, InspectorControls } = wp.editor;
    
    registerBlockType('neve-child/your-block', {
        title: 'Your Block Title',
        icon: 'layout',
        category: 'design',
        attributes: {
            // Define attributes
        },
        
        edit: function(props) {
            // Editor interface
        },
        
        save: function() {
            return null; // Server-side rendering
        }
    });
})();
```

## Available Blocks

### Banner Block (`banner/`)
- **Purpose**: Hero sections and promotional banners
- **Features**: Background images/colors, text overlay, buttons, height options
- **Usage**: Perfect for page headers and call-to-action sections

### Section Block (`section/`)
- **Purpose**: Content organization with styled backgrounds
- **Features**: Title, content, background colors, padding options, text alignment
- **Usage**: Ideal for content sections and text blocks

## System Features

### Automatic Asset Loading
- **CSS**: Automatically enqueued from `style.css`
- **JavaScript**: Automatically loaded from `{block-name}-block.js`
- **PHP**: Render functions automatically called from `render.php`

### Naming Conventions
- **Block namespace**: `neve-child/block-name`
- **CSS handle**: `neve-child-block-name-block`
- **JS handle**: `neve-child-block-name-block-editor`
- **Render function**: `neve_child_render_block_name_block()`

### File Naming Rules
- Block folder name becomes the block identifier
- JavaScript file must be named `{folder-name}-block.js`
- PHP render function must follow the pattern: `neve_child_render_{folder_name}_block()`

## Best Practices

### Block Development
1. **Use server-side rendering** for consistent output
2. **Implement proper escaping** in render functions
3. **Follow WordPress coding standards**
4. **Include comprehensive attributes** in `block.json`

### Performance
- Assets are only loaded when blocks are used
- File modification times used for cache busting
- Minimal overhead for unused blocks

### Security
- All render functions include `ABSPATH` checks
- Proper escaping of all output
- No direct file access allowed

## Troubleshooting

### Block Not Appearing
- Verify `block.json` exists and is valid JSON
- Check that folder name matches JavaScript filename
- Ensure render function name follows naming convention

### Styles Not Loading
- Confirm `style.css` exists in block folder
- Check file permissions
- Verify CSS handle naming convention

### JavaScript Errors
- Validate JavaScript syntax
- Check browser console for errors
- Ensure WordPress dependencies are declared

## Advanced Features

### Custom Categories
Add custom block categories by modifying the loader:

```php
function custom_block_categories($categories) {
    return array_merge($categories, array(
        array(
            'slug' => 'custom-category',
            'title' => 'Custom Blocks',
        ),
    ));
}
add_filter('block_categories', 'custom_block_categories');
```

### Block Variations
Create block variations by adding to `block.json`:

```json
{
  \"variations\": [
    {
      \"name\": \"variation-name\",
      \"title\": \"Variation Title\",
      \"attributes\": {
        \"attribute\": \"variation-value\"
      }
    }
  ]
}
```

## Migration from Old System

If you have existing blocks in `functions.php`:

1. **Create block folder** in `/blocks/`
2. **Move render function** to `render.php`
3. **Create `block.json`** with attributes
4. **Move styles** to `style.css`
5. **Update JavaScript** file location
6. **Remove old code** from `functions.php`

The modular system will automatically pick up your migrated blocks without any additional configuration.

## Support

For questions or issues with the modular block system, refer to the individual block documentation or the WordPress Block API documentation.