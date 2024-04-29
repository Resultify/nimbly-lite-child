import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const shadowList = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    fi.choice('Shadow', 'shadow', {
      display_width: 'half_width',
      choices: [
        ['shadow-sm', 'Shadow small'],
        ['shadow-md', 'Shadow medium'],
        ['shadow-lg', 'Shadow large'],
        ['shadow-xl', 'Shadow xl'],
        ['shadow-2xl', 'Shadow 2xl'],
        ['custom-shadow1', 'Custom-shadow 1'],
        ['custom-shadow2', 'Custom-shadow 2'],
        ['custom-shadow3', 'Custom-shadow 3']
      ]
    })
  ]
}

export {
  shadowList
}
