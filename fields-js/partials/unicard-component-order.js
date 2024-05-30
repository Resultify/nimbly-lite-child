import { component } from '../components/all.js'

const unicardComponentOrder = (lockComponentOrder = false) => {
  return [
    component.order([
      'Image',
      'Heading',
      'Subheading',
      'Rich text',
      'Button group',
      'Custom text group',
      'Additional images group',
      'Separator'
    ], lockComponentOrder)
  ]
}

export {
  unicardComponentOrder
}
