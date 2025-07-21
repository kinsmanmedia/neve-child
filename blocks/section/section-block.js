(function() {
    'use strict';

    const { registerBlockType } = wp.blocks;
    const { RichText } = wp.editor;

    registerBlockType('neve-child/section', {
        title: 'Section Block',
        description: 'A simple section block for content.',
        icon: 'layout',
        category: 'design',
        attributes: {
            content: {
                type: 'string',
                default: ''
            }
        },

        edit: function(props) {
            const { attributes, setAttributes } = props;
            const { content } = attributes;

            return wp.element.createElement(RichText, {
                tagName: 'div',
                value: content,
                onChange: function(value) {
                    setAttributes({ content: value });
                },
                multiline: true,
                allowedFormats: ['core/bold', 'core/italic', 'core/link', 'core/strikethrough', 'core/underline'],
                style: {
                    minHeight: '50px',
                    padding: '10px',
                    border: '1px dashed #ccc'
                }
            });
        },

        save: function() {
            return null; // Server-side rendering
        }
    });
})();