import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const animationList = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.choice('Animation', 'animation', {
      display_width: 'half_width',
      choices: [
        ['ani-scale1x', 'Scale 1x'],
        ['ani-scale2x', 'Scale 2x'],
        ['ani-scale3x', 'Scale 3x'],
        ['ani-scale4x', 'Scale 4x'],
        ['ani-slideup1x', 'Slide Up 1x'],
        ['ani-slideup2x', 'Slide Up 2x'],
        ['ani-slideup3x', 'Slide Up 3x'],
        ['ani-custom1', 'Custom animation 1'],
        ['ani-custom2', 'Custom animation 2'],
        ['ani-custom3', 'Custom animation 3']
      ]
    })
  ]
}

export {
  animationList
}
