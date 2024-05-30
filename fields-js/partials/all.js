import * as animation from './animation-list.js'
import * as shadow from './shadow-list.js'
import * as gradient from './custom-gradient.js'
import * as category from './category-list.js'
import * as unicardComponentOrder from './unicard-component-order.js'

const partial = {
  ...animation,
  ...shadow,
  ...gradient,
  ...category,
  ...unicardComponentOrder
}

export { partial }
