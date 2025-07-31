(function (blocks, element, editor) {
    var el = element.createElement;
    var RichText = editor.RichText;

    blocks.registerBlockType('my-theme/mac-template', {
        title: 'Mac Template',
        icon: 'desktop',
        category: 'MAC',

        attributes: {
            content: {
                type: 'string',
                source: 'html',
                selector: 'p',
            },
        },

        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el('div', { className: 'mac-template-block' },
                el(RichText, {
                    tagName: 'p',
                    className: 'mac-template-content',
                    value: attributes.content,
                    onChange: function (content) {
                        setAttributes({ content: content });
                    },
                    placeholder: 'Enter your Mac template content...',
                })
            );
        },

        save: function (props) {
            var attributes = props.attributes;

            return el('div', { className: 'mac-template-block' },
                el(RichText.Content, {
                    tagName: 'p',
                    className: 'mac-template-content',
                    value: attributes.content,
                })
            );
        },
    });

})(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor
);