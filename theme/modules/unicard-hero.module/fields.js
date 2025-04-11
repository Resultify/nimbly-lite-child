/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'
import { shadowList } from '../../partials/data/shadow-list.js'
import { card1, card2 } from './fields-default.js'
import { globalDefault } from '../global-default.js'

init(
  group('Card', 'card_group',
    {
      icon: {
        name: 'clone',
        set: 'fontawesome-6.4.2',
        type: 'SOLID'
      },
      occurrence: {
        min: 2,
        max: 2,
        default: 2,
        sorting_label_field: 'card_group.heading'
      },
      default: [
        card1,
        card2
      ]
    },
    unicardFields(
      {
        enabledByDefault: ['main_heading'],
        choices: ['media', 'main_heading', 'sub_heading', 'richtext', 'custom_text', 'list', 'accordion', 'separator', 'buttons', 'additional_images', 'meeting', 'form']
      },
      'card_group.',
      {
        mediaGroup: {
          showLottieScaleProp: true,
          hideForceFullWidthImageProp: true,
          hideForceFullWidthVideoProp: true
        },
        hideWholeAreaLinkProp: true
      }
    )
  ),
  fi.boolean('Hero Image mode', 'hero_image_mode', {
    help_text: 'Hero Image mode provides the ability to add various optimized backgrounds with gradients or color overlays to the module.',
    display: 'toggle',
    default: false
  }),
  group('Hero Image', 'hero_image_group',
    {
      inline_help_text: 'Hero Image mode provides the ability to add various optimized backgrounds with gradients or color overlays to the module.<br><br><span style="color:#007a8c;font-weight:700;font-size:14px;">PageSpeed</span> ​​optimization included.',
      visibility: {
        controlling_field_path: 'hero_image_mode',
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    },
    fi.choice('Background type', 'background_type', {
      placeholder: 'No background',
      choices: [
        ['background_image', 'Background image'],
        ['background_gradient', 'Background gradient'],
        ['background_video', 'Background video']
      ]
    }),
    fi.image(' ', 'background_image', {
      resizable: false,
      show_loading: false,
      visibility: {
        controlling_field_path: 'hero_image_group.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_image'
      }
    }),
    fi.choice('Background image alignment', 'background_image_alignment', {
      placeholder: 'No background',
      default: 'center center',
      required: true,
      choices: [
        ['left top', 'Top left'],
        ['center top', 'Top center'],
        ['right top', 'Top right'],
        ['left center', 'Middle left'],
        ['center center', 'Middle center'],
        ['right center', 'Middle right'],
        ['left bottom', 'Bottom left'],
        ['center bottom', 'Bottom center'],
        ['right bottom', 'Bottom right']
      ],
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'hero_image_group.background_type',
            operator: 'EQUAL',
            controlling_value_regex: 'background_image'
          }
        ]
      }
    }),
    fi.choice('Background image overlay type', 'background_image_overlay_type', {
      visibility: {
        controlling_field_path: 'hero_image_group.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_image'
      },
      placeholder: 'No overlay',
      choices: [
        ['color', 'Color overlay'],
        ['gradient', 'Gradient overlay']
      ]
    }),
    fi.color('Background image overlay', 'background_image_overlay', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'hero_image_group.background_type',
            operator: 'EQUAL',
            controlling_value_regex: 'background_image'
          },
          {
            controlling_field_path: 'hero_image_group.background_image_overlay_type',
            operator: 'EQUAL',
            controlling_value_regex: 'color'
          }
        ]
      }
    }),
    fi.color('Gradient color', 'gradient_color', {
      display_width: 'half_width',
      occurrence: {
        min: 0,
        max: 20
      },
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'OR',
        children: [
          {
            boolean_operator: 'AND',
            criteria: [
              {
                controlling_field_path: 'hero_image_group.background_type',
                operator: 'EQUAL',
                controlling_value_regex: 'background_image'
              },
              {
                controlling_field_path: 'hero_image_group.background_image_overlay_type',
                operator: 'EQUAL',
                controlling_value_regex: 'gradient'
              }
            ]
          },
          {
            boolean_operator: 'AND',
            criteria: [
              {
                controlling_field_path: 'hero_image_group.background_type',
                operator: 'EQUAL',
                controlling_value_regex: 'background_gradient'
              }
            ]
          }
        ]
      }
    }),
    fi.choice('Gradient direction', 'gradient_direction', {
      help_text: 'Unset any gradient direction to turn off the color gradient style for the text',
      display_width: 'half_width',
      placeholder: 'No gradient',
      choices: [
        ['to top', 'Bottom to top'],
        ['to bottom', 'Top to bottom'],
        ['to left', 'Right to left'],
        ['to right', 'Left to right'],
        ['to bottom right', 'Top left to bottom right'],
        ['to bottom left', 'Top right to bottom left']
      ],
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'OR',
        children: [
          {
            boolean_operator: 'AND',
            criteria: [
              {
                controlling_field_path: 'hero_image_group.background_type',
                operator: 'EQUAL',
                controlling_value_regex: 'background_image'
              },
              {
                controlling_field_path: 'hero_image_group.background_image_overlay_type',
                operator: 'EQUAL',
                controlling_value_regex: 'gradient'
              }
            ]
          },
          {
            boolean_operator: 'AND',
            criteria: [
              {
                controlling_field_path: 'hero_image_group.background_type',
                operator: 'EQUAL',
                controlling_value_regex: 'background_gradient'
              }
            ]
          }
        ]
      }
    }),
    fi.number('Container width', 'container_width', {
      help_text: 'By default, Hero Image content container matches the width of the general page content width. This option allows you to adjust it.',
      min: 0,
      suffix: 'px',
      visibility: {
        controlling_field_path: 'hero_image_group.background_type',
        operator: 'NOT_EMPTY'
      }
    }),
    fi.boolean('Add low-quality image placeholder', 'add_lowres_image', {
      inline_help_text: 'It is <span style="color:#007a8c;font-weight:700;font-size:14px;">recommended</span> to use this option only for the first element on the page.',
      visibility: {
        controlling_field_path: 'hero_image_group.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_image'
      }
    }),
    fi.image('', 'background_image_lowres', {
      resizable: false,
      show_loading: false,
      inline_help_text: 'Low-quality image load first, allowing for faster pagespeed and quicker content display.<br><br>Use same image as the background image with a diff name, <span style="color:#007a8c;">WebP</span> format, <span style="color:#007a8c;">720px</span> width and <span style="color:#007a8c;">zero</span> quality.<br>Recommended to use <a href="https://squoosh.app/" style="color:#007a8c;">squoosh.app</a>.',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'hero_image_group.background_type',
            operator: 'EQUAL',
            controlling_value_regex: 'background_image'
          },
          {
            controlling_field_path: 'hero_image_group.add_lowres_image',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    })
  ),
  styleGroup(
    fi.number('Proportions', 'proportions', {
      display: 'slider',
      default: 50,
      min: 0,
      max: 100,
      step: 5,
      suffix: '%'
    }),
    fi.number('', 'desktop_gap', {
      display_width: 'half_width',
      inline_help_text: 'Gap on <span style="color:#007a8c;font-weight:700;font-size:14px;">Desktop</span>',
      min: 0,
      suffix: 'px'
    }),
    fi.number('', 'mobile_gap', {
      display_width: 'half_width',
      inline_help_text: 'Gap on <span style="color:#007a8c;font-weight:700;font-size:14px;">Mobile</span>',
      min: 0,
      suffix: 'px'
    }),
    fi.choice('Background type', 'background_type', {
      placeholder: 'No background',
      choices: [
        ['background_color', 'Background color'],
        ['background_image', 'Background image'],
        ['background_gradient', 'Background gradient']
      ]
    }),
    fi.color('Background color', 'background_color', {
      visibility: {
        controlling_field_path: 'style.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_color'
      }
    }),
    fi.backgroundimage('Background image', 'background_image', {
      visibility: {
        controlling_field_path: 'style.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_image'
      }
    }),
    fi.choice('Background image overlay type', 'background_image_overlay_type', {
      visibility: {
        controlling_field_path: 'style.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_image'
      },
      placeholder: 'No overlay',
      choices: [
        ['color', 'Color'],
        ['gradient', 'Gradient']
      ]
    }),
    fi.color('Background image overlay', 'background_image_overlay', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'style.background_type',
            operator: 'EQUAL',
            controlling_value_regex: 'background_image'
          },
          {
            controlling_field_path: 'style.background_image_overlay_type',
            operator: 'EQUAL',
            controlling_value_regex: 'color'
          }
        ]
      }
    }),
    fi.gradient('Background image overlay gradient', 'background_image_overlay_gradient', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'style.background_type',
            operator: 'EQUAL',
            controlling_value_regex: 'background_image'
          },
          {
            controlling_field_path: 'style.background_image_overlay_type',
            operator: 'EQUAL',
            controlling_value_regex: 'gradient'
          }
        ]
      }
    }),
    fi.gradient('Background gradient', 'background_gradient', {
      visibility: {
        controlling_field_path: 'style.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_gradient'
      }
    }),
    fi.spacing('', 'spacing', {
      visibility: {
        hidden_subfields: {
          margin: true
        }
      }
    }),
    fi.border('Border', 'border'),
    fi.number('Border radius', 'border_radius', {
      default: 20,
      min: 0,
      suffix: 'px',
      display_width: 'half_width'
    }),
    fi.choice('Shadow', 'shadow', {
      default: 'shadow-md',
      display_width: 'half_width',
      choices: shadowList
    }),
    fi.boolean('Reverse', 'mobile_reverse', {
      display_width: 'half_width',
      inline_help_text: 'Order on <span style="color:#007a8c;font-weight:700;font-size:14px;">Mobile</span>'
    }),
    group('Card 1', 'card_style_group1', {},
      unicardStyleFields('style.card_style_group1.', {
        hide: {
          hoverProps: true,
        },
        show: {
          mobileAlignment: true,
          verticalAlignment: true,
          maxWidth: true,
        },
        default: {
          horizontal_align: 'CENTER',
          vertical_align: 'MIDDLE',
          background_type: 'background_image',
          background_image_src: globalDefault.unicardBackground,
          background_image_overlay_type: 'color',
          background_image_overlay_color: '#d4a99a',
          background_image_overlay_opacity: 50,
          padding: 64,
        }
      })
    ),
    group('Card 2', 'card_style_group2', {},
      unicardStyleFields('style.card_style_group2.', {
        hide: {
          hoverProps: true,
        },
        show: {
          mobileAlignment: true,
          verticalAlignment: true,
          maxWidth: true,
        },
        default: {
          mobile_alignment: 'CENTER',
          background_type: 'background_color',
          background_color: '#FFFFFF',
          content_gap: 24,
          padding: 64,
        }
      })
    )
  )
)
