/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const _buttons = [
  group('Buttons', 'buttons',
    {
      repeater_options: {
        occurrence: {
          min: 0,
          max: 5
        }
      }
    },
    fi.choice('Style', 'button_style', {
      default: 'primary',
      choices: [
        ['primary', 'Primary'],
        ['secondary2', 'Button 2'],
        ['secondary3', 'Button 3'],
        ['secondary4', 'Button 4'],
        ['linkonly', 'Link'],
        ['cta', 'CTA'],
        ['customlink', 'Custom link'],
        ['custom1', 'Custom Button 1'],
        ['custom2', 'Custom Button 2']
      ],
      editor_options: {
        required: true,
        display_width: 'half_width'
      }
    }),
    fi.cta('CTA', 'cta', {
      display_conditions: {
        visibility: {
          controlling_field_path: 'buttons.button_style',
          operator: 'EQUAL',
          controlling_value_regex: 'cta'
        }
      }
    }),
    fi.choice('Size', 'button_size', {
      default: 'regular',
      choices: [
        ['small', 'Small'],
        ['regular', 'Regular'],
        ['large', 'Large']
      ],
      editor_options: {
        required: true,
        display_width: 'half_width'
      },
      display_conditions: {
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: 'buttons.button_style',
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'linkonly'
            },
            {
              controlling_field_path: 'buttons.button_style',
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'cta'
            }
          ]
        }
      }
    }),
    fi.text('Text', 'button_text', {
      display_conditions: {
        visibility: {
          controlling_field_path: 'buttons.button_style',
          operator: 'NOT_EQUAL',
          controlling_value_regex: 'cta'
        }
      }
    }),
    fi.link('', 'button', {
      display_conditions: {
        visibility: {
          controlling_field_path: 'buttons.button_style',
          operator: 'NOT_EQUAL',
          controlling_value_regex: 'cta'
        }
      }
    }),
    fi.boolean('Inline', 'inline', {
      default: true,
      editor_options: {
        display_width: 'half_width'
      },
      display_conditions: {
        visibility: {
          controlling_field_path: 'buttons.button_text',
          operator: 'NOT_EMPTY'
        }
      }
    }),
    fi.boolean('Full width', 'button_full_width', {
      editor_options: {
        display_width: 'half_width'
      },
      display_conditions: {
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: 'buttons.button_text',
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: 'buttons.button_style',
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'linkonly'
            },
            {
              controlling_field_path: 'buttons.button_style',
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'cta'
            }
          ]
        }
      }
    }),
    fi.choice('Add icon or image', 'add_icon_or_image', {
      display_conditions: {
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: 'buttons.button_text',
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: 'buttons.button_style',
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'cta'
            }
          ]
        }
      },
      choices: [
        ['icon', 'Icon'],
        ['image', 'Image']
      ]
    }),
    fi.icon('Icon', 'btn_icon', {
      display_conditions: {
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: 'buttons.button_text',
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: 'buttons.add_icon_or_image',
              operator: 'EQUAL',
              controlling_value_regex: 'icon'
            }
          ]
        }
      }
    }),
    fi.image('Image', 'btn_image', {
      resizable: false,
      responsive: false,
      show_loading: false,
      display_conditions: {
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: 'buttons.button_text',
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: 'buttons.add_icon_or_image',
              operator: 'EQUAL',
              controlling_value_regex: 'image'
            }
          ]
        }
      }
    }),
    fi.choice('Icon position', 'icon_position', {
      choices: [
        ['left', 'Left'],
        ['right', 'Right']
      ],
      default: 'left',
      editor_options: {
        required: true
      },
      display_conditions: {
        advanced_visibility: {
          boolean_operator: 'AND',
          children: [
            {
              boolean_operator: 'AND',
              criteria: [
                {
                  controlling_field_path: 'buttons.button_text',
                  operator: 'NOT_EMPTY'
                }
              ]
            },
            {
              boolean_operator: 'OR',
              criteria: [
                {
                  controlling_field_path: 'buttons.add_icon_or_image',
                  operator: 'EQUAL',
                  controlling_value_regex: 'icon'
                },
                {
                  controlling_field_path: 'buttons.add_icon_or_image',
                  operator: 'EQUAL',
                  controlling_value_regex: 'image'
                }
              ]
            },
            {
              boolean_operator: 'OR',
              criteria: [
                {
                  controlling_field_path: 'buttons.btn_icon',
                  operator: 'NOT_EMPTY',
                  property: 'name'
                },
                {
                  controlling_field_path: 'buttons.btn_image',
                  operator: 'NOT_EMPTY',
                  property: 'src'
                }
              ]
            }
          ]
        }
      }
    })
  )
]

const buttons = [
  _buttons
]

export {
  buttons
}
