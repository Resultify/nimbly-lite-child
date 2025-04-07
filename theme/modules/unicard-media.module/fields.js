/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'
import { globalDefault } from '../global-default.js'

init(
  unicardFields({
    enabledByDefault: ['media'],
    choices: ['media']
  },
  '',
  {
    hideComponentsProp: true,
    hideWholeAreaLinkProp: true,
    mediaGroup: {
      hideForceFullWidthImageProp: true,
      hideForceFullWidthVideoProp: true
    },
    default: {
      media_type: 'full_width_image',
      full_width_image: {
        src: globalDefault.unicardImage,
        force_full_width_image: false
      },
      simple_image: {
        src: globalDefault.contentHubIcon,
      },
      icon: {
        name: 'address-card',
        type: 'REGULAR',
        unicode: "f2bb"
      },
    }
  }
 ),
  styleGroup(
    unicardStyleFields('style.', {
        hide: {
          hoverProps: true,
          textColorProps: true,
          contentGapProps: true,
        },
        default: {
        }
      }
    )
  )
)

