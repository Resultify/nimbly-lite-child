/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { realButtonGroup } from '../../partials/components/real-button-group.js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'
import { globalDefault } from '../unicard-global-default.js'
import { card1, card2, card3 } from './fields-default.js'

init(
  realButtonGroup(),
  group('Cards', 'card_group',
    {
      icon: {
        name: 'clone',
        set: 'fontawesome-6.4.2',
        type: 'SOLID'
      },
      occurrence: {
        min: 0,
        max: 200,
        default: 3,
        sorting_label_field: 'card_group.heading'
      },
      default: [
        card1,
        card3,
        card1,
        card2,
        card3,
        card2,
        card1,
      ]
    },
    unicardFields({
      enabledByDefault: ['media', 'categories', 'main_heading', 'richtext'],
      choices: ['media', 'main_heading', 'sub_heading', 'richtext', 'custom_text', 'list', 'separator', 'buttons', 'additional_images', 'categories']
    }, 'card_group.', {
        showCardStyle: true,
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
          accordion: true,
          buttons: true
        }
    })
  ),
  styleGroup(
    group('Filter buttons', 'filter_buttons',
      {
        expanded: true
      },
      fi.alignment('Alignment', 'alignment', {
        display_width: 'half_width',
        alignment_direction: 'HORIZONTAL'
      }),
      fi.number('Buttons gap', 'buttons_gap', {
        default: 10,
        min: 0,
        suffix: 'px',
        display_width: 'half_width'
      }),
      fi.spacing('', 'spacing', {
        visibility: {
          hidden_subfields: {
            margin: true
          }
        }
      })
    ),
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
      fi.number('Gutter', 'gutter', {
        default: 30,
        min: 0,
        suffix: 'px',
        display_width: 'half_width'
      })
    ),
    group('Card', 'card_style_group', {},
      unicardStyleFields('style.card_style_group.', {
        show: {
          mobileAlignment: true,
          verticalAlignment: true,
        },
        default: {
          content_gap: 20,
          background_type: 'background_color',
          background_color: '#f6f6f6',
          padding: 40,
          border_radius: 20,
          shadow: 'shadow-sm',
          hover_effects: true,
          hover_shadow: 'shadow-lg',
          hover_background_color: '#D9D2E9',
          hover_background_opacity: 30,
        }
      })
    )
  )
)
