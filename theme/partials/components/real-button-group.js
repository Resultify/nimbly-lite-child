import {
  group,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { categoryList } from '../data/category-list.js'

const realButtonGroup = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    group('Buttons', 'button_group',
      {
        icon: {
          name: 'audio-description',
          set: 'fontawesome-6.4.2',
          type: 'SOLID'
        },
        occurrence: {
          min: 0,
          max: 100,
          default: 3,
          sorting_label_field: `${parent}button_group.button_text`
        },
        default: [
          {
            active_state_style: {
              background: {
                color: "#E06666",
                opacity: 100
              },
              border_color: {
                color: "#E06666",
                opacity: 100
              },
              color: {
                color: "#FFFFFF",
                opacity: 100
              },
              show_close_icon: true
            },
            button_position: "inline",
            button_size: "regular",
            button_style: "primary",
            button_text: "Style 1",
            category: categoryList[0][0],
            custom_button_background: { },
            custom_button_border_color: { },
            custom_button_font: {
              font_set: "DEFAULT"
            },
            custom_button_hover: {
              background: { },
              border_color: { },
              color: { }
            }
          }, {
            active_state_style: {
              background: {
                color: "#E06666",
                opacity: 100
              },
              border_color: {
                color: "#E06666",
                opacity: 100
              },
              color: {
                color: "#FFFFFF",
                opacity: 100
              },
              show_close_icon: true
            },
            button_position: "inline",
            button_size: "regular",
            button_style: "primary",
            button_text: "Style 2",
            category: categoryList[0][1],
            custom_button_background: { },
            custom_button_border_color: { },
            custom_button_font: {
              font_set: "DEFAULT"
            },
            custom_button_hover: {
              background: { },
              border_color: { },
              color: { }
            }
          }, {
            active_state_style: {
              background: {
                color: "#E06666",
                opacity: 100
              },
              border_color: {
                color: "#E06666",
                opacity: 100
              },
              color: {
                color: "#FFFFFF",
                opacity: 100
              },
              show_close_icon: true
            },
            button_position: "inline",
            button_size: "regular",
            button_style: "primary",
            button_text: "Style 3",
            category: categoryList[0][2],
            custom_button_background: { },
            custom_button_border_color: { },
            custom_button_font: {
              font_set: "DEFAULT"
            },
            custom_button_hover: {
              background: { },
              border_color: { },
              color: { }
            }
          },
        ]
      },
      fi.choice('Category', 'category', {
        choices: categoryList
      }),
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
