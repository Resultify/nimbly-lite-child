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
    enabledByDefault: ['media', 'main_heading', 'richtext'],
    choices: ['media', 'main_heading', 'sub_heading', 'richtext', 'custom_text', 'list', 'separator', 'buttons', 'additional_images']
  },
  '',
  {
    default: {
      media_type: 'full_width_image',
      full_width_image: {
        src: 'https://144691243.fs1.hubspotusercontent-eu1.net/hubfs/144691243/ChatGPT%20Image%20Apr%201%2c%202025%20at%2005_18_04%20PM.png',
        force_full_width_image: true
      },
      simple_image: {
        src: 'https://144691243.fs1.hubspotusercontent-eu1.net/hubfs/144691243/ChatGPT%20Image%20Apr%201%2c%202025%20at%2005_18_04%20PM.png'
      },
      icon: {
        name: 'address-card',
        type: 'REGULAR',
      },
      heading: 'The One Content Module for All Your Card Needs!',
      subheading: 'Subheading',
      richtext: `
        <p>Simplify your toolkit instantly with Unicard, giving you access to <strong>40+ design variations</strong> ready for <strong>No-Code implementation</strong> via an exceptionally <strong>editor-friendly UI.</strong> What makes Unicard truly unique are its <strong>Flexible Components</strong> – choose only the elements you need (like images, text, or CTAs) while unused options stay conveniently hidden, decluttering your view – and its <strong>Content Focus,</strong> which prioritizes easy content input first by keeping complex styling neatly tucked away until needed.</p>
      `
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

