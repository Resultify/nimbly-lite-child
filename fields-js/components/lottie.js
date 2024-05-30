import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const lottie = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.file('Lottie file', 'lottie_file'),
    fi.number('Speed', 'lottie_speed', {
      min: 0,
      step: 0.1,
      display_width: 'half_width',
      default: 1,
      visibility: {
        controlling_field_path: `${parent}lottie_file`,
        operator: 'NOT_EMPTY'
      }
    }),
    fi.choice('Mode', 'lottie_mode', {
      display_width: 'half_width',
      required: true,
      default: 'forward',
      visibility: {
        controlling_field_path: `${parent}lottie_file`,
        operator: 'NOT_EMPTY'
      },
      choices: [
        ['forward', 'Forward'],
        ['reverse', 'Reverse'],
        ['bounce', 'Bounce'],
        ['reverse-bounce', 'Reverse-bounce']
      ]
    }),
    fi.boolean('Loop', 'lottie_loop', {
      display_width: 'half_width',
      default: true,
      visibility: {
        controlling_field_path: `${parent}lottie_file`,
        operator: 'NOT_EMPTY'
      }
    })
  ]
}

export { lottie }
