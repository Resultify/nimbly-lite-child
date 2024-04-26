import {
  group,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const order = (components = []) => {
  return [
    group('Components', 'components',
      {
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
      fi.text('Note', 'note')
    )
  ]
}

export { order }
