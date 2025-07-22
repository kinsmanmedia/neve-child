# Mississauga Arts Council - Neve Child Theme

A comprehensive WordPress child theme built specifically for the Mississauga Arts Council, featuring a modular component system, consistent design variables, and responsive layouts.

## 🎨 Brand Identity

**Primary Color**: `#CC6349` (MAC Red)  
**Secondary Color**: `#007CBA` (Blue)  
**Typography**: Clean, accessible font stack with proper hierarchy  
**Design Philosophy**: Modern, arts-focused, community-centered design

## 🏗️ Architecture Overview

This theme uses a modular component-based architecture with automatic discovery and registration:

```
neve-child/
├── assets/
│   └── css/
│       └── variables.css          # Global CSS variables
├── components/                    # Modular component system
│   ├── mac-banner/               # General banner component
│   ├── mac-header/               # Custom header with navigation
│   └── mac-home-banner/          # Homepage hero banner
├── inc/
│   └── blocks-loader.php         # Automatic component discovery
├── functions.php                 # Theme setup and enqueuing
└── style.css                     # Main theme styles
```

## 🧩 Component System

### Automatic Component Discovery

The theme automatically discovers and registers components from the `components/` directory. Each component requires:

1. **`block.json`** - WordPress block configuration
2. **`render.php`** - Server-side rendering with render function
3. **`style.css`** - Component-specific styles
4. **`[component-name].js`** - WordPress editor interface (optional)

### Example Component Structure

```
components/mac-example/
├── block.json           # Block configuration
├── render.php           # PHP render function
├── style.css           # Component styles
├── mac-example.js      # Editor interface
└── README.md           # Component documentation
```

## 📦 Available Components

### 🏠 MAC Header (`mac-header`)
Custom header component with:
- **Desktop**: Logo left, CTA button right, main navigation below
- **Mobile**: Hamburger menu with slide-out navigation and bottom CTA
- **Features**: Responsive design, smooth animations, accessibility support

**Usage**: Template part replacement in theme files
```php
get_template_part('components/mac-header/header-template');
```

### 🎯 MAC Banner (`mac-banner`)
General-purpose banner component with:
- Customizable background (image/color)
- Configurable text alignment and colors
- Optional call-to-action button
- Multiple height options

**Usage**: Available in WordPress block editor under "Design" category

### 🌟 MAC Home Banner (`mac-home-banner`)
Homepage hero banner with:
- Full-height responsive design
- Video or image background support
- Customizable title, subtitle, and CTA
- Brand-consistent styling

**Usage**: Available in WordPress block editor under "Design" category

## 🎨 CSS Variables System

Global design system powered by CSS custom properties:

### Brand Colors
```css
--mac-color-primary: #CC6349;           /* MAC Red */
--mac-color-primary-dark: #a04e3a;      /* Darker red */
--mac-color-secondary: #007cba;          /* Blue */
--mac-color-white: #ffffff;             /* White */
--mac-color-gray-dark: #333333;         /* Dark gray */
```

### Layout Variables
```css
--mac-header-height-desktop: 150px;     /* Desktop header height */
--mac-header-height-mobile: 90px;       /* Mobile header height */
--mac-container-max-width: 2400px;      /* Max container width */
--mac-breakpoint-mobile: 760px;         /* Mobile breakpoint */
```

### Effect Variables
```css
--mac-shadow-light: 0 2px 4px rgba(0, 0, 0, 0.1);
--mac-shadow-medium: 0 4px 12px rgba(204, 99, 73, 0.3);
--mac-transition-fast: 0.3s ease;
--mac-border-radius-large: 25px;
```

## 📱 Responsive Design

The theme follows a mobile-first approach with these breakpoints:

- **Mobile**: ≤ 760px
- **Tablet**: 768px - 1199px  
- **Desktop**: ≥ 1200px
- **Wide**: ≥ 2400px (max container width)

## 🔧 Development Workflow

### Adding New Components

1. **Create component directory**:
   ```bash
   mkdir components/mac-new-component
   ```

2. **Create required files**:
   ```
   components/mac-new-component/
   ├── block.json
   ├── render.php
   ├── style.css
   └── mac-new-component.js
   ```

3. **Component automatically discovered** - No additional registration needed!

### Using CSS Variables

Always use CSS variables for consistent theming:

