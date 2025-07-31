import { registerBlockType } from '@wordpress/blocks'
import { createElement } from '@wordpress/element'
import {
  RichText,
  InspectorControls,
  useBlockProps
} from '@wordpress/block-editor'
import {
  PanelBody,
  TextControl,
  ToggleControl
} from '@wordpress/components'
import { __ } from '@wordpress/i18n'

registerBlockType('neve-child/mac-temp', {
  edit: function Edit({ attributes, setAttributes }) {
    const { text, url, opensInNewTab } = attributes
    const blockProps = useBlockProps()

    return createElement('div', blockProps, [
      createElement(InspectorControls, { key: 'inspector' }, [
        createElement(PanelBody, {
          key: 'panel',
          title: __('Button Settings', 'neve-child'),
          initialOpen: true
        }, [
          createElement(TextControl, {
            key: 'url',
            label: __('Button URL', 'neve-child'),
            value: url,
            onChange: (value) => setAttributes({ url: value }),
            placeholder: __('Enter URL...', 'neve-child')
          }),
          createElement(ToggleControl, {
            key: 'target',
            label: __('Open in new tab', 'neve-child'),
            checked: opensInNewTab,
            onChange: (value) => setAttributes({ opensInNewTab: value })
          })
        ])
      ]),
      createElement(RichText, {
        key: 'richtext',
        tagName: 'a',
        className: 'mac-temp-button',
        value: text,
        onChange: (value) => setAttributes({ text: value }),
        placeholder: __('Button text...', 'neve-child'),
        allowedFormats: [],
        href: url,
        target: opensInNewTab ? '_blank' : undefined,
        rel: opensInNewTab ? 'noopener noreferrer' : undefined
      })
    ])
  },

  save: function Save({ attributes }) {
    const { text, url, opensInNewTab } = attributes
    const blockProps = useBlockProps.save()

    return createElement('a', {
      ...blockProps,
      className: 'mac-temp-button',
      href: url,
      target: opensInNewTab ? '_blank' : undefined,
      rel: opensInNewTab ? 'noopener noreferrer' : undefined
    }, text)
  }
})
