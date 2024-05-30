import {
  group,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { partial } from '../partials/all.js'

const realButtonGroup = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    group('Buttons', 'button_group',
      {
        occurrence: {
          min: 0,
          max: 100,
          sorting_label_field: `${parent}button_group.button_text`
        }
      },
      partial.categoryList(),
      fi.choice('Style', 'button_style', {
        default: 'primary',
        choices: [
          ['primary', 'Primary'],
          ['secondary1', 'Button 2'],
          ['secondary2', 'Button 3'],
          ['secondary3', 'Button 4'],
          ['custombutton', 'Custom Button']
        ],
        required: true,
        display_width: 'half_width'
      }),
      fi.choice('Size', 'button_size', {
        default: 'regular',
        choices: [
          ['small', 'Small'],
          ['regular', 'Regular'],
          ['large', 'Large']
        ],
        required: true,
        display_width: 'half_width'
      }),
      fi.text('Text', 'button_text', {
        locked: false
      }),
      fi.choice('Position', 'button_position', {
        required: true,
        default: 'inline',
        display_width: 'half_width',
        choices: [
          ['inline', 'Inline with other buttons'],
          ['separate', 'On separate line'],
          ['fullwidth', 'Full width button']
        ]
      }),
      fi.font('Font', 'custom_button_font', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'custombutton'
            }
          ]
        }
      }),
      fi.color('Background', 'custom_button_background', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'custombutton'
            }
          ]
        }
      }),
      fi.number('Vertical spacing', 'custom_button_vertical_spacing', {
        min: 0,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'custombutton'
            }
          ]
        },
        display_width: 'half_width',
        suffix: 'px'
      }),
      fi.number('Horizontal', 'custom_button_horizontal_spacing', {
        min: 0,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'custombutton'
            }
          ]
        },
        display_width: 'half_width',
        suffix: 'px'
      }),
      fi.number('Border width', 'custom_button_border_width', {
        min: 0,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'custombutton'
            }
          ]
        },
        display_width: 'half_width',
        suffix: 'px'
      }),
      fi.number('Border radius', 'custom_button_border_radius', {
        min: 0,
        suffix: 'px',
        display_width: 'half_width',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'custombutton'
            }
          ]
        }
      }),
      fi.color('Border color', 'custom_button_border_color', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'custombutton'
            }
          ]
        }
      }),
      group('Hover effects', 'custom_button_hover',
        {
          visibility_rules: 'ADVANCED',
          advanced_visibility: {
            boolean_operator: 'AND',
            criteria: [
              {
                controlling_field_path: `${parent}button_group.button_style`,
                operator: 'EQUAL',
                controlling_value_regex: 'custombutton'
              }
            ]
          }
        },
        fi.color('Color', 'color'),
        fi.color('Background', 'background'),
        fi.color('Border color', 'border_color')
      ),
      group('Active state style', 'active_state_style',
        {
          locked: false
        },
        fi.color('Color', 'color'),
        fi.color('Background', 'background'),
        fi.color('Border color', 'border_color'),
        fi.boolean('Show close icon', 'show_close_icon')
      )
    )
  ]
}

export {
  realButtonGroup
}
