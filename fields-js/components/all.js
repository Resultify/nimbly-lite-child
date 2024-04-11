import * as heading from './heading.js'
import * as button from './buttons.js'
import * as image from './image.js'
import * as order from './order.js'

/**
 * #### component partials entry point
 * @ignore
 * @constant
 */
const component = {
  ...heading,
  ...button,
  ...image,
  ...order
}

export { component }
