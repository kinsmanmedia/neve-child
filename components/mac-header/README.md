# MAC Header Component

This component contains the complete header functionality for the Mississauga Arts Council theme.

## Files

- `header-template.php` - The main header template part
- `style.css` - All header-related CSS styling
- `mac-header.js` - JavaScript for dropdown menus and mobile interactions

## Features

- Sticky header positioning
- Dropdown navigation menus (3 levels deep)
- Mobile-responsive design with hamburger menu
- Touch-friendly interactions
- Keyboard accessibility
- Integration with WordPress menu system

## Usage

This component is automatically loaded by the main `header.php` template using:

```php
get_template_part('components/mac-header/header-template');
```

## Menu Locations

The component supports two menu locations:
- `header-menu` - Secondary navigation in the top section
- `primary` - Main navigation menu

## Customization

All styling can be customized in `style.css`. The component uses the following CSS classes:

- `.custom-header` - Main header container
- `.custom-header-container` - Inner container with max-width
- `.header-top` - Top section with logo and secondary menu
- `.main-navigation` - Primary navigation section
- `.primary-menu` - Primary menu styling
- `.header-menu` - Secondary menu styling