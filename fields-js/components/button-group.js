import {
  group,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const buttonGroup = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    group('Button', 'button_group',
      {
        occurrence: {
          min: 0,
          max: 15,
          sorting_label_field: 'button_group.button_text'
        }
      },
      fi.choice('Style', 'button_style', {
        default: 'primary',
        choices: [
          ['primary', 'Primary'],
          ['secondary1', 'Button 2'],
          ['secondary2', 'Button 3'],
          ['secondary3', 'Button 4'],
          ['linkonly', 'Link'],
          ['cta', 'CTA'],
          ['customlink', 'Custom link'],
          ['custombutton', 'Custom Button']
        ],
        required: true,
        display_width: 'half_width'
      }),
      fi.cta('CTA', 'button_cta', {
        visibility: {
          controlling_field_path: `${parent}button_group.button_style`,
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
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'linkonly'
            },
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'cta'
            }
          ]
        }
      }),
      fi.text('Text', 'button_text', {
        visibility: {
          controlling_field_path: `${parent}button_group.button_style`,
          operator: 'NOT_EQUAL',
          controlling_value_regex: 'cta'
        }
      }),
      fi.link('', 'button_link', {
        supported_types: ['BLOG', 'CALL_TO_ACTION', 'CONTENT', 'EMAIL_ADDRESS', 'FILE', 'EXTERNAL', 'PAYMENT', 'PHONE_NUMBER', 'WHATSAPP_NUMBER'],
        visibility: {
          controlling_field_path: `${parent}button_group.button_style`,
          operator: 'NOT_EQUAL',
          controlling_value_regex: 'cta'
        }
      }),
      fi.boolean('Inline', 'button_inline', {
        default: true,
        display_width: 'half_width',
        visibility: {
          controlling_field_path: `${parent}button_group.button_text`,
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
              controlling_field_path: `${parent}button_group.button_text`,
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'linkonly'
            },
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'customlink'
            },
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'cta'
            }
          ]
        }
      }),
      fi.alignment('Alignment', 'button_alignment',
        {
          alignment_direction: 'HORIZONTAL',
          visibility_rules: 'ADVANCED',
          advanced_visibility: {
            boolean_operator: 'AND',
            criteria: [
              {
                controlling_field_path: `${parent}button_group.button_text`,
                operator: 'NOT_EMPTY'
              },
              {
                controlling_field_path: `${parent}button_group.button_full_width`,
                operator: 'EQUAL',
                controlling_value_regex: 'false'
              },
              {
                controlling_field_path: `${parent}button_group.button_inline`,
                operator: 'EQUAL',
                controlling_value_regex: 'false'
              }
            ]
          }
        }
      ),
      fi.choice('Add Icon', 'add_button_icon', {
        help_text: 'Add an icon to the button',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_text`,
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: `${parent}button_group.button_style`,
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
      fi.icon('Icon', 'button_icon', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_text`,
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: `${parent}button_group.add_button_icon`,
              operator: 'EQUAL',
              controlling_value_regex: 'icon'
            }
          ]
        }
      }),
      fi.image('Image', 'button_image', {
        resizable: false,
        responsive: false,
        show_loading: false,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_text`,
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: `${parent}button_group.add_button_icon`,
              operator: 'EQUAL',
              controlling_value_regex: 'image'
            }
          ]
        }
      }),
      fi.choice('Icon position', 'button_icon_position', {
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
                  controlling_field_path: `${parent}button_group.button_text`,
                  operator: 'NOT_EMPTY'
                }
              ]
            },
            {
              boolean_operator: 'OR',
              criteria: [
                {
                  controlling_field_path: `${parent}button_group.add_button_icon`,
                  operator: 'EQUAL',
                  controlling_value_regex: 'icon'
                },
                {
                  controlling_field_path: `${parent}button_group.add_button_icon`,
                  operator: 'EQUAL',
                  controlling_value_regex: 'image'
                }
              ]
            },
            {
              boolean_operator: 'OR',
              criteria: [
                {
                  controlling_field_path: `${parent}button_group.button_icon`,
                  operator: 'NOT_EMPTY',
                  property: 'name'
                },
                {
                  controlling_field_path: `${parent}button_group.button_image`,
                  operator: 'NOT_EMPTY',
                  property: 'src'
                }
              ]
            }
          ]
        }
      }),
      fi.boolean('Hide text', 'button_hide_text', {
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
                  controlling_field_path: `${parent}button_group.button_text`,
                  operator: 'NOT_EMPTY'
                }
              ]
            },
            {
              boolean_operator: 'OR',
              criteria: [
                {
                  controlling_field_path: `${parent}button_group.add_button_icon`,
                  operator: 'EQUAL',
                  controlling_value_regex: 'icon'
                },
                {
                  controlling_field_path: `${parent}button_group.add_button_icon`,
                  operator: 'EQUAL',
                  controlling_value_regex: 'image'
                }
              ]
            },
            {
              boolean_operator: 'OR',
              criteria: [
                {
                  controlling_field_path: `${parent}button_group.button_icon`,
                  operator: 'NOT_EMPTY',
                  property: 'name'
                },
                {
                  controlling_field_path: `${parent}button_group.button_image`,
                  operator: 'NOT_EMPTY',
                  property: 'src'
                }
              ]
            }
          ]
        }
      }),
      fi.boolean('Custom style', 'button_custom_style', {
        default: false,
        display_width: 'half_width',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'MATCHES_REGEX',
              controlling_value_regex: 'custom'
            },
            {
              controlling_field_path: `${parent}button_group.button_text`,
              operator: 'NOT_EMPTY'
            }
          ]
        }
      }),
      fi.font('Font', 'custom_link_font', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'customlink'
            },
            {
              controlling_field_path: `${parent}button_group.button_custom_style`,
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
      fi.choice('Underline', 'custom_link_underline', {
        display: 'radio',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'customlink'
            },
            {
              controlling_field_path: `${parent}button_group.button_custom_style`,
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
      group('Hover effects', 'custom_link_hover',
        {
          visibility_rules: 'ADVANCED',
          advanced_visibility: {
            boolean_operator: 'AND',
            criteria: [
              {
                controlling_field_path: `${parent}button_group.button_style`,
                operator: 'EQUAL',
                controlling_value_regex: 'customlink'
              },
              {
                controlling_field_path: `${parent}button_group.button_custom_style`,
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
      fi.font('Font', 'custom_button_font', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'custombutton'
            },
            {
              controlling_field_path: `${parent}button_group.button_custom_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
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
            },
            {
              controlling_field_path: `${parent}button_group.button_custom_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            }
          ]
        }
      }),
      fi.border('Border', 'custom_button_border', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'custombutton'
            },
            {
              controlling_field_path: `${parent}button_group.button_custom_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            }
          ]
        }
      }),
      fi.number('Border radius', 'custom_button_border_radius', {
        suffix: 'px',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'custombutton'
            },
            {
              controlling_field_path: `${parent}button_group.button_custom_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            }
          ]
        }
      }),
      fi.spacing('Spacing', 'custom_button_spacing', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}button_group.button_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'custombutton'
            },
            {
              controlling_field_path: `${parent}button_group.button_custom_style`,
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
              },
              {
                controlling_field_path: `${parent}button_group.button_custom_style`,
                operator: 'EQUAL',
                controlling_value_regex: 'true'
              }
            ]
          }
        },
        fi.color('Color', 'color'),
        fi.color('Background', 'background'),
        fi.color('Border color', 'border_color')
      )
    )
  ]
}

export {
  buttonGroup
}
