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
        ['fontawesome', 'Fontawesome 6'],
        ['svg_list', 'SVG list'],
        ['svg', 'SVG']
      ]
    }),
    fi.number('Icon size (px)', 'icon_size_px', {
      display_width: 'half_width',
      default: 80,
      suffix: 'px'
    }),
    fi.choice('SVG icon', 'svg_icon', {
      visibility: {
        controlling_field_path: `${parent}icon_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'svg_list'
      },
      choices: [
        ['icon1', 'Icon 1'],
        ['icon2', 'Icon 2'],
        ['icon3', 'Icon 3'],
        ['icon4', 'Icon 4'],
        ['icon5', 'Icon 5'],
        ['icon6', 'Icon 6'],
        ['icon7', 'Icon 7'],
        ['icon8', 'Icon 8'],
        ['icon9', 'Icon 9'],
        ['icon10', 'Icon 10']
      ]
    }),
    fi.icon('Icon', 'icon', {
      set: 'fontawesome-6.4.2',
      visibility: {
        controlling_field_path: `${parent}icon_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'fontawesome'
      }
    }),
    fi.text('SVG', 'svg', {
      allow_new_line: true,
      visibility: {
        controlling_field_path: `${parent}icon_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'svg'
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
              controlling_field_path: `${parent}svg`,
              operator: 'NOT_EMPTY'
            },
            {
              controlling_field_path: `${parent}svg_icon`,
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
