/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { component } from '../../../fields-js/components/all.js'
// import { partial } from '../../../fields-js/partials/all.js'
import { cardFields, cardStyleFields } from '../../../fields-js/modules/card.js'
// import { cardFields } from '../../../fields-js/modules/card2.js'

init(
  cardFields(),
  // group('Card', 'card_group', {},
  // cardFields('card_group.'),
  // ),
  // group('Card', 'card_grouppp',
  //   {
  //     occurrence: {
  //       min: 0,
  //       max: 10
  //     }
  //   },
  //   cardFields('card_grouppp.', true)
  // ),
  // component.order([
  //   'Image',
  //   'Heading',
  //   'Subheading',
  //   'Rich text',
  //   'Button group',
  //   'Custom text group',
  //   'Additional images group',
  //   'Separator'
  // ]),
  styleGroup(
    cardStyleFields('style.')
    // group('Card', 'style_group', {},
    //   cardStyleFields('style.style_group.')
    // )
  )
)
