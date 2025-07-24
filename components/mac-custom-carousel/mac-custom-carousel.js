(function () {
  console.log('MAC Custom Carousel: Script loading...');
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBlock);
  } else {
    initializeBlock();
  }
  
  function initializeBlock() {
    console.log('MAC Custom Carousel: Initializing block...');
    
    if (typeof wp === 'undefined' || !wp.blocks) {
      console.log('WordPress dependencies not loaded, retrying...');
      setTimeout(initializeBlock, 100);
      return;
    }

    const { registerBlockType } = wp.blocks;
    const { InspectorControls, RichText, MediaUpload, MediaUploadCheck } = wp.blockEditor || {};
    const { PanelBody, TextControl, TextareaControl, Button, Card, CardBody } = wp.components || {};

    if (!InspectorControls || !PanelBody || !TextControl) {
      console.log('Missing WordPress components, retrying...', { InspectorControls, PanelBody, TextControl });
      setTimeout(initializeBlock, 100);
      return;
    }
    
    console.log('MAC Custom Carousel: All dependencies loaded, registering block...');

    registerBlockType('neve-child/mac-custom-carousel', {
      title: "MAC Custom Carousel",
      icon: 'slides',
      category: 'design',

      attributes: {
        cards: {
          type: 'array',
          default: [
            {
              id: 1,
              title: 'Card Title 1',
              content: 'Card description goes here.',
              image: '',
              link: '',
              linkText: 'Learn More'
            },
            {
              id: 2,
              title: 'Card Title 2',
              content: 'Card description goes here.',
              image: '',
              link: '',
              linkText: 'Learn More'
            },
            {
              id: 3,
              title: 'Card Title 3',
              content: 'Card description goes here.',
              image: '',
              link: '',
              linkText: 'Learn More'
            },
            {
              id: 4,
              title: 'Card Title 4',
              content: 'Card description goes here.',
              image: '',
              link: '',
              linkText: 'Learn More'
            }
          ]
        }
      },

      edit: function (props) {
        const { attributes, setAttributes } = props;
        const { cards } = attributes;
        
        console.log('MAC Custom Carousel edit function called', { attributes });

        const updateCard = (index, field, value) => {
          const newCards = [...cards];
          newCards[index] = { ...newCards[index], [field]: value };
          setAttributes({ cards: newCards });
        };

        const addCard = () => {
          if (cards.length < 12) {
            const newCard = {
              id: Date.now(),
              title: `Card Title ${cards.length + 1}`,
              content: 'Card description goes here.',
              image: '',
              link: '',
              linkText: 'Learn More'
            };
            setAttributes({ cards: [...cards, newCard] });
          }
        };

        const removeCard = (index) => {
          if (cards.length > 1) {
            const newCards = cards.filter((_, i) => i !== index);
            setAttributes({ cards: newCards });
          }
        };

        return wp.element.createElement(
          'div',
          null,
          wp.element.createElement(
            InspectorControls,
            null,
            wp.element.createElement(
              PanelBody,
              { title: 'Carousel Cards', initialOpen: true },
              wp.element.createElement('p', {
                style: { margin: '0 0 15px 0', fontSize: '13px', color: '#666' }
              }, `${cards.length} of 12 cards maximum`),
              cards.map((card, index) =>
                wp.element.createElement(
                  Card,
                  { 
                    key: card.id,
                    style: { marginBottom: '15px' }
                  },
                  wp.element.createElement(
                    CardBody,
                    null,
                    wp.element.createElement('h4', {
                      style: { margin: '0 0 10px 0', fontSize: '14px' }
                    }, `Card ${index + 1}`),
                    wp.element.createElement(TextControl, {
                      label: 'Title',
                      value: card.title,
                      onChange: (value) => updateCard(index, 'title', value)
                    }),
                    wp.element.createElement(TextareaControl, {
                      label: 'Description',
                      value: card.content,
                      onChange: (value) => updateCard(index, 'content', value)
                    }),
                    wp.element.createElement('div', {
                      style: { margin: '10px 0' }
                    },
                      wp.element.createElement('label', {
                        style: { display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '600' }
                      }, 'Image'),
                      MediaUploadCheck && wp.element.createElement(
                        MediaUpload,
                        {
                          onSelect: (media) => updateCard(index, 'image', media.url),
                          allowedTypes: ['image'],
                          value: card.image,
                          render: ({ open }) => 
                            wp.element.createElement(
                              'div',
                              null,
                              card.image ? wp.element.createElement('img', {
                                src: card.image,
                                style: { width: '100%', maxWidth: '200px', height: 'auto', marginBottom: '10px' }
                              }) : null,
                              wp.element.createElement(Button, {
                                onClick: open,
                                isPrimary: !card.image,
                                isSecondary: !!card.image
                              }, card.image ? 'Change Image' : 'Select Image'),
                              card.image && wp.element.createElement(Button, {
                                onClick: () => updateCard(index, 'image', ''),
                                isDestructive: true,
                                style: { marginLeft: '10px' }
                              }, 'Remove')
                            )
                        }
                      )
                    ),
                    wp.element.createElement(TextControl, {
                      label: 'Link URL (optional)',
                      value: card.link,
                      onChange: (value) => updateCard(index, 'link', value)
                    }),
                    wp.element.createElement(TextControl, {
                      label: 'Link Text',
                      value: card.linkText,
                      onChange: (value) => updateCard(index, 'linkText', value)
                    }),
                    cards.length > 1 && wp.element.createElement(Button, {
                      onClick: () => removeCard(index),
                      isDestructive: true,
                      style: { marginTop: '10px' }
                    }, 'Remove Card')
                  )
                )
              ),
              cards.length < 12 && wp.element.createElement(Button, {
                onClick: addCard,
                isPrimary: true,
                style: { marginTop: '10px' }
              }, 'Add Card')
            )
          ),
          wp.element.createElement(
            'div',
            {
              className: 'mac-custom-carousel-editor-preview',
              style: {
                padding: '30px',
                border: '2px dashed #0073aa',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
              }
            },
            wp.element.createElement(
              'div',
              { 
                style: { 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  marginBottom: '20px',
                  maxHeight: '600px',
                  overflowY: 'auto',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa'
                }
              },
              cards.map((card, cardIndex) =>
                wp.element.createElement(
                  'div',
                  {
                    key: card.id,
                    style: {
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      backgroundColor: 'white',
                      position: 'relative'
                    }
                  },
                  wp.element.createElement(
                    'div',
                    {
                      style: {
                        position: 'absolute',
                        top: '-8px',
                        right: '10px',
                        backgroundColor: '#666',
                        color: 'white',
                        padding: '2px 8px',
                        fontSize: '10px',
                        borderRadius: '3px'
                      }
                    },
                    `Card ${cardIndex + 1}`
                  ),
                  card.image && wp.element.createElement('img', {
                    src: card.image,
                    style: {
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      marginBottom: '10px'
                    }
                  }),
                  !card.image && wp.element.createElement(
                    'div',
                    {
                      style: {
                        width: '100%',
                        height: '120px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#999'
                      }
                    },
                    'No Image'
                  ),
                  wp.element.createElement(RichText, {
                    tagName: 'h4',
                    value: card.title,
                    onChange: (value) => updateCard(cardIndex, 'title', value),
                    placeholder: 'Enter card title...',
                    style: { 
                      margin: '0 0 8px 0', 
                      fontSize: '16px',
                      fontWeight: 'bold'
                    },
                    allowedFormats: []
                  }),
                  wp.element.createElement(RichText, {
                    tagName: 'p',
                    value: card.content,
                    onChange: (value) => updateCard(cardIndex, 'content', value),
                    placeholder: 'Enter card description...',
                    style: { 
                      margin: '0 0 10px 0', 
                      fontSize: '14px', 
                      color: '#666',
                      minHeight: '20px'
                    },
                    allowedFormats: ['core/bold', 'core/italic']
                  }),
                  card.link && wp.element.createElement(
                    'div',
                    {
                      style: {
                        padding: '6px 12px',
                        backgroundColor: 'var(--mac-color-yellow)',
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '12px',
                        display: 'inline-block'
                      }
                    },
                    card.linkText || 'Learn More'
                  )
                )
              )
            ),
            wp.element.createElement(
              'div',
              { 
                style: { 
                  textAlign: 'center',
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '10px'
                }
              },
              `${cards.length} cards total - Click titles and descriptions above to edit directly`
            )
          )
        );
      },

      save: function () {
        return null;
      }
    });
    
    console.log('MAC Custom Carousel: Block registered successfully!');
  }
})();