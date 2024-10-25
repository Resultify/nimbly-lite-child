import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'

const customTextGroup = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    group('Custom text', 'custom_text_group',
      {
        icon: {
          name: 'font',
          set: 'fontawesome-6.4.2',
          type: 'SOLID'
        },
        visibility: {
          controlling_field_path: `${parent}module_components`,
          operator: 'MATCHES_REGEX',
          controlling_value_regex: 'custom_text'
        },
        help_text: 'Customizable text. Text that can be used for badges or some unusual typography style.',
        occurrence: {
          min: 0,
          max: 10,
          sorting_label_field: 'custom_text_group.text'
        }
      },
      fi.text('Text', 'custom_text', {
        allow_new_line: true
      }),
      fi.boolean('Inline', 'custom_text_inline', {
        default: true,
        display_width: 'half_width',
        visibility: {
          controlling_field_path: `${parent}custom_text_group.custom_text`,
          operator: 'NOT_EMPTY'
        }
      }),
      fi.font('Font', 'custom_text_font', {
        visibility: {
          controlling_field_path: `${parent}custom_text_group.custom_text`,
          operator: 'NOT_EMPTY'
        }
      }),
      fi.color('Background', 'custom_text_background', {
        visibility: {
          controlling_field_path: `${parent}custom_text_group.custom_text`,
          operator: 'NOT_EMPTY'
        }
      }),
      fi.number('Vertical spacing', 'custom_text_vertical_spacing', {
        min: 0,
        visibility: {
          controlling_field_path: `${parent}custom_text_group.custom_text`,
          operator: 'NOT_EMPTY'
        },
        display_width: 'half_width',
        suffix: 'px'
      }),
      fi.number('Horizontal', 'custom_text_horizontal_spacing', {
        min: 0,
        visibility: {
          controlling_field_path: `${parent}custom_text_group.custom_text`,
          operator: 'NOT_EMPTY'
        },
        display_width: 'half_width',
        suffix: 'px'
      }),
      fi.number('Border radius', 'custom_text_border_radius', {
        min: 0,
        visibility: {
          controlling_field_path: `${parent}custom_text_group.custom_text`,
          operator: 'NOT_EMPTY'
        },
        suffix: 'px'
      }),
      fi.color('Gradient color', 'gradient_color', {
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
          controlling_field_path: `${parent}custom_text_group.custom_text`,
          operator: 'NOT_EMPTY'
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
        visibility: {
          controlling_field_path: `${parent}custom_text_group.custom_text`,
          operator: 'NOT_EMPTY'
        }
      })
    )
  ]
}

export {
  customTextGroup
}
