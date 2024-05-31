import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const icon = (parent) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
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
      min: 0,
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
    fi.text('Inline SVG', 'icon_inline_svg', {
      allow_new_line: true,
      visibility: {
        controlling_field_path: `${parent}icon_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'inline_svg'
      }
    }),
    fi.boolean('Additional customization', 'icon_additional_customization', {
      help_text: 'Enable additional style customization options'
    }),
    fi.color('Color', 'icon_color', {
      visibility: {
        controlling_field_path: `${parent}icon_additional_customization`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.color('Background', 'icon_background', {
      visibility: {
        controlling_field_path: `${parent}icon_additional_customization`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.number('Spacing', 'icon_spacing', {
      min: 0,
      suffix: 'px',
      display_width: 'half_width',
      visibility: {
        controlling_field_path: `${parent}icon_additional_customization`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.number('Border radius', 'icon_border_radius', {
      min: 0,
      suffix: '%',
      display_width: 'half_width',
      visibility: {
        controlling_field_path: `${parent}icon_additional_customization`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    })
  ]
}

export { icon }
