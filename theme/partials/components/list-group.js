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
      fi.choice('Add Icon', 'add_list_item_icon', {
        display_width: 'half_width',
        help_text: 'Add an icon to the list item',
        visibility: {
          controlling_field_path: `${parent}list_group.list_item_text`,
          operator: 'NOT_EMPTY'
        },
        choices: [
          ['icon', 'Icon'],
          ['image', 'Image']
        ]
      }),
      fi.icon('Icon', 'list_item_icon', {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}list_group.list_item_text`,
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: `${parent}list_group.add_list_item_icon`,
              operator: 'EQUAL',
              controlling_value_regex: 'icon'
            }
          ]
        }
      }),
      fi.file('Image', 'list_item_image', {
        picker: 'image',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}list_group.list_item_text`,
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: `${parent}list_group.add_list_item_icon`,
              operator: 'EQUAL',
              controlling_value_regex: 'image'
            }
          ]
        }
      }),
      fi.choice('Icon position', 'list_item_icon_position', {
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
                  controlling_field_path: `${parent}list_group.list_item_text`,
                  operator: 'NOT_EMPTY'
                }
              ]
            },
            {
              boolean_operator: 'OR',
              criteria: [
                {
                  controlling_field_path: `${parent}list_group.add_list_item_icon`,
                  operator: 'EQUAL',
                  controlling_value_regex: 'icon'
                },
                {
                  controlling_field_path: `${parent}list_group.add_list_item_icon`,
                  operator: 'EQUAL',
                  controlling_value_regex: 'image'
                }
              ]
            },
            {
              boolean_operator: 'OR',
              criteria: [
                {
                  controlling_field_path: `${parent}list_group.list_item_icon`,
                  operator: 'NOT_EMPTY',
                  property: 'name'
                },
                {
                  controlling_field_path: `${parent}list_group.list_item_image`,
                  operator: 'NOT_EMPTY',
                  property: 'src'
                }
              ]
            }
          ]
        }
      }),
      fi.number('Icon gap', 'list_item_icon_gap', {
        display_width: 'half_width',
        default: 0,
        min: 0,
        suffix: 'px',
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          children: [
            {
              boolean_operator: 'AND',
              criteria: [
                {
                  controlling_field_path: `${parent}list_group.list_item_text`,
                  operator: 'NOT_EMPTY'
                }
              ]
            },
            {
              boolean_operator: 'OR',
              criteria: [
                {
                  controlling_field_path: `${parent}list_group.add_list_item_icon`,
                  operator: 'EQUAL',
                  controlling_value_regex: 'icon'
                },
                {
                  controlling_field_path: `${parent}list_group.add_list_item_icon`,
                  operator: 'EQUAL',
                  controlling_value_regex: 'image'
                }
              ]
            },
            {
              boolean_operator: 'OR',
              criteria: [
                {
                  controlling_field_path: `${parent}list_group.list_item_icon`,
                  operator: 'NOT_EMPTY',
                  property: 'name'
                },
                {
                  controlling_field_path: `${parent}list_group.list_item_image`,
                  operator: 'NOT_EMPTY',
                  property: 'src'
                }
              ]
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
