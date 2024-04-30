import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'

const icon = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    fi.choice('Icon type', 'icon_type', {
      display_width: 'half_width',
      required: true,
      default: 'fontawesome',
      choices: [
        ['fontawesome', 'Fontawesome'],
        ['inline_svg', 'Inline SVG']
      ]
    }),
    fi.number('Icon size', 'icon_size', {
      display_width: 'half_width',
      default: 80,
      suffix: 'px'
    }),
    fi.icon('Icon', 'icon', {
      set: 'fontawesome-6.4.2',
      visibility: {
        controlling_field_path: `${parent}icon_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'fontawesome'
      }
    }),
    fi.text('Inline SVG', 'inline_svg', {
      allow_new_line: true,
      visibility: {
        controlling_field_path: `${parent}icon_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'inline_svg'
      }
    })
  ]
}

const iconStyle = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    group('Icon', 'icon_style',
      {
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'OR',
          criteria: [
            {
              controlling_field_path: `${parent}icon`,
              operator: 'NOT_EMPTY',
              property: 'name'
            },
            {
              controlling_field_path: `${parent}inline_svg`,
              operator: 'NOT_EMPTY'
            }
          ]
        }
      },
      fi.color('Color', 'icon_color'),
      fi.color('Background', 'icon_bg_color'),
      fi.border('Border', 'icon_border'),
      fi.number('Border radius (px)', 'icon_border_radius_px', {
        default: 0,
        suffix: '%'
      }),
      fi.spacing('Spacing', 'icon_spacing')
    )
  ]
}

export { icon, iconStyle }
