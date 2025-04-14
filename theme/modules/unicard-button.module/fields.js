/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'
import { globalDefault } from '../unicard-global-default.js'

init(
  unicardFields({
    enabledByDefault: ['buttons'],
    choices: ['buttons']
  },
  '',
  {
    hideComponentsProp: true,
    hideWholeAreaLinkProp: true,
    default: {
      buttons: true
    }
  }
 ),
  styleGroup(
    unicardStyleFields('style.', {
        hide: {
          hoverProps: true,
          textColorProps: true
        },
        default: {
        }
      }
    )
  )
)