```css
/* Good ✅ */
.my-component {
  color: var(--mac-color-primary);
  box-shadow: var(--mac-shadow-medium);
  transition: var(--mac-transition-fast);
}

/* Avoid ❌ */
.my-component {
  color: #CC6349;
  box-shadow: 0 4px 12px rgba(204, 99, 73, 0.3);
  transition: 0.3s ease;
}
```

### Component Styling Best Practices

1. **Import variables** at the top of component CSS:
   ```css
   @import url("../../assets/css/variables.css");
   ```

2. **Use BEM-style naming** for CSS classes:
   ```css
   .mac-component {}
   .mac-component__element {}
   .mac-component--modifier {}
   ```

3. **Follow the established structure**:
   ```css
   /* Component-specific imports and variables */
   /* Base component styles */
   /* Element styles */
   /* Modifier styles */
   /* Responsive styles */
   /* Accessibility styles */
   ```

## 🎯 Block.json Configuration

Standard block configuration structure:

```json
{
  "name": "neve-child/mac-component-name",
  "title": "MAC Component Name",
  "description": "Component description for the editor",
  "category": "design",
  "icon": "format-image",
  "keywords": ["keyword1", "keyword2"],
  "supports": {
    "html": false,
    "align": ["wide", "full"]
  },
  "attributes": {
    "attributeName": {
      "type": "string",
      "default": "Default value"
    }
  }
}
```

## 🔄 Render Function Pattern

Standard PHP render function structure:

```php
<?php
function neve_child_render_mac_component_name_block($attributes, $content) {
    // Extract attributes with defaults
    $title = $attributes['title'] ?? 'Default Title';
    
    // Start output buffering
    ob_start();
    ?>
    
    <div class="mac-component-name">
        <h2><?php echo esc_html($title); ?></h2>
    </div>
    
    <?php
    return ob_get_clean();
}
?>
```

## ⚡ Performance Considerations

### Asset Loading Order
1. **Variables CSS** (highest priority)
2. **Parent theme styles**
3. **Child theme main styles**
4. **Component styles** (as dependencies)

### Component Dependencies
- All components automatically depend on `neve-child-variables`
- Components are loaded only when used (WordPress blocks)
- JavaScript components load conditionally

## 🔒 Security & Best Practices

### PHP Security
- All files include `ABSPATH` checks
- All output is escaped with `esc_html()`, `esc_url()`, `esc_attr()`
- No direct file access allowed

### CSS Security
- No inline styles in PHP
- All styles loaded through proper WordPress enqueue system
- CSS variables prevent style injection

## 🎨 Customization Guide

### Updating Brand Colors
Edit `assets/css/variables.css`:

```css
:root {
  --mac-color-primary: #YourNewColor;
  --mac-color-primary-dark: #DarkerVersion;
}
```

### Adding New Breakpoints
1. Add to variables:
   ```css
   --mac-breakpoint-custom: 1440px;
   ```

2. Use in components:
   ```css
   @media only screen and (min-width: 1440px) {
     /* Custom breakpoint styles */
   }
   ```

### Extending Components
Create new component variations by copying existing structure and modifying:
- Update `block.json` with new name and title
- Modify render function name
- Customize styles while using shared variables

## 🛠️ Troubleshooting

### Component Not Appearing in Editor
1. Check `block.json` syntax is valid
2. Ensure render function name matches pattern: `neve_child_render_{component_name}_block`
3. Verify all required files exist
4. Clear WordPress caches

### Styles Not Loading
1. Check CSS syntax in component styles
2. Ensure variables are imported: `@import url("../../assets/css/variables.css");`
3. Verify file permissions
4. Check browser developer tools for 404 errors

### JavaScript Errors
1. Check console for syntax errors
2. Ensure WordPress dependencies are correct: `wp-blocks`, `wp-element`, `wp-editor`
3. Verify component registration matches `block.json`

## 📞 Support & Maintenance

For questions, issues, or feature requests related to this theme:

1. **Documentation**: Check component README files in respective directories
2. **Code Standards**: Follow WordPress coding standards and established patterns
3. **Testing**: Test all components on mobile, tablet, and desktop
4. **Accessibility**: Ensure WCAG compliance for all new components

---

**Theme Version**: 1.0.0  
**WordPress Compatibility**: 5.0+  
**Parent Theme**: Neve  
**Created for**: Mississauga Arts Council

*Built with ❤️ for the arts community*