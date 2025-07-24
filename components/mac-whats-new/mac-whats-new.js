// Ensure this runs when WordPress is ready
(function () {
  console.log('MAC What\'s New: Script loading...');
  
  // Use DOMContentLoaded to ensure everything is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBlock);
  } else {
    initializeBlock();
  }
  
  function initializeBlock() {
    console.log('MAC What\'s New: Initializing block...');
    
    // Wait for WordPress dependencies to be loaded
    if (typeof wp === 'undefined' || !wp.blocks) {
      console.log('WordPress dependencies not loaded, retrying...');
      setTimeout(initializeBlock, 100);
      return;
    }

    const { registerBlockType } = wp.blocks;
    const { InspectorControls } = wp.blockEditor || {};
    const { PanelBody, TextControl, RangeControl, ToggleControl, SelectControl, TextareaControl } = wp.components || {};

    // Check if all required components are available
    if (!InspectorControls || !PanelBody || !TextControl) {
      console.log('Missing WordPress components, retrying...', { InspectorControls, PanelBody, TextControl });
      setTimeout(initializeBlock, 100);
      return;
    }
    
    console.log('MAC What\'s New: All dependencies loaded, registering block...');

  registerBlockType('neve-child/mac-whats-new', {
    title: "What's New at MAC?",
    icon: 'admin-post',
    category: 'design',

    attributes: {
      section_title: {
        type: 'string',
        default: "What's New at MAC?"
      },
      section_subtitle: {
        type: 'string',
        default: 'Stay up to date with the latest news, events, and announcements from the Mississauga Arts Council'
      },
      posts_count: {
        type: 'number',
        default: 6
      },
      show_excerpt: {
        type: 'boolean',
        default: true
      },
      show_date: {
        type: 'boolean',
        default: true
      },
      show_author: {
        type: 'boolean',
        default: false
      },
      show_featured_image: {
        type: 'boolean',
        default: true
      },
      post_category: {
        type: 'string',
        default: ''
      },
      read_more_text: {
        type: 'string',
        default: 'Read More'
      },
      view_all_text: {
        type: 'string',
        default: 'View All News'
      },
      view_all_link: {
        type: 'string',
        default: '/news'
      }
    },

    edit: function (props) {
      const { attributes, setAttributes } = props;
      const { 
        section_title, 
        section_subtitle, 
        show_excerpt, 
        show_date, 
        show_author, 
        show_featured_image, 
        post_category, 
        read_more_text, 
        view_all_text, 
        view_all_link 
      } = attributes;
      
      console.log('MAC What\'s New edit function called', { attributes });

      return wp.element.createElement(
        'div',
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: 'Section Settings', initialOpen: true },
            wp.element.createElement(TextControl, {
              label: 'Section Title',
              value: section_title,
              onChange: function (value) { setAttributes({ section_title: value }); },
              help: 'Main heading for the news section'
            }),
            wp.element.createElement(TextareaControl, {
              label: 'Section Subtitle',
              value: section_subtitle,
              onChange: function (value) { setAttributes({ section_subtitle: value }); },
              help: 'Descriptive text below the main title'
            }),
            wp.element.createElement('p', {
              style: { margin: '0', fontSize: '13px', color: '#666' }
            }, 'Displays 6 most recent articles in a carousel format')
          ),
          wp.element.createElement(
            PanelBody,
            { title: 'Display Options', initialOpen: false },
            wp.element.createElement(ToggleControl, {
              label: 'Show Featured Images',
              checked: show_featured_image,
              onChange: function (value) { setAttributes({ show_featured_image: value }); }
            }),
            wp.element.createElement(ToggleControl, {
              label: 'Show Excerpt',
              checked: show_excerpt,
              onChange: function (value) { setAttributes({ show_excerpt: value }); }
            }),
            wp.element.createElement(ToggleControl, {
              label: 'Show Publication Date',
              checked: show_date,
              onChange: function (value) { setAttributes({ show_date: value }); }
            }),
            wp.element.createElement(ToggleControl, {
              label: 'Show Author',
              checked: show_author,
              onChange: function (value) { setAttributes({ show_author: value }); }
            })
          ),
          wp.element.createElement(
            PanelBody,
            { title: 'Content & Links', initialOpen: false },
            wp.element.createElement(TextControl, {
              label: 'Category Filter',
              value: post_category,
              onChange: function (value) { setAttributes({ post_category: value }); },
              help: 'Leave empty to show all posts, or enter category slug to filter'
            }),
            wp.element.createElement(TextControl, {
              label: 'Read More Button Text',
              value: read_more_text,
              onChange: function (value) { setAttributes({ read_more_text: value }); }
            }),
            wp.element.createElement(TextControl, {
              label: 'View All Button Text',
              value: view_all_text,
              onChange: function (value) { setAttributes({ view_all_text: value }); }
            }),
            wp.element.createElement(TextControl, {
              label: 'View All Button Link',
              value: view_all_link,
              onChange: function (value) { setAttributes({ view_all_link: value }); },
              help: 'URL for the "View All" button'
            })
          )
        ),
        wp.element.createElement(
          'div',
          {
            className: 'mac-whats-new-editor-preview',
            style: {
              padding: '30px',
              border: '2px dashed #0073aa',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px'
            }
          },
          wp.element.createElement(
            'div',
            { style: { textAlign: 'center', marginBottom: '20px' } },
            wp.element.createElement('h2', { 
              style: { 
                fontSize: '28px', 
                fontWeight: 'bold', 
                margin: '0 0 10px 0',
                color: '#1a1a1a'
              } 
            }, section_title || 'Enter Section Title'),
            wp.element.createElement('p', { 
              style: { 
                fontSize: '16px', 
                lineHeight: '1.6', 
                margin: '0 0 20px 0',
                color: '#666',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto'
              } 
            }, section_subtitle || 'Enter section subtitle')
          ),
          wp.element.createElement(
            'div',
            { 
              style: { 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                marginBottom: '20px',
                overflow: 'hidden'
              }
            },
            Array.from({ length: 3 }, (_, index) =>
              wp.element.createElement(
                'div',
                {
                  key: index,
                  style: {
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '15px',
                    backgroundColor: 'white'
                  }
                },
                show_featured_image && wp.element.createElement(
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
                  'Featured Image'
                ),
                wp.element.createElement(
                  'div',
                  { style: { marginBottom: '8px', fontSize: '12px', color: '#999' } },
                  show_date && 'January ' + (15 + index) + ', 2024',
                  show_author && show_date && ' • ',
                  show_author && 'Author Name'
                ),
                wp.element.createElement('h4', { 
                  style: { margin: '0 0 8px 0', fontSize: '16px' } 
                }, `Sample Article Title ${index + 1}`),
                show_excerpt && wp.element.createElement('p', { 
                  style: { margin: '0 0 10px 0', fontSize: '14px', color: '#666' } 
                }, 'This is a sample excerpt for the article preview...'),
                wp.element.createElement(
                  'button',
                  {
                    style: {
                      padding: '6px 12px',
                      backgroundColor: 'transparent',
                      color: '#d63638',
                      border: '1px solid #d63638',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }
                  },
                  read_more_text
                )
              )
            )
          ),
          wp.element.createElement(
            'div',
            { 
              style: { 
                textAlign: 'center',
                marginBottom: '10px',
                fontSize: '12px',
                color: '#666'
              }
            },
            '◀ Carousel: 3 of 6 articles (Desktop) | 1 of 6 articles (Mobile) ▶'
          ),
          wp.element.createElement(
            'div',
            { style: { textAlign: 'center' } },
            wp.element.createElement(
              'button',
              {
                style: {
                  padding: '12px 24px',
                  backgroundColor: '#d63638',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }
              },
              view_all_text
            )
          )
        )
      );
    },

    save: function () {
      return null;
    }
  });
  
  console.log('MAC What\'s New: Block registered successfully!');
  }
})();