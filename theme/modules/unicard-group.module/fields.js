/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'

init(
  group('Cards', 'card_group',
    {
      occurrence: {
        min: 1,
        max: 200,
        default: 1,
        sorting_label_field: 'card_group.heading'
      },
      default: [
        {
          media_type: 'full_width_image',
          full_width_image_group: {
            full_width_image_aspect_ratio: '16/9'
          },
          icon_group: {
            icon_type: 'fontawesome',
            icon_size: 80
          },
          lottie_group: {
            lottie_speed: 1,
            lottie_mode: 'forward',
            lottie_loop: true
          },
          video_group: {
            video_type: 'hubspot_video',
            embed: {
              source_type: 'oembed'
            }
          },
          heading: {
            heading_tag: 'h2',
            heading_text: 'Card 1',
            heading_icon_position: 'left'
          },
          subheading: {
            heading_tag: 'h3',
            heading_text: 'Subheading',
            heading_icon_position: 'left'
          },
          accordion_group: {
            accordion_icon_position: 'left',
            accordion_border_style: 'border_divider'
          },
          form_group: {
            form_heading_tag: 'h3'
          },
          module_components: ['media', 'main_heading', 'richtext', 'buttons']
        }
      ]
    },
    unicardFields({
      enabledByDefault: ['media', 'main_heading', 'richtext', 'buttons'],
      choices: ['media', 'main_heading', 'sub_heading', 'richtext', 'custom_text', 'list', 'accordion', 'separator', 'buttons', 'additional_images']
    }, 'card_group.')
  ),
  styleGroup(
    group('Grid layout', 'grid_layout', { expanded: true },
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
    group('Card', 'card_style_group', {},
      unicardStyleFields('style.card_style_group.')
    )
  )
)
