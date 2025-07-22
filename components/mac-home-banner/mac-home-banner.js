/**
 * MAC Home Banner Component for Neve Child Theme
 * 
 * This component creates a hero banner specifically for the home page
 * with customizable title, subtitle, CTA button, and background media support.
 */

(function (blocks, i18n, element, editor, components) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var RichText = editor.RichText;
    var MediaUpload = editor.MediaUpload;
    var InspectorControls = editor.InspectorControls;
    var PanelBody = components.PanelBody;
    var PanelRow = components.PanelRow;
    var Button = components.Button;
    var TextControl = components.TextControl;

    registerBlockType('neve-child/mac-home-banner', {
        title: i18n.__('MAC Home Banner', 'neve-child'),
        icon: 'cover-image',
        category: 'design',
        description: i18n.__('Hero banner component for the Mississauga Arts Council homepage', 'neve-child'),
        keywords: [
            i18n.__('banner', 'neve-child'),
            i18n.__('hero', 'neve-child'),
            i18n.__('home', 'neve-child'),
        ],

        attributes: {
            banner_title: {
                type: 'string',
                default: 'Welcome to Mississauga Arts Council'
            },
            banner_subtitle: {
                type: 'string',
                default: 'Empowering creativity and fostering artistic expression in our community'
            },
            banner_button_text: {
                type: 'string',
                default: 'JOIN NOW'
            },
            banner_button_link: {
                type: 'string',
                default: '/mac-membership'
            },
            banner_background_image: {
                type: 'object',
                default: null
            },
            banner_video_url: {
                type: 'string',
                default: ''
            }
        },

        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            function onChangeBannerTitle(newTitle) {
                setAttributes({ banner_title: newTitle });
            }

            function onChangeBannerSubtitle(newSubtitle) {
                setAttributes({ banner_subtitle: newSubtitle });
            }

            function onChangeBannerButtonText(newText) {
                setAttributes({ banner_button_text: newText });
            }

            function onChangeBannerButtonLink(newLink) {
                setAttributes({ banner_button_link: newLink });
            }

            function onSelectBackgroundImage(media) {
                setAttributes({ 
                    banner_background_image: {
                        url: media.url,
                        alt: media.alt || ''
                    }
                });
            }

            function onRemoveBackgroundImage() {
                setAttributes({ banner_background_image: null });
            }

            function onChangeBannerVideoUrl(newUrl) {
                setAttributes({ banner_video_url: newUrl });
            }

            var bannerStyle = {
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                backgroundImage: attributes.banner_background_image ? 'url(' + attributes.banner_background_image.url + ')' : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: attributes.banner_background_image ? 'transparent' : '#cc6349'
            };

            return [
                el(InspectorControls, {},
                    el(PanelBody, { title: i18n.__('Content Settings', 'neve-child') },
                        el(PanelRow, {},
                            el(TextControl, {
                                label: i18n.__('Banner Title', 'neve-child'),
                                value: attributes.banner_title,
                                onChange: onChangeBannerTitle
                            })
                        ),
                        el(PanelRow, {},
                            el(TextControl, {
                                label: i18n.__('Banner Subtitle', 'neve-child'),
                                value: attributes.banner_subtitle,
                                onChange: onChangeBannerSubtitle
                            })
                        ),
                        el(PanelRow, {},
                            el(TextControl, {
                                label: i18n.__('Button Text', 'neve-child'),
                                value: attributes.banner_button_text,
                                onChange: onChangeBannerButtonText
                            })
                        ),
                        el(PanelRow, {},
                            el(TextControl, {
                                label: i18n.__('Button Link', 'neve-child'),
                                value: attributes.banner_button_link,
                                onChange: onChangeBannerButtonLink
                            })
                        )
                    ),
                    el(PanelBody, { title: i18n.__('Background Media', 'neve-child') },
                        el(PanelRow, {},
                            el(TextControl, {
                                label: i18n.__('Video URL (MP4)', 'neve-child'),
                                value: attributes.banner_video_url,
                                onChange: onChangeBannerVideoUrl,
                                help: i18n.__('Video will take priority over background image', 'neve-child')
                            })
                        ),
                        el(PanelRow, {},
                            el(MediaUpload, {
                                onSelect: onSelectBackgroundImage,
                                type: 'image',
                                value: attributes.banner_background_image ? attributes.banner_background_image.url : '',
                                render: function (obj) {
                                    return el(Button, {
                                        className: attributes.banner_background_image ? 'image-button' : 'button button-large',
                                        onClick: obj.open
                                    },
                                        !attributes.banner_background_image ? i18n.__('Upload Background Image', 'neve-child') :
                                            el('img', { 
                                                src: attributes.banner_background_image.url, 
                                                style: { width: '100%', height: 'auto', maxHeight: '100px' } 
                                            })
                                    );
                                }
                            })
                        ),
                        attributes.banner_background_image && el(PanelRow, {},
                            el(Button, {
                                className: 'button',
                                onClick: onRemoveBackgroundImage
                            }, i18n.__('Remove Background Image', 'neve-child'))
                        )
                    )
                ),
                el('div', {
                    className: 'mac-home-banner-preview',
                    style: bannerStyle
                },
                    (attributes.banner_background_image || attributes.banner_video_url) && el('div', { 
                        className: 'banner-overlay', 
                        style: { 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0, 
                            backgroundColor: 'rgba(0, 0, 0, 0.4)' 
                        } 
                    }),
                    el('div', { 
                        className: 'banner-content',
                        style: { 
                            position: 'relative', 
                            zIndex: 1, 
                            maxWidth: '800px',
                            padding: '20px'
                        }
                    },
                        el('h1', {
                            className: 'banner-title',
                            style: {
                                fontSize: '2.5rem',
                                fontWeight: '700',
                                marginBottom: '20px',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                            }
                        }, attributes.banner_title),
                        el('p', {
                            className: 'banner-subtitle',
                            style: {
                                fontSize: '1.2rem',
                                marginBottom: '30px',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
                            }
                        }, attributes.banner_subtitle),
                        el('a', {
                            href: '#',
                            className: 'banner-cta btn btn-red',
                            style: {
                                backgroundColor: '#cc6349',
                                color: 'white',
                                padding: '15px 30px',
                                borderRadius: '25px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                display: 'inline-block',
                                border: '2px solid #cc6349'
                            }
                        }, attributes.banner_button_text)
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