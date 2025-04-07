/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'
import { card1, card2, card3 } from './fields-default.js'
import { globalDefault } from '../global-default.js'

init(
  group('Cards', 'card_group',
    {
      icon: {
        name: 'clone',
        set: 'fontawesome-6.4.2',
        type: 'SOLID'
      },
      occurrence: {
        min: 1,
        max: 200,
        default: 1,
        sorting_label_field: 'card_group.heading'
      },
      default: [
        card1,
        card2,
        card3
      ]
    },
    unicardFields({
      enabledByDefault: ['media', 'main_heading', 'richtext'],
      choices: ['media', 'main_heading', 'sub_heading', 'richtext', 'custom_text', 'list', 'separator', 'buttons', 'additional_images']
    },
    'card_group.',
    {
      showCardStyle: true
    })
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
      unicardStyleFields('style.card_style_group.', {
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
