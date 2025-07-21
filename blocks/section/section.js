/**
 * Simple Banner Block for Neve Child Theme
 * 
 * A minimal banner block with just title, subtitle, and background color.
 */

(function (blocks, i18n, element, editor, components) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var RichText = editor.RichText;
    var InspectorControls = editor.InspectorControls;
    var ColorPalette = editor.ColorPalette;
    var PanelBody = components.PanelBody;
    var PanelRow = components.PanelRow;

    registerBlockType('neve-child/simple-banner', {
        title: i18n.__('Simple Banner', 'neve-child'),
        icon: 'format-image',
        category: 'common',
        description: i18n.__('A simple banner with title, subtitle, and background color', 'neve-child'),

        attributes: {
            title: {
                type: 'string',
                default: 'Your Title Here'
            },
            subtitle: {
                type: 'string',
                default: 'Your subtitle here'
            },
            backgroundColor: {
                type: 'string',
                default: '#007cba'
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

            function onChangeBackgroundColor(color) {
                setAttributes({ backgroundColor: color });
            }

            var bannerStyle = {
                backgroundColor: attributes.backgroundColor,
                color: '#ffffff',
                padding: '4rem 2rem',
                textAlign: 'center',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            };

            return [
                el(InspectorControls, {},
                    el(PanelBody, { title: i18n.__('Banner Settings', 'neve-child') },
                        el(PanelRow, {},
                            el('p', {}, i18n.__('Background Color', 'neve-child')),
                            el(ColorPalette, {
                                value: attributes.backgroundColor,
                                onChange: onChangeBackgroundColor
                            })
                        )
                    )
                ),
                el('div', {
                    className: 'simple-banner',
                    style: bannerStyle
                },
                    el(RichText, {
                        tagName: 'h2',
                        className: 'banner-title',
                        value: attributes.title,
                        onChange: onChangeTitle,
                        placeholder: i18n.__('Enter title...', 'neve-child'),
                        style: {
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            color: '#ffffff'
                        }
                    }),
                    el(RichText, {
                        tagName: 'p',
                        className: 'banner-subtitle',
                        value: attributes.subtitle,
                        onChange: onChangeSubtitle,
                        placeholder: i18n.__('Enter subtitle...', 'neve-child'),
                        style: {
                            fontSize: '1.2rem',
                            marginBottom: '0',
                            color: '#ffffff'
                        }
                    })
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