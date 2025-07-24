(function () {
  // Wait for WordPress dependencies to be loaded
  if (typeof wp === 'undefined' || !wp.blocks) {
    console.log('WordPress dependencies not loaded');
    return;
  }

  const { registerBlockType } = wp.blocks;
  const { InspectorControls } = wp.blockEditor || {};
  const { PanelBody, TextControl, Button, TextareaControl } = wp.components || {};

  // Check if all required components are available
  if (!InspectorControls || !PanelBody || !TextControl) {
    console.log('Missing WordPress components:', { InspectorControls, PanelBody, TextControl });
    return;
  }

  registerBlockType('neve-child/mac-home-banner', {
    title: 'MAC Home Banner',
    icon: 'cover-image',
    category: 'design',

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
      },
      cards: {
        type: 'array',
        default: [
          {
            title: 'Programs & Workshops',
            description: 'Discover our diverse range of artistic programs designed to inspire creativity and foster artistic growth in our community.',
            link: '/programs',
            linkText: 'Learn More',
            image: ''
          },
          {
            title: 'Gallery & Exhibitions', 
            description: 'Experience rotating exhibitions featuring local and regional artists showcasing diverse mediums and contemporary works.',
            link: '/gallery',
            linkText: 'View Gallery',
            image: ''
          },
          {
            title: 'Community Events',
            description: 'Join us for special events, artist talks, and community gatherings that celebrate art and bring people together.',
            link: '/events', 
            linkText: 'See Events',
            image: ''
          }
        ]
      }
    },

    edit: function (props) {
      const { attributes, setAttributes } = props;
      const { banner_title, banner_subtitle, banner_button_text, banner_button_link, banner_video_url, cards } = attributes;
      
      console.log('MAC Home Banner edit function called', { attributes });

      const updateCard = (index, field, value) => {
        const newCards = [...cards];
        newCards[index] = { ...newCards[index], [field]: value };
        setAttributes({ cards: newCards });
      };

      const addCard = () => {
        if (cards.length < 3) {
          const newCards = [...cards, {
            title: 'New Card',
            description: 'Enter card description here.',
            link: '#',
            linkText: 'Learn More',
            image: ''
          }];
          setAttributes({ cards: newCards });
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
            { title: 'Banner Settings', initialOpen: true },
            wp.element.createElement('p', null, 'Banner Controls:'),
            wp.element.createElement(TextControl, {
              label: 'Banner Title',
              value: banner_title,
              onChange: function (value) { setAttributes({ banner_title: value }); }
            }),
            wp.element.createElement(TextControl, {
              label: 'Banner Subtitle',
              value: banner_subtitle,
              onChange: function (value) { setAttributes({ banner_subtitle: value }); }
            }),
            wp.element.createElement(TextControl, {
              label: 'Button Text',
              value: banner_button_text,
              onChange: function (value) { setAttributes({ banner_button_text: value }); }
            }),
            wp.element.createElement(TextControl, {
              label: 'Button Link',
              value: banner_button_link,
              onChange: function (value) { setAttributes({ banner_button_link: value }); }
            })
          ),
          wp.element.createElement(
            PanelBody,
            { title: 'Cards Settings', initialOpen: true },
            wp.element.createElement('p', null, 'Cards Panel Loaded Successfully'),
            wp.element.createElement(
              'div',
              { style: { marginBottom: '15px' } },
              wp.element.createElement('p', null, `Cards: ${cards.length}/3`),
              wp.element.createElement(Button, {
                isPrimary: true,
                disabled: cards.length >= 3,
                onClick: addCard
              }, 'Add Card')
            ),
            cards.map((card, index) => 
              wp.element.createElement(
                'div',
                { key: index, style: { marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' } },
                wp.element.createElement('h4', null, `Card ${index + 1}`),
                wp.element.createElement(TextControl, {
                  label: 'Title',
                  value: card.title,
                  onChange: function(value) { updateCard(index, 'title', value); }
                }),
                wp.element.createElement('textarea', {
                  placeholder: 'Description',
                  value: card.description,
                  onChange: function(e) { updateCard(index, 'description', e.target.value); },
                  style: { width: '100%', minHeight: '60px', marginBottom: '10px' }
                }),
                wp.element.createElement(TextControl, {
                  label: 'Link URL',
                  value: card.link,
                  onChange: function(value) { updateCard(index, 'link', value); }
                }),
                wp.element.createElement(TextControl, {
                  label: 'Link Text',
                  value: card.linkText,
                  onChange: function(value) { updateCard(index, 'linkText', value); }
                }),
                wp.element.createElement(TextControl, {
                  label: 'Image URL',
                  value: card.image,
                  onChange: function(value) { updateCard(index, 'image', value); }
                }),
                cards.length > 1 && wp.element.createElement(Button, {
                  isDestructive: true,
                  onClick: function() { removeCard(index); },
                  style: { marginTop: '10px' }
                }, 'Remove Card')
              )
            )
          )
        ),
        wp.element.createElement(
          'div',
          {
            className: 'mac-home-banner',
            style: {
              padding: '20px',
              border: '2px dashed #0073aa',
              backgroundColor: '#f9f9f9'
            }
          },
          wp.element.createElement('h2', null, banner_title),
          wp.element.createElement('p', null, banner_subtitle),
          wp.element.createElement(
            'button',
            {
              style: {
                padding: '10px 20px',
                backgroundColor: '#d63638',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                marginBottom: '20px'
              }
            },
            banner_button_text
          ),
          wp.element.createElement(
            'div',
            { 
              style: { 
                display: 'grid', 
                gridTemplateColumns: cards.length === 1 ? '1fr' : cards.length === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '15px',
                marginTop: '20px'
              }
            },
            cards.map((card, index) =>
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
                wp.element.createElement('h4', { style: { margin: '0 0 10px 0', fontSize: '16px' } }, card.title),
                wp.element.createElement('p', { style: { margin: '0 0 10px 0', fontSize: '14px', color: '#666' } }, card.description),
                wp.element.createElement('span', { style: { color: '#d63638', fontSize: '14px' } }, card.linkText)
              )
            )
          )
        )
      );
    },

    save: function () {
      return null;
    }
  });
})();

