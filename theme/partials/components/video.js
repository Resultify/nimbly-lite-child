import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const video = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.choice('Video type', 'video_type', {
      required: true,
      default: 'hubspot_video',
      choices: [
        ['hubspot_video', 'HubSpot video'],
        ['embed', 'Embed']
      ]
    }),
    fi.video('HubSpot video', 'hubspot_video', {
      show_preview: true,
      show_advanced_options: false,
      resizable: false,
      visibility: {
        controlling_field_path: `${parent}video_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'hubspot_video'
      }
    }),
    fi.embed('Embed', 'embed', {
      show_preview: true,
      resizable: false,
      visibility: {
        controlling_field_path: `${parent}video_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'embed'
      }
    }),
    fi.boolean('Force full width', 'force_full_width_video', {
      help_text: 'With the <strong>Force full width</strong> option enabled, it will take the full width of the parent element, even if there is extra padding around it.',
      display_width: 'half_width',
      default: false
    }),
    fi.number('Border radius', 'video_border_radius', {
      min: 0,
      display_width: 'half_width',
      suffix: 'px',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}force_full_width_video`,
            operator: 'EQUAL',
            controlling_value_regex: 'false'
          }
        ]
      }
    }),
    fi.color('HubSpot video play button color', 'hubspot_video_play_button_color', {
      show_opacity: false,
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}video_type`,
            operator: 'EQUAL',
            controlling_value_regex: 'hubspot_video'
          },
          {
            controlling_field_path: `${parent}hubspot_video`,
            operator: 'NOT_EMPTY',
            property: 'player_id'
          }
        ]
      }
    })
  ]
}

export { video }
