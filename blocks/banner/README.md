# Banner Block Documentation

## Overview

The Banner Block is a custom WordPress Gutenberg block that allows content creators to add visually appealing banner sections to their pages and posts. This block provides a user-friendly interface for creating hero sections, call-to-action banners, and promotional content.

## Features

- **Customizable Content**: Editable title and subtitle with rich text formatting
- **Background Options**: Support for both background images and solid colors
- **Layout Control**: Three alignment options (left, center, right)
- **Height Variations**: Three size options (small/300px, medium/500px, large/700px)
- **Text Styling**: Customizable text colors for title and subtitle
- **Button Integration**: Optional call-to-action button with customizable text and URL
- **Overlay Effects**: Adjustable overlay opacity for background images (0-100%)
- **Responsive Design**: Mobile-friendly breakpoints and styling

## Block Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | "" | Main banner title text |
| `subtitle` | string | "" | Banner subtitle text |
| `backgroundImage` | string | "" | Background image URL |
| `backgroundColor` | string | "" | Background color (hex code) |
| `titleColor` | string | "" | Title text color |
| `subtitleColor` | string | "" | Subtitle text color |
| `alignment` | string | "left" | Text alignment (left, center, right) |
| `height` | string | "medium" | Banner height (small, medium, large) |
| `buttonText` | string | "" | Button text |
| `buttonUrl` | string | "" | Button URL |
| `overlayOpacity` | number | 50 | Background image overlay opacity (0-100) |

## Usage

### Adding the Banner Block

1. In the WordPress editor, click the "+" button to add a new block
2. Search for "Banner" or find it in the "Design" category
3. Click to insert the banner block

### Configuring the Banner

#### Content Settings
- **Title**: Click to edit the main banner title
- **Subtitle**: Click to edit the subtitle text below the title

#### Background Settings (Inspector Panel)
- **Background Image**: Upload or select an image from the media library
- **Background Color**: Choose a solid color background (alternative to image)
- **Overlay Opacity**: Adjust the dark overlay on background images (0-100%)

#### Layout Settings (Inspector Panel)
- **Alignment**: Choose text alignment (Left, Center, Right)
- **Height**: Select banner height (Small: 300px, Medium: 500px, Large: 700px)

#### Text Colors (Inspector Panel)
- **Title Color**: Set custom color for the title text
- **Subtitle Color**: Set custom color for the subtitle text

#### Button Settings (Inspector Panel)
- **Button Text**: Enter text for the call-to-action button
- **Button URL**: Enter the destination URL for the button

## CSS Classes

The banner block generates the following CSS classes:

- `.neve-banner-block` - Main banner container
- `.neve-banner-content` - Content wrapper
- `.neve-banner-title` - Title element
- `.neve-banner-subtitle` - Subtitle element
- `.neve-banner-button` - Button element
- `.neve-banner-overlay` - Background image overlay

### Height Modifiers
- `.neve-banner-small` - 300px height
- `.neve-banner-medium` - 500px height (default)
- `.neve-banner-large` - 700px height

### Alignment Modifiers
- `.neve-banner-left` - Left-aligned content (default)
- `.neve-banner-center` - Center-aligned content
- `.neve-banner-right` - Right-aligned content

## Responsive Behavior

The banner block is fully responsive and includes:

- Mobile-optimized font sizes
- Flexible height adjustments on smaller screens
- Proper button spacing and sizing
- Overlay adjustments for better mobile readability

### Mobile Breakpoints
- Screens ≤ 768px: Reduced padding and font sizes
- Flexible height scaling maintains proportions

## Implementation Details

### File Structure
```
/wp-content/themes/neve-child/blocks/banner/
├── block.json (block configuration)
├── render.php (server-side rendering)
├── style.css (frontend styles)
├── banner-block.js (Gutenberg editor)
└── README.md (this file)
```

### Modular Architecture
The banner block is part of a modular block system that:
- **Automatically discovers** blocks in the `/blocks/` directory
- **Loads configuration** from `block.json`
- **Registers blocks** without manual configuration
- **Handles asset loading** automatically

### Server-Side Rendering
The banner block uses server-side rendering through the `neve_child_render_banner_block()` function in `render.php`. This ensures consistent output and better performance.

### Block Registration
The block is automatically registered by the blocks loader system (`/inc/blocks-loader.php`) using the configuration from `block.json`.

## Customization

### Extending Styles
To customize the banner block appearance, add CSS rules targeting the banner classes in your theme's `style.css` file:

```css
.neve-banner-block {
    /* Your custom styles here */
}
```

### Adding New Attributes
To add new attributes to the banner block:

1. Update the `attributes` array in the block registration (`functions.php`)
2. Add corresponding controls in the JavaScript file (`banner-block.js`)
3. Update the render function to handle the new attributes
4. Add styling for the new features

## Troubleshooting

### Common Issues

**Banner not displaying correctly:**
- Check that the theme is properly activated
- Verify that the JavaScript file is being loaded
- Ensure CSS styles are not being overridden by other themes

**Background image not showing:**
- Verify the image URL is correct and accessible
- Check that the image file exists in the media library
- Ensure proper file permissions

**Button not working:**
- Verify the button URL is properly formatted (include http:// or https://)
- Check for JavaScript errors in the browser console

### Browser Compatibility
The banner block is compatible with all modern browsers including:
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Support

For technical support or bug reports related to the banner block, please contact the theme developer or refer to the WordPress documentation for custom blocks.