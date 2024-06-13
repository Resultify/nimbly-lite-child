/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'

init(
  group('Carousel settings', 'carousel_settings', {},
    fi.number('Slides per view', 'slides_per_view', {
      help_text: 'Number of slides per view',
      default: 3,
      min: 2,
      max: 20,
      display_width: 'half_width'
    }),
    fi.number('Slides per group', 'slides_per_group', {
      help_text: 'Number of slides per group to slide together',
      default: 2,
      min: 1,
      max: 20,
      display_width: 'half_width'
    }),
    fi.number('Slides gap', 'slides_gap', {
      help_text: 'Space between slides in pixels',
      default: 20,
      min: 0,
      suffix: 'px',
      display_width: 'half_width'
    }),
    fi.number('Autoplay', 'autoplay_delay', {
      help_text: 'Delay between slides in seconds. If this parameter is not specified, auto play will be disabled',
      min: 0,
      suffix: 's',
      display_width: 'half_width'
    }),
    fi.boolean('Loop', 'loop', {
      help_text: 'Enable loop mode',
      default: false,
      display_width: 'half_width'
    }),
    group('Navigation', 'navigation', {}),
    group('Pagination', 'pagination', {})
  ),
  group('Cards', 'card_group',
    {
      occurrence: {
        min: 0,
        max: 200,
        sorting_label_field: 'card_group.heading'
      }
    },
    unicardFields({
      enabledByDefault: ['media', 'main_heading', 'richtext', 'buttons'],
      choices: ['media', 'main_heading', 'sub_heading', 'richtext', 'custom_text', 'list', 'separator', 'buttons', 'additional_images']
    }, 'card_group.')
  ),
  styleGroup(
    fi.choice('Carousel presets', 'carousel_preset', {
      help_text: 'Choose a style preset for the carousel navigation and pagination positions',
      choices: [
        ['preset1', 'Preset 1'],
        ['preset2', 'Preset 2'],
        ['preset3', 'Preset 3'],
        ['preset4', 'Preset 4']
      ],
      required: true,
      default: 'preset1'
    }),
    group('Navigation', 'navigation', {}),
    group('Pagination', 'pagination', {}),
    group('Card', 'card_style_group', {},
      unicardStyleFields('style.card_style_group.')
    )
  )
)
