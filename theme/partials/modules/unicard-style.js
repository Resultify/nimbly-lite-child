import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'

/**
 * #### fullWidthImage fields
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 * @param {boolean} [opt.showCardStyle] - show lottie scale prop
 */
const styleGroup = (parent = '', opt) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    group('Card style', 'card_style',
      {

        icon: {
          name: 'paint-brush',
          set: 'fontawesome-6.4.2',
          type: 'SOLID'
        },
        expanded: false,
        locked: !(opt?.showCardStyle),
        inline_help_text: 'Customize the card style. You can set the background color, image, and text color.',
      },
      fi.color('Text color', 'text_color', {
        display_width: 'half_width',
        show_opacity: false
      }),
      fi.choice('Background type', 'background_type', {
        display_width: 'half_width',
        placeholder: 'No background',
        choices: [
          ['background_color', 'Background color'],
          ['background_image', 'Background image'],
          ['background_gradient', 'Background gradient']
        ]
      }),
      fi.color('Background color', 'background_color', {
        visibility: {
          controlling_field_path: `${parent}card_style.background_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'background_color'
        }
      }),
      fi.file('Background image', 'background_image', {
        picker: 'image',
        visibility: {
          controlling_field_path: `${parent}card_style.background_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'background_image'
        }
      }),
      fi.choice('Background size', 'background_size', {
        default: 'cover',
        display_width: 'half_width',
        required: true,
        choices: [
          ['contain', 'Resize to show entire image'],
          ['cover', 'Resize to fill container'],
          ['auto', 'Display full size']
        ],
        visibility: {
          controlling_field_path: `${parent}card_style.background_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'background_image'
        }
      }),
      fi.choice('Bgr. alignment', 'background_alignment', {
        default: 'MIDDLE_CENTER',
        display_width: 'half_width',
        required: true,
        choices: [
          ['TOP_LEFT', 'Top left'],
          ['TOP_CENTER', 'Top center'],
          ['TOP_RIGHT', 'Top right'],
          ['MIDDLE_LEFT', 'Middle left'],
          ['MIDDLE_CENTER', 'Middle center'],
          ['MIDDLE_RIGHT', 'Middle right'],
          ['BOTTOM_LEFT', 'Bottom left'],
          ['BOTTOM_CENTER', 'Bottom center'],
          ['BOTTOM_RIGHT', 'Bottom right']
        ],
        visibility: {
          controlling_field_path: `${parent}card_style.background_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'background_image'
        }
      }),
      fi.choice('Background image overlay type', 'background_image_overlay_type', {
        visibility: {
          controlling_field_path: `${parent}card_style.background_type`,
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
              controlling_field_path: `${parent}card_style.background_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'background_image'
            },
            {
              controlling_field_path: `${parent}card_style.background_image_overlay_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'color'
            }
          ]
        }
      }),
      fi.color('Gradient color', 'background_image_overlay_gradient_color', {
        display_width: 'half_width',
        occurrence: {
          min: 2,
          max: 7,
          default: 2
        },
        default: [
          { color: '#999999', opacity: 100 },
          { color: '#999999', opacity: 100 }
        ],
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}card_style.background_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'background_image'
            },
            {
              controlling_field_path: `${parent}card_style.background_image_overlay_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'gradient'
            }
          ]
        }
      }),
      fi.choice('Gradient direction', 'background_image_overlay_gradient_direction', {
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
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}card_style.background_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'background_image'
            },
            {
              controlling_field_path: `${parent}card_style.background_image_overlay_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'gradient'
            }
          ]
        }
      }),
      fi.color('Gradient color', 'background_gradient_color', {
        display_width: 'half_width',
        occurrence: {
          min: 2,
          max: 7,
          default: 2
        },
        default: [
          { color: '#999999', opacity: 100 },
          { color: '#999999', opacity: 100 }
        ],
        visibility: {
          controlling_field_path: `${parent}card_style.background_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'background_gradient'
        },
      }),
      fi.choice('Gradient direction', 'background_gradient_direction', {
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
        visibility: {
          controlling_field_path: `${parent}card_style.background_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'background_gradient'
        },
      })
    )
  ]
}

export {
  styleGroup
}
