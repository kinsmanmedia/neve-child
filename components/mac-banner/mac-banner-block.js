/**
 * MAC Banner Component for Neve Child Theme
 * 
 * This component allows non-technical users to easily create customizable banners
 * for the Mississauga Arts Council with background images, colors, text, and call-to-action buttons.
 */

(function (blocks, i18n, element, editor, components) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var RichText = editor.RichText;
    var MediaUpload = editor.MediaUpload;
    var BlockControls = editor.BlockControls;
    var InspectorControls = editor.InspectorControls;
    var ColorPalette = editor.ColorPalette;
    var PanelBody = components.PanelBody;
    var PanelRow = components.PanelRow;
    var Button = components.Button;
    var SelectControl = components.SelectControl;
    var RangeControl = components.RangeControl;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var ToolbarGroup = components.ToolbarGroup;
    var ToolbarButton = components.ToolbarButton;

    registerBlockType('neve-child/mac-banner', {
        title: i18n.__('MAC Banner', 'neve-child'),
        icon: 'format-image',
        category: 'common',
        description: i18n.__('Create a customizable banner for Mississauga Arts Council with background, text, and button', 'neve-child'),
        keywords: [
            i18n.__('banner', 'neve-child'),
            i18n.__('hero', 'neve-child'),
            i18n.__('header', 'neve-child'),
        ],

        attributes: {
            title: {
                type: 'string',
                default: 'Welcome to Our Website'
            },
            subtitle: {
                type: 'string',
                default: ''
            },
            backgroundImage: {
                type: 'string',
                default: ''
            },
            backgroundColor: {
                type: 'string',
                default: '#007cba'
            },
            textColor: {
                type: 'string',
                default: '#ffffff'
            },
            textAlignment: {
                type: 'string',
                default: 'center'
            },
            bannerHeight: {
                type: 'string',
                default: 'medium'
            },
            overlayOpacity: {
                type: 'number',
                default: 0.5
            },
            buttonText: {
                type: 'string',
                default: 'Learn More'
            },
            buttonUrl: {
                type: 'string',
                default: '#'
            },
            showButton: {
                type: 'boolean',
                default: true
            }
        },

        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            function onChangeTitle(newTitle) {
                setAttributes({ title: newTitle });
            }

            function onChangeSubtitle(newSubtitle) {
                setAttributes({ subtitle: newSubtitle });
            }

            function onSelectImage(media) {
                setAttributes({ backgroundImage: media.url });
            }

            function onRemoveImage() {
                setAttributes({ backgroundImage: '' });
            }

            function onChangeBackgroundColor(color) {
                setAttributes({ backgroundColor: color });
            }

            function onChangeTextColor(color) {
                setAttributes({ textColor: color });
            }

            function onChangeAlignment(alignment) {
                setAttributes({ textAlignment: alignment });
            }

            function onChangeHeight(height) {
                setAttributes({ bannerHeight: height });
            }

            function onChangeOverlayOpacity(opacity) {
                setAttributes({ overlayOpacity: opacity });
            }

            function onChangeButtonText(text) {
                setAttributes({ buttonText: text });
            }

            function onChangeButtonUrl(url) {
                setAttributes({ buttonUrl: url });
            }

            function onToggleButton(show) {
                setAttributes({ showButton: show });
            }

            var heightClass = 'banner-height-' + attributes.bannerHeight;
            var alignmentClass = 'banner-text-' + attributes.textAlignment;

            var bannerStyle = {
                color: attributes.textColor,
                minHeight: attributes.bannerHeight === 'small' ? '300px' :
                    attributes.bannerHeight === 'medium' ? '500px' : '700px',
                backgroundImage: attributes.backgroundImage ? 'url(' + attributes.backgroundImage + ')' : 'none',
                backgroundColor: attributes.backgroundImage ? 'transparent' : attributes.backgroundColor,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: attributes.textAlignment === 'left' ? 'flex-start' :
                    attributes.textAlignment === 'right' ? 'flex-end' : 'center',
                textAlign: attributes.textAlignment,
                padding: '2rem'
            };

            var overlayStyle = {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, ' + attributes.overlayOpacity + ')',
                pointerEvents: 'none'
            };

            var contentStyle = {
                position: 'relative',
                zIndex: 1,
                maxWidth: '800px'
            };

            return [
                el(InspectorControls, {},
                    el(PanelBody, { title: i18n.__('Banner Settings', 'neve-child') },
                        el(PanelRow, {},
                            el(SelectControl, {
                                label: i18n.__('Banner Height', 'neve-child'),
                                value: attributes.bannerHeight,
                                options: [
                                    { label: i18n.__('Small (300px)', 'neve-child'), value: 'small' },
                                    { label: i18n.__('Medium (500px)', 'neve-child'), value: 'medium' },
                                    { label: i18n.__('Large (700px)', 'neve-child'), value: 'large' }
                                ],
                                onChange: onChangeHeight
                            })
                        ),
                        el(PanelRow, {},
                            el(SelectControl, {
                                label: i18n.__('Text Alignment', 'neve-child'),
                                value: attributes.textAlignment,
                                options: [
                                    { label: i18n.__('Left', 'neve-child'), value: 'left' },
                                    { label: i18n.__('Center', 'neve-child'), value: 'center' },
                                    { label: i18n.__('Right', 'neve-child'), value: 'right' }
                                ],
                                onChange: onChangeAlignment
                            })
                        )
                    ),
                    el(PanelBody, { title: i18n.__('Background', 'neve-child') },
                        el(PanelRow, {},
                            el(MediaUpload, {
                                onSelect: onSelectImage,
                                type: 'image',
                                value: attributes.backgroundImage,
                                render: function (obj) {
                                    return el(Button, {
                                        className: attributes.backgroundImage ? 'image-button' : 'button button-large',
                                        onClick: obj.open
                                    },
                                        !attributes.backgroundImage ? i18n.__('Upload Background Image', 'neve-child') :
                                            el('img', { src: attributes.backgroundImage, style: { width: '100%', height: 'auto' } })
                                    );
                                }
                            })
                        ),
                        attributes.backgroundImage && el(PanelRow, {},
                            el(Button, {
                                className: 'button',
                                onClick: onRemoveImage
                            }, i18n.__('Remove Background Image', 'neve-child'))
                        ),
                        attributes.backgroundImage && el(PanelRow, {},
                            el(RangeControl, {
                                label: i18n.__('Overlay Opacity', 'neve-child'),
                                value: attributes.overlayOpacity,
                                onChange: onChangeOverlayOpacity,
                                min: 0,
                                max: 1,
                                step: 0.1
                            })
                        ),
                        !attributes.backgroundImage && el(PanelRow, {},
                            el('p', {}, i18n.__('Background Color', 'neve-child')),
                            el(ColorPalette, {
                                value: attributes.backgroundColor,
                                onChange: onChangeBackgroundColor
                            })
                        )
                    ),
                    el(PanelBody, { title: i18n.__('Text Color', 'neve-child') },
                        el(PanelRow, {},
                            el(ColorPalette, {
                                value: attributes.textColor,
                                onChange: onChangeTextColor
                            })
                        )
                    ),
                    el(PanelBody, { title: i18n.__('Button Settings', 'neve-child') },
                        el(PanelRow, {},
                            el(ToggleControl, {
                                label: i18n.__('Show Button', 'neve-child'),
                                checked: attributes.showButton,
                                onChange: onToggleButton
                            })
                        ),
                        attributes.showButton && el(PanelRow, {},
                            el(TextControl, {
                                label: i18n.__('Button Text', 'neve-child'),
                                value: attributes.buttonText,
                                onChange: onChangeButtonText
                            })
                        ),
                        attributes.showButton && el(PanelRow, {},
                            el(TextControl, {
                                label: i18n.__('Button URL', 'neve-child'),
                                value: attributes.buttonUrl,
                                onChange: onChangeButtonUrl
                            })
                        )
                    )
                ),
                el('div', {
                    className: 'custom-banner ' + heightClass + ' ' + alignmentClass,
                    style: bannerStyle
                },
                    attributes.backgroundImage && el('div', { style: overlayStyle }),
                    el('div', { style: contentStyle },
                        el(RichText, {
                            tagName: 'h2',
                            className: 'banner-title',
                            value: attributes.title,
                            onChange: onChangeTitle,
                            placeholder: i18n.__('Enter banner title...', 'neve-child'),
                            style: {
                                color: attributes.textColor,
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem'
                            }
                        }),
                        el(RichText, {
                            tagName: 'p',
                            className: 'banner-subtitle',
                            value: attributes.subtitle,
                            onChange: onChangeSubtitle,
                            placeholder: i18n.__('Enter banner subtitle...', 'neve-child'),
                            style: {
                                color: attributes.textColor,
                                fontSize: '1.2rem',
                                marginBottom: '2rem'
                            }
                        }),
                        attributes.showButton && el('a', {
                            href: attributes.buttonUrl,
                            className: 'banner-button btn',
                            style: {
                                display: 'inline-block',
                                padding: '12px 24px',
                                backgroundColor: '#ffffff',
                                color: '#333333',
                                textDecoration: 'none',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }
                        }, attributes.buttonText)
                    )
                )
            ];
        },

        save: function (props) {
            // Return null since we're using a render callback
            return null;
        }
    });
})(
    window.wp.blocks,
    window.wp.i18n,
    window.wp.element,
    window.wp.editor,
    window.wp.components
);