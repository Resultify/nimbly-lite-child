import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const simpleImage = (parent = '', hideAlignment = false) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.image('Simple image', 'simple_image', {
      resizable: false,
      show_loading: false,
      responsive: false
    }),
    fi.number('Width', 'simple_image_width', {
      min: 0,
      display_width: 'half_width',
      suffix: 'px',
      visibility: {
        controlling_field_path: `${parent}simple_image`,
        operator: 'NOT_EMPTY',
        property: 'src'
      }
    }),
    fi.choice('Alignment', 'simple_image_alignment', {
      display_width: 'half_width',
      locked: hideAlignment,
      choices: [
        ['start', 'Left'],
        ['center', 'Center'],
        ['end', 'Right']
      ],
      visibility: {
        controlling_field_path: `${parent}simple_image`,
        operator: 'NOT_EMPTY',
        property: 'src'
      }
    })
  ]
}

export {
  simpleImage
}
