/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { realButtonGroup } from '../../partials/components/real-button-group.js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'

init(
  realButtonGroup(),
  group('Cards', 'card_group',
    {
      occurrence: {
        min: 0,
        max: 200,
        sorting_label_field: 'card_group.heading'
      }
    },
    unicardFields({
      enabledByDefault: ['media', 'categories', 'main_heading', 'richtext', 'buttons'],
      choices: ['media', 'categories', 'main_heading', 'sub_heading', 'richtext', 'custom_text', 'list', 'accordion', 'separator', 'buttons', 'additional_images']
    }, 'card_group.')
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
