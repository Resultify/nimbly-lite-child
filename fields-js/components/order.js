import {
  group,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const order = (components = [], lockOrder = false) => {
  return [
    group('Order of components', 'components',
      {
        help_text: 'To hide a separator, move it to the bottom of the list.',
        locked: lockOrder,
        occurrence: {
          min: components.length,
          max: components.length,
          default: components.length
        },
        default: components.map((component) => {
          return {
            component
          }
        })
      },
      fi.text('Component', 'component', {
        locked: true
      }),
      fi.text('Note', 'note', { allow_new_line: true })
    )
  ]
}

export { order }
