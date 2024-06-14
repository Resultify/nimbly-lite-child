import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'
import { categoryList } from '../data/category-list.js'

const categoryGroup = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.choice('Categories', 'category_group', {
      visibility: {
        controlling_field_path: `${parent}module_components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'categories'
      },
      multiple: true,
      choices: categoryList
    }),
    fi.boolean('Show categories', 'show_categories', {
      help_text: 'Show categories inside the module as a content block',
      visibility: {
        controlling_field_path: `${parent}module_components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'categories'
      }
    }),
    group('Categories style', 'categories_style_group',
      {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}module_components`,
              operator: 'MATCHES_REGEX',
              controlling_value_regex: 'categories'
            },
            {
              controlling_field_path: `${parent}show_categories`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            }
          ]
        }
      },
      fi.font('Font', 'category_font', {
        visibility: {
          hidden_subfields: {
            color: true
          }
        }
      }),
      fi.color('Color', 'category_color'),
      fi.color('Background', 'category_background'),
      fi.number('Vertical spacing', 'category_vertical_spacing', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px'
      }),
      fi.number('Horizontal', 'category_horizontal_spacing', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px'
      }),
      fi.number('Border width', 'category_border_width', {
        min: 0,
        display_width: 'half_width',
        suffix: 'px'
      }),
      fi.number('Border radius', 'category_border_radius', {
        min: 0,
        suffix: 'px',
        display_width: 'half_width'
      }),
      fi.color('Border color', 'category_border_color')
    )
  ]
}

export { categoryGroup }
