import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const animationList = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    fi.choice('Animation', 'animation', {
      display_width: 'half_width',
      choices: [
        ['scale1x', 'Scale 1x'],
        ['scale2x', 'Scale 2x'],
        ['scale3x', 'Scale 3x'],
        ['scale4x', 'Scale 4x'],
        ['slideup1x', 'Slide Up 1x'],
        ['slideup2x', 'Slide Up 2x'],
        ['slideup3x', 'Slide Up 3x'],
        ['custom-animation1', 'Custom animation 1'],
        ['custom-animation2', 'Custom animation 2'],
        ['custom-animation3', 'Custom animation 3']
      ]
    })
  ]
}

export {
  animationList
}
