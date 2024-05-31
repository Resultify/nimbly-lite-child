/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'

init(
  unicardFields({
    enabledByDefault: ['media', 'main_heading', 'richtext', 'buttons'],
    components: ['media', 'main_heading', 'sub_heading', 'richtext', 'custom_text', 'lists', 'separator', 'buttons', 'additional_images']
  }),
  styleGroup(
    unicardStyleFields('style.')
  )
)
