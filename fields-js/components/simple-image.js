import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const simpleImage = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    fi.image('Image', 'image', {
      resizable: false,
      show_loading: false,
      responsive: false
    })
  ]
}

export {
  simpleImage
}
