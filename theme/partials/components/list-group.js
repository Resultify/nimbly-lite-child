import {
  group,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const listGroup = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    group('List', 'list_group',
      {
        visibility: {
          controlling_field_path: `${parent}module_components`,
          operator: 'MATCHES_REGEX',
          controlling_value_regex: 'list'
        },
        occurrence: {
          min: 0,
          max: 100,
          sorting_label_field: 'list_group.list_item_text'
        }
      },
      fi.text('List item text', 'list_item_text'),
      fi.font('Font', 'list_item_font', {
        visibility: {
          controlling_field_path: `${parent}list_group.list_item_text`,
          operator: 'NOT_EMPTY'
        }
      }),
      fi.choice('Add icon', 'list_item_icon_type', {
        help_text: 'Add icon to the list item',
        display_width: 'half_width',
        placeholder: 'None',
        choices: [
          ['fontawesome', 'FontAwesome icon'],
          ['inline_svg', 'Inline SVG'],
          ['image', 'Image']
        ],
        visibility: {
          controlling_field_path: `${parent}list_group.list_item_text`,
          operator: 'NOT_EMPTY'
        }
      }),
      fi.choice('Icon position', 'list_item_icon_position', {
        choices: [
          ['left', 'Left'],
          ['right', 'Right']
          // ['left-space-between', 'Left space between'],
          // ['right-space-between', 'Right space between']
        ],
        default: 'left',
        display_width: 'half_width',
        required: true,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}list_group.list_item_icon_type`,
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: `${parent}list_group.list_item_text`,
              operator: 'NOT_EMPTY'
            }
          ]
        }
      }),
      fi.icon('Icon', 'list_item_icon', {
        set: 'fontawesome-6.4.2',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}list_group.list_item_icon_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'fontawesome'
            },
            {
              controlling_field_path: `${parent}list_group.list_item_text`,
              operator: 'NOT_EMPTY'
            }
          ]
        }
      }),
      fi.html('Inline SVG', 'list_item_inline_svg', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}list_group.list_item_icon_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'inline_svg'
            },
            {
              controlling_field_path: `${parent}list_group.list_item_text`,
              operator: 'NOT_EMPTY'
            }
          ]
        }
      }),
      fi.image('Image', 'list_item_image', {
        responsive: false,
        resizable: false,
        show_loading: false,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}list_group.list_item_icon_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'image'
            },
            {
              controlling_field_path: `${parent}list_group.list_item_text`,
              operator: 'NOT_EMPTY'
            }
          ]
        }
      }),
      fi.color('Icon color', 'list_item_icon_color', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}list_group.list_item_icon_type`,
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: `${parent}list_group.list_item_icon_type`,
              operator: 'NOT_EQUAL',
              controlling_value_regex: 'image'
            },
            {
              controlling_field_path: `${parent}list_group.list_item_text`,
              operator: 'NOT_EMPTY'
            }
          ]
        }
      }),
      fi.number('Icon size', 'list_item_icon_size', {
        display_width: 'half_width',
        min: 0,
        suffix: 'px',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}list_group.list_item_icon_type`,
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: `${parent}list_group.list_item_text`,
              operator: 'NOT_EMPTY'
            }
          ]
        }
      }),
      fi.number('Icon gap', 'list_item_icon_gap', {
        display_width: 'half_width',
        min: 0,
        suffix: 'px',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}list_group.list_item_icon_type`,
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: `${parent}list_group.list_item_text`,
              operator: 'NOT_EMPTY'
            }
          ]
        }
      })
    ),
    fi.number('List gap', 'list_gap', {
      help_text: 'Space between list items',
      min: 0,
      display_width: 'half_width',
      suffix: 'px',
      visibility: {
        controlling_field_path: `${parent}module_components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'list'
      }
    })
  ]
}

export {
  listGroup
}
