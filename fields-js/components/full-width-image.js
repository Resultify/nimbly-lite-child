import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const fullWidthImage = (parent = '', hideForceFullWidth = false) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.image('Image', 'full_width_image', {
      resizable: false,
      show_loading: false,
      responsive: true
    }),
    fi.choice('Aspect ratio', 'full_width_image_aspect_ratio', {
      display_width: 'half_width',
      required: true,
      default: '16/9',
      visibility: {
        controlling_field_path: `${parent}full_width_image`,
        operator: 'NOT_EMPTY',
        property: 'src'
      },
      choices: [
        ['1/1', '1/1'],
        ['1.91/1', '1.91/1'],
        ['2/1', '2/1'],
        ['3/1', '3/1'],
        ['3/2', '3/2'],
        ['4/3', '4/3'],
        ['4/5', '4/5'],
        ['5/4', '5/4'],
        ['9/16', '9/16'],
        ['16/9', '16/9']
      ]
    }),
    fi.boolean('Force full width', 'force_full_width_image', {
      help_text: 'This image is already full-width, but with the <strong>Force full width</strong> option enabled, it will take the full width of the parent element, even if there is extra padding around it.',
      display_width: 'half_width',
      locked: hideForceFullWidth,
      default: false,
      visibility: {
        controlling_field_path: `${parent}full_width_image`,
        operator: 'NOT_EMPTY',
        property: 'src'
      }
    }),
    fi.number('Border radius', 'full_width_image_border_radius', {
      display_width: 'half_width',
      suffix: 'px',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}full_width_image`,
            operator: 'NOT_EMPTY',
            property: 'src'
          },
          {
            controlling_field_path: `${parent}force_full_width_image`,
            operator: 'EQUAL',
            controlling_value_regex: 'false'
          }
        ]
      }
    })
  ]
}

export { fullWidthImage }
