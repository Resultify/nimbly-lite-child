import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const customGradient = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    fi.color('Gradient color', 'gradient_color', {
      display_width: 'half_width',
      occurrence: {
        min: 2,
        max: 7
      },
      default: [
        { color: '#999999', opacity: 100 },
        { color: '#999999', opacity: 100 }
      ],
      visibility: {
        controlling_field_path: `${parent}custom_text`,
        operator: 'NOT_EMPTY'
      }
    }),
    fi.choice('Gradient direction', 'gradient_direction', {
      help_text: 'Unset any gradient direction to turn off the color gradient style for the text',
      display_width: 'half_width',
      choices: [
        ['to top', 'Bottom to top'],
        ['to bottom', 'Top to bottom'],
        ['to left', 'Right to left'],
        ['to right', 'Left to right'],
        ['to bottom right', 'Top left to bottom right'],
        ['to bottom left', 'Top right to bottom left']
      ],
      visibility: {
        controlling_field_path: `${parent}custom_text`,
        operator: 'NOT_EMPTY'
      }
    })
  ]
}

export {
  customGradient
}
