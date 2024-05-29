/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { component } from '../../../fields-js/components/all.js'
import { cardFields, cardStyleFields } from '../../../fields-js/modules/unicard.js'

init(
  group('Cards', 'card_group',
    {
      occurrence: {
        min: 0,
        max: 100,
        sorting_label_field: 'card_group.heading'
      }
    },
    cardFields('card_group.', { lockComponentOrder: true })
  ),
  component.order([
    'Image',
    'Heading',
    'Subheading',
    'Rich text',
    'Button group',
    'Custom text group',
    'Additional images group',
    'Separator'
  ]),
  group('Grid layout', 'grid_layout',
    {
      expanded: true
    },
    fi.number('Columns', 'columns', {
      default: 3,
      min: 2,
      max: 20,
      display_width: 'half_width'
    }),
    fi.number('Gap', 'gap', {
      default: 20,
      min: 0,
      suffix: 'px',
      display_width: 'half_width'
    })
  ),
  styleGroup(
    cardStyleFields('style.')
  )
)
