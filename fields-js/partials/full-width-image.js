import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const fullWidthImage = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    fi.image('Image', 'full_width_image', {
      resizable: false,
      show_loading: false,
      responsive: true
    }),
    fi.choice('Aspect ratio', 'aspect_ratio', {
      display_width: 'half_width',
      required: true,
      default: '16/9',
      visibility_rules: 'ADVANCED',
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
    })
  ]
}

export { fullWidthImage }
