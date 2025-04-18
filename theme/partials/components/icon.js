import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

/**
 * #### simpleImage fields
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 * @param {object} [opt.default] - default simple image properties
 * @param {object} [opt.default.icon] - default icon properties
 * @param {string} [opt.default.icon.name] - default icon name
 * @param {'SOLID'|'REGULAR'} [opt.default.icon.type] - default icon type
 * @param {string} [opt.default.icon.unicode] - default icon unicode
 */
const icon = (parent = '', opt) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.choice('Icon type', 'icon_type', {
      display_width: 'half_width',
      required: true,
      default: 'fontawesome',
      choices: [
        ['fontawesome', 'FontAwesome icon'],
        ['inline_svg', 'Inline SVG']
      ]
    }),
    fi.number('Icon size', 'icon_size', {
      min: 0,
      display_width: 'half_width',
      default: 80,
      suffix: 'px'
    }),
    fi.icon('Icon', 'icon', {
      default: {
        name: opt?.default?.icon?.name ?? null,
        type: opt?.default?.icon?.type ?? null,
        unicode: opt?.default?.icon?.unicode ?? null
      },
      set: 'fontawesome-6.4.2',
      visibility: {
        controlling_field_path: `${parent}icon_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'fontawesome'
      }
    }),
    fi.html('Inline SVG', 'icon_inline_svg', {
      visibility: {
        controlling_field_path: `${parent}icon_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'inline_svg'
      }
    }),
    fi.boolean('', 'icon_prop_visibility', {
      inline_help_text: '<span style="color:#33475b;">Show/hide</span> additional <span style="color:#007a8c;font-weight:700;font-size:14px;">Icon</span> properties.',
      display: 'toggle'
    }),
    fi.color('Color', 'icon_color', {
      visibility: {
        controlling_field_path: `${parent}icon_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.color('Background', 'icon_background', {
      visibility: {
        controlling_field_path: `${parent}icon_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.number('Spacing', 'icon_spacing', {
      min: 0,
      suffix: 'px',
      display_width: 'half_width',
      visibility: {
        controlling_field_path: `${parent}icon_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.number('Border radius', 'icon_border_radius', {
      min: 0,
      suffix: '%',
      display_width: 'half_width',
      visibility: {
        controlling_field_path: `${parent}icon_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    })
  ]
}

export { icon }
