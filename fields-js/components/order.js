/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

/**
 * @param {Array<string>} [components] - Array of component names
 */
const order = (components = []) => {
  if (process.env.THEME_MODE !== 'lite' && components.length > 0) {
    return [
      group('Components', 'components',
        {
          repeater_options_default: {
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
          }
        },
        fi.text('Component', 'component', {
          editor_options: {
            locked: true
          }
        }),
        fi.text('Note', 'note')
      )
    ]
  } else {
    return []
  }
}

export { order }
