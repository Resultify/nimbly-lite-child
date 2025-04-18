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
    enabledByDefault: ['media'],
    choices: ['media']
  },
  '',
  {
    hideComponentsProp: true,
    hideWholeAreaLinkProp: true,
    mediaGroup: {
      hideMediaTypeProp: true,
      hideForceFullWidthImageProp: true,
      hideForceFullWidthVideoProp: true
    },
    default: {
      media_type: 'lottie',
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
      lottie: {
        lottie_file_src: globalDefault.unicardLottie,
      },
      video: {
        video_type: 'embed',
        video_url: globalDefault.unicardVideo.videoUrl,
        video_iframe_url: globalDefault.unicardVideo.videoIframeUrl,
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

