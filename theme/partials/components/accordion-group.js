import {
  group,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const accordionGroup = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    group('Accordion', 'accordion_group',
      {
        visibility: {
          controlling_field_path: `${parent}module_components`,
          operator: 'MATCHES_REGEX',
          controlling_value_regex: 'accordion'
        }
      },
      group('Accordion item', 'accordion_item',
        {
          occurrence: {
            min: 0,
            max: 100,
            sorting_label_field: `${parent}accordion_group.accordion_item.accordion_item_title`
          }
        },
        fi.text('Accordion heading', 'accordion_item_title'),
        fi.richtext('Accordion item text', 'accordion_item_text')
      ),
      fi.boolean('', 'accordion_title_prop_visibility', {
        inline_help_text: '<span style="color:#33475b;">Show/hide</span> accordion <span style="color:#007a8c;font-weight:700;font-size:14px;">Title</span> properties.',
        display: 'toggle'
      }),
      fi.font('Title font', 'accordion_title_font', {
        visibility: {
          hidden_subfields: {
            color: true,
            size: true,
            bold: true,
            italic: true,
            underline: true
          },
          controlling_field_path: `${parent}accordion_group.accordion_title_prop_visibility`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      }),
      fi.color('Title color', 'accordion_title_color', {
        visibility: {
          controlling_field_path: `${parent}accordion_group.accordion_title_prop_visibility`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      }),
      fi.number('Title size', 'accordion_title_size', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px',
        visibility: {
          controlling_field_path: `${parent}accordion_group.accordion_title_prop_visibility`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      }),
      fi.boolean('', 'accordion_spacing_prop_visibility', {
        inline_help_text: '<span style="color:#33475b;">Show/hide</span> accordion <span style="color:#007a8c;font-weight:700;font-size:14px;">Spacing</span> properties.',
        display: 'toggle'
      }),
      fi.number('Top', 'accordion_spacing_top', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px',
        visibility: {
          controlling_field_path: `${parent}accordion_group.accordion_spacing_prop_visibility`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      }),
      fi.number('Bottom', 'accordion_spacing_bottom', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px',
        visibility: {
          controlling_field_path: `${parent}accordion_group.accordion_spacing_prop_visibility`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      }),
      fi.number('Left', 'accordion_spacing_left', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px',
        visibility: {
          controlling_field_path: `${parent}accordion_group.accordion_spacing_prop_visibility`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      }),
      fi.number('Right', 'accordion_spacing_right', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px',
        visibility: {
          controlling_field_path: `${parent}accordion_group.accordion_spacing_prop_visibility`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      }),
      fi.boolean('', 'accordion_icon_prop_visibility', {
        inline_help_text: '<span style="color:#33475b;">Show/hide</span> accordion <span style="color:#007a8c;font-weight:700;font-size:14px;">Icon</span> properties.',
        display: 'toggle'
      }),
      fi.choice('Icon position', 'accordion_icon_position', {
        choices: [
          ['left', 'Left'],
          ['right', 'Right']
        ],
        default: 'left',
        display_width: 'half_width',
        required: true,
        visibility: {
          controlling_field_path: `${parent}accordion_group.accordion_icon_prop_visibility`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      }),
      fi.number('Icon size', 'accordion_icon_size', {
        display_width: 'half_width',
        min: 0,
        suffix: 'px',
        visibility: {
          controlling_field_path: `${parent}accordion_group.accordion_icon_prop_visibility`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      }),
      fi.number('Icon gap', 'accordion_icon_gap', {
        display_width: 'half_width',
        min: 0,
        suffix: 'px',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}accordion_group.accordion_icon_prop_visibility`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_icon_position`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'right'
            }
          ]
        }
      }),
      fi.html('Inline SVG', 'accordion_icon_inline_svg', {
        visibility: {
          controlling_field_path: `${parent}accordion_group.accordion_icon_prop_visibility`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      }),
      fi.color('Icon color', 'accordion_icon_color', {
        visibility: {
          controlling_field_path: `${parent}accordion_group.accordion_icon_prop_visibility`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      }),
      fi.boolean('', 'accordion_border_prop_visibility', {
        inline_help_text: '<span style="color:#33475b;">Show/hide</span> accordion <span style="color:#007a8c;font-weight:700;font-size:14px;">Border</span> properties.',
        display: 'toggle'
      }),
      fi.choice('Border style', 'accordion_border_style', {
        choices: [
          ['no_border', 'No border'],
          ['border_divider', 'Border divider'],
          ['border_wrapper', 'Border wrapper']
        ],
        default: 'border_divider',
        display_width: 'half_width',
        required: true,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_prop_visibility`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            }
          ]
        }
      }),
      fi.number('Border width', 'accordion_border_width', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_prop_visibility`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_style`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'no_border'
            }
          ]
        }
      }),
      fi.color('Border color', 'accordion_border_color', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_prop_visibility`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_style`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'no_border'
            }
          ]
        }
      }),
      fi.number('Border radius', 'accordion_border_radius', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_prop_visibility`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_style`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'no_border'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'border_wrapper'
            }
          ]
        }
      }),
      fi.number('Gap', 'accordion_border_gap', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_prop_visibility`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_style`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'no_border'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'border_wrapper'
            }
          ]
        }
      }),
      fi.color('Background color', 'accordion_bg_color', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_prop_visibility`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_style`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'no_border'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'border_wrapper'
            }
          ]
        }
      }),
      fi.boolean('Show top border', 'accordion_show_top_border', {
        display_width: 'half_width',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_prop_visibility`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_style`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'no_border'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'border_divider'
            }
          ]
        }
      }),
      fi.boolean('Show bottom border', 'accordion_show_bottom_border', {
        display_width: 'half_width',
        default: true,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_prop_visibility`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_style`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'no_border'
            },
            {
              controlling_field_path: `${parent}accordion_group.accordion_border_style`,
              operator: 'EQUAL',
              controlling_value_regex: 'border_divider'
            }
          ]
        }
      })
    )
  ]
}

export {
  accordionGroup
}