/**
 * MAC Home Banner Component - SVG Background Animation
 *
 * This component creates floating SVG logo animations that start in a staggered
 * pattern around the center and float outward and upward on scroll.
 * A small blue dot is placed at the center for reference.
 */

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector(".mac-home-banner");
  if (!banner) return;

  // Add center blue dot
  // const centerDot = document.createElement("div");
  // centerDot.style.position = "fixed";
  // centerDot.style.top = "50%";
  // centerDot.style.left = "50%";
  // centerDot.style.transform = "translate(-50%, -50%)";
  // centerDot.style.width = "8px";
  // centerDot.style.height = "8px";
  // centerDot.style.borderRadius = "50%";
  // centerDot.style.backgroundColor = "blue";
  // centerDot.style.zIndex = "9999";
  // banner.appendChild(centerDot);

  // Create floating SVG container
  const svgContainer = document.createElement("div");
  svgContainer.className = "floating-svg-container";
  svgContainer.innerHTML = `
    <div class="floating-svg" id="svg-1" data-position="top-left"></div>
    <div class="floating-svg" id="svg-2" data-position="top-right"></div>
    <div class="floating-svg" id="svg-3" data-position="bottom-left"></div>
    <div class="floating-svg" id="svg-4" data-position="bottom-right"></div>
  `;
  banner.appendChild(svgContainer);

  const svgs = document.querySelectorAll(".floating-svg");
  const svgPaths = [
    `/wp-content/themes/neve-child/components/mac-home-banner/assets/images/logo-1.svg`,
    `/wp-content/themes/neve-child/components/mac-home-banner/assets/images/logo-2.svg`,
    `/wp-content/themes/neve-child/components/mac-home-banner/assets/images/logo-3.svg`,
    `/wp-content/themes/neve-child/components/mac-home-banner/assets/images/logo-4.svg`,
  ];

  const customOrder = [0, 3, 2, 1]; // Fade-in order
  const initialRotations = [30, 30, 15, -15];

  // Staggered positions around center (irregular spacing in percentages)
  const gap = 25;
  const staggeredPositions = [
    { x: -gap, y: -gap }, // top-left (closer to center vertically)
    { x: gap, y: -gap }, // top-right (further from center)
    { x: -gap, y: gap }, // bottom-left (closer to center horizontally)
    { x: gap, y: gap }, // bottom-right (further horizontally, closer vertically)
  ];

  svgs.forEach((svgElement, index) => {
    const position = staggeredPositions[index];

    // Position the SVG container using absolute positioning within the floating-svg-container
    svgElement.style.left = `calc(50% + ${position.x}vw)`;
    svgElement.style.top = `calc(50% + ${position.y}vh)`;
    svgElement.style.transform = `translate(-50%, -50%) rotate(${initialRotations[index]}deg)`;

    const img = document.createElement("img");
    img.src = svgPaths[index];
    img.alt = `Logo ${index + 1}`;
    // Remove the problematic sizing - let CSS handle it
    img.style.opacity = "0";
    img.style.transition = `opacity 1s ease ${customOrder.indexOf(index) * 0.5
      }s`;
    svgElement.appendChild(img);
  });

  setTimeout(() => {
    document.querySelectorAll(".floating-svg").forEach((svg) => {
      svg.style.opacity = "1";
    });
    document.querySelectorAll(".floating-svg img").forEach((img) => {
      img.style.opacity = "0.5";
    });
  }, 100);

  function updateFloatingSVGs() {
    const scrolled = window.pageYOffset;
    const scrollLength = window.innerHeight * 2; // 200vh
    const scrollProgress = Math.min(scrolled / scrollLength, 2);
    const floatDistance =
      Math.min(window.innerWidth, window.innerHeight) * 0.25;

    svgs.forEach((svg, index) => {
      const position = svg.dataset.position;
      const initialPos = staggeredPositions[index];

      // Movement directions: top 2 float up, bottom 2 float down
      let offsetX = 0;
      let offsetY = 0;
      switch (position) {
        case "top-left":
          offsetX = -1.2;
          offsetY = -2.0; // Float up more
          break;
        case "top-right":
          offsetX = 1.2;
          offsetY = -2.0; // Float up more
          break;
        case "bottom-left":
          offsetX = -1.2;
          offsetY = 2.0; // Float down
          break;
        case "bottom-right":
          offsetX = 1.2;
          offsetY = 2.0; // Float down
          break;
      }

      const moveX = offsetX * scrollProgress * floatDistance;
      const moveY = offsetY * scrollProgress * floatDistance;
      const rotation = initialRotations[index] + scrollProgress * 10;

      svg.style.left = `calc(50% + ${initialPos.x + moveX}vw)`;
      svg.style.top = `calc(50% + ${initialPos.y + moveY}vh)`;
      svg.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    });
  }

  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateFloatingSVGs();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", updateFloatingSVGs);
  updateFloatingSVGs();
});
