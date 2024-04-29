import {
  group,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const buttons = [
  group('Buttons', 'buttons',
    {
      occurrence: {
        min: 0,
        max: 15,
        sorting_label_field: 'buttons.button_text'
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
      required: true,
      display_width: 'half_width'
    }),
    fi.cta('CTA', 'cta', {
      visibility: {
        controlling_field_path: 'buttons.button_style',
        operator: 'EQUAL',
        controlling_value_regex: 'cta'
      }
    }),
    fi.choice('Size', 'button_size', {
      default: 'regular',
      choices: [
        ['small', 'Small'],
        ['regular', 'Regular'],
        ['large', 'Large']
      ],
      required: true,
      display_width: 'half_width',
      visibility_rules: 'ADVANCED',
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
    }),
    fi.text('Text', 'button_text', {
      visibility: {
        controlling_field_path: 'buttons.button_style',
        operator: 'NOT_EQUAL',
        controlling_value_regex: 'cta'
      }
    }),
    fi.link('', 'button', {
      visibility: {
        controlling_field_path: 'buttons.button_style',
        operator: 'NOT_EQUAL',
        controlling_value_regex: 'cta'
      }
    }),
    fi.boolean('Inline', 'inline', {
      default: true,
      display_width: 'half_width',
      visibility: {
        controlling_field_path: 'buttons.button_text',
        operator: 'NOT_EMPTY'
      }
    }),
    fi.boolean('Full width', 'button_full_width', {
      display_width: 'half_width',
      visibility_rules: 'ADVANCED',
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
    }),
    fi.choice('Add icon or image', 'add_icon_or_image', {
      visibility_rules: 'ADVANCED',
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
      },
      choices: [
        ['icon', 'Icon'],
        ['image', 'Image']
      ]
    }),
    fi.icon('Icon', 'btn_icon', {
      visibility_rules: 'ADVANCED',
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
    }),
    fi.image('Image', 'btn_image', {
      resizable: false,
      responsive: false,
      show_loading: false,
      visibility_rules: 'ADVANCED',
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
    }),
    fi.choice('Icon position', 'icon_position', {
      choices: [
        ['left', 'Left'],
        ['right', 'Right']
      ],
      default: 'left',
      required: true,
      visibility_rules: 'ADVANCED',
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
    })
  )
]

const buttonsStyle = [
  fi.boolean('Show custom button style options', 'show_custom_button_style_options'),
  group('Custom link', 'custom_link',
    {
      visibility: {
        controlling_field_path: 'style.show_custom_button_style_options',
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    },
    fi.font('Font', 'font', {
      visibility: {
        hidden_subfields: {
          underline: true
        }
      }
    }),
    fi.choice('Underline', 'underline', {
      display: 'radio',
      choices: [
        ['underline', 'Underline'],
        ['none', 'None']
      ]
    }),
    group('Hover', 'hover', {},
      fi.color('Color', 'color'),
      fi.choice('Underline', 'underline', {
        display: 'radio',
        choices: [
          ['underline', 'Underline'],
          ['none', 'None']
        ]
      })
    )
  ),
  group('Custom button 1', 'custom_button_1',
    {
      visibility: {
        controlling_field_path: 'style.show_custom_button_style_options',
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    },
    fi.spacing('Spacing', 'spacing'),
    fi.color('Background', 'background'),
    fi.font('Font', 'font'),
    fi.border('Border', 'border'),
    fi.number('Border radius', 'border_radius', {
      suffix: 'px'
    }),
    group('Hover', 'hover', {},
      fi.color('Background', 'background'),
      fi.color('Color', 'color'),
      fi.color('Border color', 'border_color')
    )
  ),
  group('Custom button 2', 'custom_button_2',
    {
      visibility: {
        controlling_field_path: 'style.show_custom_button_style_options',
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    },
    fi.spacing('Spacing', 'spacing'),
    fi.color('Background', 'background'),
    fi.font('Font', 'font'),
    fi.border('Border', 'border'),
    fi.number('Border radius', 'border_radius', {
      suffix: 'px'
    }),
    group('Hover', 'hover', {},
      fi.color('Background', 'background'),
      fi.color('Color', 'color'),
      fi.color('Border color', 'border_color')
    )
  )
]

export {
  buttons,
  buttonsStyle
}
