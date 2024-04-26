/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { partial } from '../../../fields-js/partials/all.js'

init(
  fi.choice('Image type', 'image_type', {
    display_width: 'half_width',
    choices: [
      ['full_width', 'Full width'],
      ['image', 'Image'],
      ['icon', 'Icon'],
      ['lottie', 'Lottie Animation']
    ]
  }),
  group('Full width image', 'full_width',
    {
      expanded: false,
      visibility: {
        controlling_field_path: 'image_type',
        operator: 'EQUAL',
        controlling_value_regex: 'full_width'
      }
    },
    partial.fullWidthImage('full_width')
  ),
  group('Image', 'image',
    {
      expanded: false,
      visibility: {
        controlling_field_path: 'image_type',
        operator: 'EQUAL',
        controlling_value_regex: 'image'
      }
    },
    partial.simpleImage('image')
  ),
  group('Icon', 'icon',
    {
      expanded: false,
      visibility: {
        controlling_field_path: 'image_type',
        operator: 'EQUAL',
        controlling_value_regex: 'icon'
      }
    },
    partial.icon('icon')
  ),
  group('Lottie animation', 'lottie',
    {
      expanded: false,
      visibility: {
        controlling_field_path: 'image_type',
        operator: 'EQUAL',
        controlling_value_regex: 'lottie'
      }
    },
    partial.lottie('lottie')
  ),
  partial.heading(),
  partial.subheading(),
  partial.text(),
  fi.richtext('Rich text', 'richtext'),
  partial.buttons,
  group('Additional images', 'additional_images',
    {
      occurrence: {
        min: 0,
        max: 20,
        sorting_label_field: 'additional_images.image.alt'
      }
    },
    partial.simpleImage('additional_images')
  ),
  partial.order([
    'Image',
    'Heading',
    'Subheading',
    'Text',
    'Rich text',
    'Separator',
    'Buttons',
    'Additional images'
  ]),
  fi.boolean('Whole area link', 'whole_area_link', {
    display: 'toggle',
    default: false,
    display_width: 'half_width'
  }),
  styleGroup(
    group('General', 'general',
      {
        expanded: true
      },
      fi.color('Text color', 'text_color', {
        show_opacity: false
      }),
      fi.alignment('Alignment', 'alignment',
        {
          default: {
            horizontal_align: 'LEFT'
          },
          alignment_direction: 'HORIZONTAL'
        }
      ),
      fi.number('Content gap', 'content_gap', {
        suffix: 'px',
        default: 12,
        display_width: 'half_width',
        help_text: 'General gap between all card components'
      }),
      // fi.color('Overlay color', 'overlay_color', {
      //   help_text: 'Whole area link overlay color on hover',
      //   visibility: {
      //     controlling_field_path: 'whole_area_link',
      //     operator: 'EQUAL',
      //     controlling_value_regex: 'true'
      //   }
      // }),
      fi.choice('Background type', 'background_type', {
        display_width: 'half_width',
        choices: [
          ['background_color', 'Background color'],
          ['background_image', 'Background image'],
          ['background_gradient', 'Background gradient']
        ]
      }),
      fi.color('Background color', 'background_color', {
        visibility: {
          controlling_field_path: 'style.general.background_type',
          operator: 'EQUAL',
          controlling_value_regex: 'background_color'
        }
      }),
      fi.backgroundimage('Background image', 'background_image', {
        visibility: {
          controlling_field_path: 'style.general.background_type',
          operator: 'EQUAL',
          controlling_value_regex: 'background_image'
        }
      }),
      fi.gradient('Background gradient', 'background_gradient', {
        visibility: {
          controlling_field_path: 'style.general.background_type',
          operator: 'EQUAL',
          controlling_value_regex: 'background_gradient'
        }
      }),
      fi.border('Border', 'border'),
      fi.number('Border radius', 'border_radius', {
        default: 0,
        suffix: 'px',
        display_width: 'half_width'
      }),
      fi.choice('Card shadow', 'card_shadow', {
        display_width: 'half_width',
        choices: [
          ['shadow-sm', 'Shadow small'],
          ['shadow-md', 'Shadow medium'],
          ['shadow-lg', 'Shadow large'],
          ['shadow-xlg', 'Shadow xlarge'],
          ['shadow-2xlg', 'Shadow 2xlarge'],
          ['shadow-3xlg', 'Shadow 3xlarge'],
          ['custom-shadow1', 'Custom-shadow 1'],
          ['custom-shadow2', 'Custom-shadow 2'],
          ['custom-shadow3', 'Custom-shadow 3']
        ]
      }),
      fi.spacing('Spacing', 'spacing'),
      fi.boolean('Content block styles', 'content_block_styles'),
      group('Top content block', 'top_content_block',
        {
          visibility: {
            controlling_field_path: 'style.general.content_block_styles',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        },
        fi.color('Background color', 'content_block_background_color'),
        fi.border('Border', 'content_block_border'),
        fi.number('Border radius', 'content_block_border_radius', {
          suffix: 'px'
        }),
        fi.spacing('Spacing', 'content_block_spacing', {
          visibility: {
            hidden_subfields: {
              margin: true
            }
          }
        })
      ),
      group('Bottom content block', 'bottom_content_block',
        {
          visibility: {
            controlling_field_path: 'style.general.content_block_styles',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        },
        fi.color('Background color', 'bottom_content_block_background_color'),
        fi.border('Border', 'bottom_content_block_border'),
        fi.number('Border radius', 'bottom_content_block_border_radius', {
          suffix: 'px'
        }),
        fi.spacing('Spacing', 'bottom_content_block_spacing', {
          visibility: {
            hidden_subfields: {
              margin: true
            }
          }
        })
      ),
      fi.boolean('Hover effects', 'hover_effects'),
      group('Hover', 'hover',
        {
          expanded: true,
          visibility: {
            controlling_field_path: 'style.general.hover_effects',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        },
        fi.color('Overlay color', 'overlay_color'),
        fi.choice('Card shadow', 'card_shadow', {
          display_width: 'half_width',
          choices: [
            ['shadow-sm-on-hover', 'Shadow small'],
            ['shadow-md-on-hover', 'Shadow medium'],
            ['shadow-lg-on-hover', 'Shadow large'],
            ['shadow-xlg-on-hover', 'Shadow xlarge'],
            ['shadow-2xlg-on-hover', 'Shadow 2xlarge'],
            ['shadow-3xlg-on-hover', 'Shadow 3xlarge'],
            ['custom-shadow1-on-hover', 'Custom-shadow 1'],
            ['custom-shadow2-on-hover', 'Custom-shadow 2'],
            ['custom-shadow3-on-hover', 'Custom-shadow 3']
          ]
        }),
        fi.choice('Animation', 'animation', {
          display_width: 'half_width',
          choices: [
            ['scale1x-on-hover', 'Scale 1x'],
            ['scale2x-on-hover', 'Scale 2x'],
            ['scale3x-on-hover', 'Scale 3x'],
            ['slideup1x-on-hover', 'Slide Up 1x'],
            ['slideup2x-on-hover', 'Slide Up 2x'],
            ['custom-animation1-on-hover', 'Custom animation 1'],
            ['custom-animation2-on-hover', 'Custom animation 2'],
            ['custom-animation3-on-hover', 'Custom animation 3']
          ]
        })
      )
    ),
    partial.textStyle(),
    partial.iconStyle('icon'),
    partial.buttonsStyle
  )
)
