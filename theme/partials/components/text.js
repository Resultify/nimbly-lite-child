import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const text = (parent) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.text('Text', 'text', {
      allow_new_line: true
    })
  ]
}

export { text }
