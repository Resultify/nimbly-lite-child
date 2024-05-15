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
        ['custombutton', 'Custom Button']
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
    fi.link('', 'button_link', {
      supported_types: ['BLOG', 'CALL_TO_ACTION', 'CONTENT', 'EMAIL_ADDRESS', 'FILE', 'EXTERNAL', 'PAYMENT', 'PHONE_NUMBER', 'WHATSAPP_NUMBER'],
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
            controlling_value_regex: 'customlink'
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
      display_width: 'half_width',
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
    }),
    fi.boolean('Hide text', 'hide_text', {
      help_text: 'Hide the button text and only show the icon or image',
      display_width: 'half_width',
      default: false,
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
    }),
    fi.boolean('Custom style', 'custom_style', {
      default: false,
      display_width: 'half_width',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'buttons.button_style',
            operator: 'MATCHES_REGEX',
            controlling_value_regex: 'custom'
          },
          {
            controlling_field_path: 'buttons.button_text',
            operator: 'NOT_EMPTY'
          }
        ]
      }
    }),
    fi.font('Font', 'link_font', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'buttons.button_style',
            operator: 'EQUAL',
            controlling_value_regex: 'customlink'
          },
          {
            controlling_field_path: 'buttons.custom_style',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      },
      visibility: {
        hidden_subfields: {
          underline: true
        }
      }
    }),
    fi.choice('Underline', 'link_underline', {
      display: 'radio',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'buttons.button_style',
            operator: 'EQUAL',
            controlling_value_regex: 'customlink'
          },
          {
            controlling_field_path: 'buttons.custom_style',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      },
      choices: [
        ['underline', 'Underline'],
        ['none', 'None']
      ]
    }),
    group('Hover', 'link_hover',
      {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: 'buttons.button_style',
              operator: 'EQUAL',
              controlling_value_regex: 'customlink'
            },
            {
              controlling_field_path: 'buttons.custom_style',
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            }
          ]
        }
      },
      fi.color('Color', 'color'),
      fi.choice('Underline', 'underline', {
        display: 'radio',
        choices: [
          ['underline', 'Underline'],
          ['none', 'None']
        ]
      })
    ),

    fi.spacing('Spacing', 'button_spacing', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'buttons.button_style',
            operator: 'EQUAL',
            controlling_value_regex: 'custombutton'
          },
          {
            controlling_field_path: 'buttons.custom_style',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      },
      visibility: {
        hidden_subfields: {
          margin: true
        }
      }
    }),
    fi.color('Background', 'button_background', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'buttons.button_style',
            operator: 'EQUAL',
            controlling_value_regex: 'custombutton'
          },
          {
            controlling_field_path: 'buttons.custom_style',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.font('Font', 'button_font', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'buttons.button_style',
            operator: 'EQUAL',
            controlling_value_regex: 'custombutton'
          },
          {
            controlling_field_path: 'buttons.custom_style',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.border('Border', 'button_border', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'buttons.button_style',
            operator: 'EQUAL',
            controlling_value_regex: 'custombutton'
          },
          {
            controlling_field_path: 'buttons.custom_style',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.number('Border radius', 'button_border_radius', {
      suffix: 'px',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'buttons.button_style',
            operator: 'EQUAL',
            controlling_value_regex: 'custombutton'
          },
          {
            controlling_field_path: 'buttons.custom_style',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    group('Hover', 'button_hover',
      {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: 'buttons.button_style',
              operator: 'EQUAL',
              controlling_value_regex: 'custombutton'
            },
            {
              controlling_field_path: 'buttons.custom_style',
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            }
          ]
        }
      },
      fi.color('Background', 'background'),
      fi.color('Color', 'color'),
      fi.color('Border color', 'border_color')
    )
  )
]

export {
  buttons
}
