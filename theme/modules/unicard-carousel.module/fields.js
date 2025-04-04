/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'
import { card1, card2, card3 } from './fields-default.js'

init(
  group('Cards', 'card_group',
    {
      icon: {
        name: 'clone',
        set: 'fontawesome-6.4.2',
        type: 'SOLID'
      },
      occurrence: {
        min: 1,
        max: 20,
        default: 1,
        sorting_label_field: 'card_group.heading'
      },
      default: [
        card1,
        card2,
        card3,
        card1,
        card3,
        card2
      ]
    },
    unicardFields({
      enabledByDefault: ['main_heading'],
      choices: ['media', 'main_heading', 'sub_heading', 'richtext', 'custom_text', 'list', 'accordion', 'separator', 'buttons', 'additional_images', 'meeting', 'form']
    }, 'card_group.')
  ),
  styleGroup(
    fi.choice('Carousel presets', 'carousel_preset', {
      help_text: 'Choose a style preset for the carousel',
      choices: [
        ['carousel', 'Carousel'],
        ['auto-scroll', 'Auto scroll']
        // ['image-slider', 'Image slider'],
        // ['image_slider', 'Effect fade'],
        // ['effect_coverflow', 'Effect coverflow'],
        // ['effect_cards', 'Effect cards'],
        // ['thumbs_gallery', 'Thumbs gallery'],
        // ['parallax', 'Parallax'],
        // ['zoom', 'Zoom']
      ],
      required: true,
      default: 'carousel'
    }),
    fi.number('Per page', 'carousel_per_page', {
      help_text: 'Determines the number of slides to display in a page',
      min: 1,
      max: 20,
      display_width: 'half_width'
    }),
    fi.number('Gap', 'carousel_gap', {
      help_text: 'The gap between slides. The CSS format is acceptable',
      min: 0,
      suffix: 'px',
      display_width: 'half_width'
    }),
    fi.number('Speed', 'carousel_autoscroll_speed', {
      min: 0,
      max: 1.9,
      step: 0.1,
      display_width: 'half_width',
      visibility: {
        controlling_field_path: 'style.carousel_preset',
        operator: 'EQUAL',
        controlling_value_regex: 'auto-scroll'
      }
    }),
    fi.boolean('Loop', 'carousel_loop', {
      help_text: 'Determines whether to loop the carousel or not',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'style.carousel_preset',
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'auto-scroll'
          },
          {
            controlling_field_path: 'style.carousel_rewind',
            operator: 'EQUAL',
            controlling_value_regex: 'false'
          }
        ]
      },
      display_width: 'half_width'
    }),
    fi.boolean('Rewind', 'carousel_rewind', {
      help_text: 'Determines whether to rewind the carousel or not.',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'style.carousel_preset',
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'auto-scroll'
          },
          {
            controlling_field_path: 'style.carousel_loop',
            operator: 'EQUAL',
            controlling_value_regex: 'false'
          }
        ]
      },
      display_width: 'half_width'
    }),
    fi.boolean('Autoplay', 'carousel_autoplay', {
      help_text: 'Determines whether to activate autoplay or not',
      display_width: 'half_width',
      visibility: {
        controlling_field_path: 'style.carousel_preset',
        operator: 'NOT_EQUAL',
        controlling_value_regex: 'auto-scroll'
      }
    }),
    fi.number('Interval', 'carousel_interval', {
      help_text: 'The autoplay interval in seconds',
      min: 0,
      display_width: 'half_width',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'style.carousel_preset',
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'auto-scroll'
          },
          {
            controlling_field_path: 'style.carousel_autoplay',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.spacing('', 'spacing', {
      default: {
        padding: {
          bottom: {
            units: "px",
            value: 60
          },
          left: {
            units: "px",
            value: 60
          },
          right: {
            units: "px",
            value: 60
          },
          top: {
            units: "px",
            value: 60
          }
        }
      },
      visibility: {
        hidden_subfields: {
          margin: true
        }
      }
    }),
    fi.boolean('Navigation', 'carousel_navigation', {
      help_text: 'Determines whether to create navigation arrows or not',
      default: true,
    }),
    group('Navigation', 'navigation_group',
      {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: 'style.carousel_navigation',
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            }
          ]
        }
      },
      fi.color('Color', 'navigation_icon_color', {
        display_width: 'half_width'
      }),
      fi.color('Background', 'navigation_icon_background', {
        display_width: 'half_width'
      }),
      fi.color('Hover color', 'navigation_icon_hover_color', {
        display_width: 'half_width'
      }),
      fi.color('Hover bg', 'navigation_icon_hover_background', {
        help_text: 'The background color of the navigation icon on hover',
        display_width: 'half_width'
      }),
      fi.spacing('Spacing', 'navigation_icon_spacing', {
        visibility: {
          hidden_subfields: {
            margin: true
          }
        }
      }),
      fi.number('Border radius', 'navigation_icon_border_radius', {
        min: 0,
        suffix: '%',
        display_width: 'half_width'
      }),
      fi.number('Size', 'navigation_icon_size', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px'
      }),
      fi.boolean('Hide navigation on mobile', 'hide_navigation_on_mobile', {
        help_text: 'Determines whether to hide navigation on mobile or not'
      })
    ),
    fi.boolean('Pagination', 'carousel_pagination', {
      help_text: 'Determines whether to create pagination (indicator dots) or not',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'style.carousel_preset',
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'auto-scroll'
          },
          {
            controlling_field_path: 'style.carousel_per_move',
            operator: 'EMPTY'
          }
        ]
      }
    }),
    group('Pagination', 'pagination_group',
      {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: 'style.carousel_pagination',
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            }
          ]
        }
      },
      fi.color('Color', 'pagination_color', {
        display_width: 'half_width'
      }),
      fi.color('Active color', 'pagination_active_color', {
        display_width: 'half_width'
      }),
      fi.number('Size', 'pagination_size', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px'
      }),
      fi.number('Border radius', 'pagination_radius', {
        min: 0,
        suffix: '%',
        display_width: 'half_width'
      }),
      fi.number('Position', 'pagination_position', {
        display_width: 'half_width',
        suffix: 'px'
      })
    ),
    fi.number('Per move', 'carousel_per_move', {
      help_text: 'Determines the number of slides to move at once',
      min: 1,
      max: 20,
      display_width: 'half_width',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'style.carousel_preset',
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'auto-scroll'
          },
          {
            controlling_field_path: 'style.carousel_pagination',
            operator: 'EQUAL',
            controlling_value_regex: 'false'
          }
        ]
      }
    }),
    group('Card', 'card_style_group', {},
      unicardStyleFields('style.card_style_group.', {
        showMobileAlignment: true,
        showVerticalAlignment: true,
        default: {
          content_gap: 20,
          background_type: 'background_color',
          background_color: '#f6f6f6',
          padding: 40,
          border_radius: 20,
        }
      })
    )
  )
)
