import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'
import { customGradient } from '../partials/custom-gradient.js'

const customTextGroup = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    group('Custom text', 'custom_text_group',
      {
        help_text: 'Customizable text. Text that can be used for badges or some unusual typography style.',
        occurrence: {
          min: 0,
          max: 10,
          sorting_label_field: 'custom_text_group.text'
        }
      },
      fi.text('Text', 'custom_text', {
        allow_new_line: true
      }),
      fi.font('Font', 'custom_text_font', {
        visibility: {
          controlling_field_path: `${parent}custom_text_group.custom_text`,
          operator: 'NOT_EMPTY'
        }
      }),
      fi.color('Background', 'custom_text_background', {
        visibility: {
          controlling_field_path: `${parent}custom_text_group.custom_text`,
          operator: 'NOT_EMPTY'
        }
      }),
      fi.number('Spacing', 'custom_text_spacing', {
        visibility: {
          controlling_field_path: `${parent}custom_text_group.custom_text`,
          operator: 'NOT_EMPTY'
        },
        display_width: 'half_width',
        suffix: 'px'
      }),
      fi.number('Border radius', 'custom_text_border_radius', {
        visibility: {
          controlling_field_path: `${parent}custom_text_group.custom_text`,
          operator: 'NOT_EMPTY'
        },
        display_width: 'half_width',
        suffix: 'px'
      }),
      customGradient(`${parent}custom_text_group`)
    )
  ]
}

export {
  customTextGroup
}
