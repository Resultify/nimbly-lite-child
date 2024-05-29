/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { cardFields, cardStyleFields } from '../../../fields-js/modules/unicard.js'

init(
  cardFields(),
  styleGroup(
    cardStyleFields('style.')
  )
)
