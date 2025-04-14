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
    enabledByDefault: ['media', 'main_heading', 'richtext'],
    choices: ['media', 'main_heading', 'sub_heading', 'richtext', 'custom_text', 'list', 'separator', 'buttons', 'additional_images']
  },
  '',
  {
    default: {
      media_type: 'full_width_image',
      full_width_image: {
        src: globalDefault.unicardImage,
        force_full_width_image: true
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
      heading: globalDefault.headingText,
      subheading: globalDefault.subheadingText,
      richtext: globalDefault.richtextText,
    }
  }
 ),
  styleGroup(
    unicardStyleFields('style.', {
        default: {
          content_gap: 20,
          background_type: 'background_color',
          background_color: '#f6f6f6',
          padding: 40,
          border_radius: 20,
          shadow: 'shadow-md',
          hover_effects: true,
          hover_shadow: 'shadow-xl',
        }
      }
    )
  )
)

