import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const categoryList = (multiple = false, locked = false) => {
  return [
    fi.choice('Category', 'category', {
      locked,
      multiple,
      choices: [
        ['category one 123', 'category one 123'],
        ['category two 321', 'category two 321'],
        ['category 3', 'category 3'],
        ['category 4', 'category 4'],
        ['category 5', 'category 5'],
        ['category 6', 'category 6'],
        ['category 7', 'category 7'],
        ['category 8', 'category 8'],
        ['category 9', 'category 9'],
        ['category 10', 'category 10']
      ]
    })
  ]
}

export {
  categoryList
}
