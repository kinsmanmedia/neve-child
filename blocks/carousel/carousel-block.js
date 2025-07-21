(function() {
    'use strict';

    const { registerBlockType } = wp.blocks;
    const { RichText, InspectorControls } = wp.editor;
    const { PanelBody, Button } = wp.components;
    const { Fragment } = wp.element;

    registerBlockType('neve-child/carousel', {
        title: 'Carousel Block',
        description: 'A simple carousel block for displaying multiple slides.',
        icon: 'images-alt2',
        category: 'design',
        attributes: {
            slides: {
                type: 'array',
                default: [
                    { content: '' }
                ]
            }
        },

        edit: function(props) {
            const { attributes, setAttributes } = props;
            const { slides } = attributes;

            function addSlide() {
                const newSlides = [...slides, { content: '' }];
                setAttributes({ slides: newSlides });
            }

            function removeSlide(index) {
                if (slides.length > 1) {
                    const newSlides = slides.filter((_, i) => i !== index);
                    setAttributes({ slides: newSlides });
                }
            }

            function updateSlide(index, content) {
                const newSlides = [...slides];
                newSlides[index] = { content };
                setAttributes({ slides: newSlides });
            }

            return wp.element.createElement(Fragment, null,
                wp.element.createElement(InspectorControls, null,
                    wp.element.createElement(PanelBody, { title: 'Carousel Settings' },
                        wp.element.createElement('p', null, `Slides: ${slides.length}`),
                        wp.element.createElement(Button, {
                            isPrimary: true,
                            onClick: addSlide
                        }, 'Add Slide'),
                        slides.length > 1 && wp.element.createElement('p', { style: { marginTop: '10px' } },
                            'Use the remove button on individual slides to delete them.'
                        )
                    )
                ),
                wp.element.createElement('div', { 
                    className: 'neve-carousel-editor',
                    style: { 
                        border: '2px dashed #ccc',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '20px'
                    }
                },
                    wp.element.createElement('h4', { 
                        style: { 
                            margin: '0 0 20px 0',
                            textAlign: 'center',
                            color: '#666'
                        }
                    }, `Carousel (${slides.length} slides)`),
                    slides.map((slide, index) =>
                        wp.element.createElement('div', {
                            key: index,
                            style: {
                                marginBottom: '20px',
                                padding: '15px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                backgroundColor: '#f9f9f9'
                            }
                        },
                            wp.element.createElement('div', {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '10px'
                                }
                            },
                                wp.element.createElement('strong', null, `Slide ${index + 1}`),
                                slides.length > 1 && wp.element.createElement(Button, {
                                    isDestructive: true,
                                    isSmall: true,
                                    onClick: () => removeSlide(index)
                                }, 'Remove')
                            ),
                            wp.element.createElement(RichText, {
                                tagName: 'div',
                                value: slide.content,
                                onChange: (content) => updateSlide(index, content),
                                multiline: true,
                                allowedFormats: ['core/bold', 'core/italic', 'core/link', 'core/strikethrough', 'core/underline'],
                                style: {
                                    minHeight: '80px',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    backgroundColor: '#fff'
                                }
                            })
                        )
                    )
                )
            );
        },

        save: function() {
            return null; // Server-side rendering
        }
    });
})();