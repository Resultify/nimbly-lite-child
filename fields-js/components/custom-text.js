import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'

const customText = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    group('Custom text', 'custom_text',
      {
        help_text: 'Customizable text. Text that can be used for badges or some unusual typography style.',
        occurrence: {
          min: 0,
          max: 10,
          sorting_label_field: 'custom_text.text'
        }
      },
      fi.text('Text', 'text', {
        allow_new_line: true
      }),
      fi.font('Font', 'font'),
      fi.color('Background', 'background'),
      fi.spacing('', 'spacing', {
        visibility: {
          hidden_subfields: {
            margin: true
          }
        }
      }),
      fi.number('Border radius', 'border_radius', {
        display_width: 'half_width',
        suffix: 'px'
      }),
      fi.gradient('Text gradient', 'text_gradient')
    )
  ]
}

export {
  customText
}
