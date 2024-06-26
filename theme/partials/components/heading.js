import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const heading = (parent = '', defaultHeading = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.text('', 'heading_text', {
      allow_new_line: true,
      default: defaultHeading
    }),
    fi.boolean('', 'heading_text_prop_visibility', {
      inline_help_text: '<span style="color:#33475b;">Show/hide</span> additional <span style="color:#007a8c;font-weight:700;font-size:14px;">Heading</span> properties.',
      display: 'toggle'
    }),
    fi.choice('Tag', 'heading_tag', {
      choices: [
        ['h1', 'H1'],
        ['h2', 'H2'],
        ['h3', 'H3'],
        ['h4', 'H4'],
        ['h5', 'H5'],
        ['h6', 'H6']
      ],
      default: 'h2',
      required: true,
      help_text: 'Semantic heading tag (h1-h6)',
      display_width: 'half_width',
      visibility: {
        controlling_field_path: `${parent}heading_text_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.choice('Style', 'heading_style', {
      choices: [
        ['display-1', 'Style 12'],
        ['display-2', 'Style 11'],
        ['display-3', 'Style 10'],
        ['display-4', 'Style 9'],
        ['display-5', 'Style 8'],
        ['display-6', 'Style 7'],
        ['h1', 'Style 6 [H1]'],
        ['h2', 'Style 5 [H2]'],
        ['h3', 'Style 4 [H3]'],
        ['h4', 'Style 3 [H4]'],
        ['h5', 'Style 2 [H5]'],
        ['h6', 'Style 1 [H6]']
      ],
      help_text: 'Display different heading styles not related to semantic heading type (tag h1-h6)',
      display_width: 'half_width',
      visibility: {
        controlling_field_path: `${parent}heading_text_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.choice('Link type', 'heading_link_type', {
      choices: [
        ['link', 'Link'],
        ['anchor', 'Anchor']
      ],
      placeholder: 'No link',
      display_width: 'half_width',
      visibility: {
        controlling_field_path: `${parent}heading_text_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.link('', 'heading_link', {
      supported_types: ['BLOG', 'CALL_TO_ACTION', 'CONTENT', 'EMAIL_ADDRESS', 'FILE', 'EXTERNAL', 'PAYMENT', 'PHONE_NUMBER', 'WHATSAPP_NUMBER'],
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}heading_link_type`,
            operator: 'EQUAL',
            controlling_value_regex: 'link'
          },
          {
            controlling_field_path: `${parent}heading_text_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.choice('Add icon', 'heading_icon_type', {
      help_text: 'Add icon to the heading',
      display_width: 'half_width',
      placeholder: 'None',
      choices: [
        ['fontawesome', 'FontAwesome icon'],
        ['inline_svg', 'Inline SVG'],
        ['image', 'Image']
      ],
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}heading_link_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'anchor'
          },
          {
            controlling_field_path: `${parent}heading_text_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.choice('Icon position', 'heading_icon_position', {
      choices: [
        ['left', 'Left'],
        ['right', 'Right'],
        ['left-space-between', 'Left space between'],
        ['right-space-between', 'Right space between']
      ],
      default: 'left',
      display_width: 'half_width',
      required: true,
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}heading_icon_type`,
            operator: 'NOT_EMPTY'
          },
          {
            controlling_field_path: `${parent}heading_link_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'anchor'
          },
          {
            controlling_field_path: `${parent}heading_text_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.icon('Icon', 'heading_icon', {
      set: 'fontawesome-6.4.2',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}heading_icon_type`,
            operator: 'EQUAL',
            controlling_value_regex: 'fontawesome'
          },
          {
            controlling_field_path: `${parent}heading_link_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'anchor'
          },
          {
            controlling_field_path: `${parent}heading_text_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.html('Inline SVG', 'heading_inline_svg', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}heading_icon_type`,
            operator: 'EQUAL',
            controlling_value_regex: 'inline_svg'
          },
          {
            controlling_field_path: `${parent}heading_link_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'anchor'
          },
          {
            controlling_field_path: `${parent}heading_text_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.image('Image', 'heading_image', {
      resizable: false,
      responsive: false,
      show_loading: false,
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}heading_icon_type`,
            operator: 'EQUAL',
            controlling_value_regex: 'image'
          },
          {
            controlling_field_path: `${parent}heading_link_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'anchor'
          },
          {
            controlling_field_path: `${parent}heading_text_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.color('Icon color', 'heading_icon_color', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}heading_icon_type`,
            operator: 'NOT_EMPTY'
          },
          {
            controlling_field_path: `${parent}heading_icon_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'image'
          },
          {
            controlling_field_path: `${parent}heading_link_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'anchor'
          },
          {
            controlling_field_path: `${parent}heading_link_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'link'
          },
          {
            controlling_field_path: `${parent}heading_text_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.boolean('Advanced customization', 'heading_additional_customization', {
      help_text: 'Enable advanced <span style="color:#61dcee;font-weight:700;font-size:14px;">Heading</span> style customization.<br>***<br>Use only in rare cases when global heading style is not sufficient.',
      visibility: {
        controlling_field_path: `${parent}heading_text_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.font('Font', 'heading_font', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}heading_additional_customization`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          },
          {
            controlling_field_path: `${parent}heading_text_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      },
      visibility: {
        hidden_subfields: {
          size: true,
          bold: true,
          italic: true,
          underline: true,
          color: true
        }
      }
    }),
    fi.color('Color', 'heading_color', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}heading_additional_customization`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          },
          {
            controlling_field_path: `${parent}heading_text_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          },
          {
            controlling_field_path: `${parent}heading_link_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'link'
          },
          {
            controlling_field_path: `${parent}heading_link_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'anchor'
          }

        ]
      }
    }),
    fi.color('Color', 'heading_link_color', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        children: [
          {
            boolean_operator: 'AND',
            criteria: [
              {
                controlling_field_path: `${parent}heading_additional_customization`,
                operator: 'EQUAL',
                controlling_value_regex: 'true'
              },
              {
                controlling_field_path: `${parent}heading_text_prop_visibility`,
                operator: 'EQUAL',
                controlling_value_regex: 'true'
              }
            ]
          },
          {
            boolean_operator: 'OR',
            criteria: [
              {
                controlling_field_path: `${parent}heading_link_type`,
                operator: 'EQUAL',
                controlling_value_regex: 'link'
              },
              {
                controlling_field_path: `${parent}heading_link_type`,
                operator: 'EQUAL',
                controlling_value_regex: 'anchor'
              }
            ]
          }
        ]
      }
    }),
    fi.color('Hover color', 'heading_link_hover_color', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        children: [
          {
            boolean_operator: 'AND',
            criteria: [
              {
                controlling_field_path: `${parent}heading_additional_customization`,
                operator: 'EQUAL',
                controlling_value_regex: 'true'
              },
              {
                controlling_field_path: `${parent}heading_text_prop_visibility`,
                operator: 'EQUAL',
                controlling_value_regex: 'true'
              }
            ]
          },
          {
            boolean_operator: 'OR',
            criteria: [
              {
                controlling_field_path: `${parent}heading_link_type`,
                operator: 'EQUAL',
                controlling_value_regex: 'link'
              },
              {
                controlling_field_path: `${parent}heading_link_type`,
                operator: 'EQUAL',
                controlling_value_regex: 'anchor'
              }
            ]
          }
        ]
      }
    })
  ]
}

export {
  heading
}
