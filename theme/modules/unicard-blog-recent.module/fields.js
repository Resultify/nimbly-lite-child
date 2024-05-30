/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { cardFields, cardStyleFields } from '../../../fields-js/modules/unicard.js'

init(
  fi.choice('Module components', 'components', {
    multiple: true,
    reordering_enabled: true,
    default: ['media', 'heading', 'richtext', 'buttons'],
    choices: [
      ['media', 'Media'],
      ['heading', 'Heading'],
      ['subheading', 'Subheading'],
      ['richtext', 'Richtext'],
      ['custom_text', 'Custom text'],
      ['lists', 'Lists'],
      ['separator', 'Separator'],
      ['buttons', 'Buttons'],
      ['additional_images', 'Additional images']
    ]
  }),
  fi.text('Heading', 'heading', {
    default: 'Heading',
    visibility: {
      controlling_field_path: 'components',
      operator: 'MATCHES_REGEX',
      controlling_value_regex: 'heading'
    }
  }),
  fi.text('Subheading', 'subheading', {
    default: 'Subheading',
    visibility: {
      controlling_field_path: 'components',
      operator: 'MATCHES_REGEX',
      controlling_value_regex: 'subheading'
    }
  }),
  styleGroup(
    // cardStyleFields('style.')
  )
)
