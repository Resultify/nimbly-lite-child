import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

/**
 * #### fullWidthImage fields
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 * @param {boolean} [opt.hideForceFullWidthVideoProp] - hide force full width prop
 */
const video = (parent = '', opt) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.choice('Video type', 'video_type', {
      required: true,
      default: 'hubspot_video',
      choices: [
        ['hubspot_video', 'HubSpot video'],
        ['embed', 'Embed'],
        ['youtube_lite', 'Youtube lite']
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
    fi.text('Youtube lite video ID', 'youtube_lite', {
      placeholder: 'Enter the Youtube video ID',
      help_text: 'The video ID is the part of the video URL after "v=".',
      visibility: {
        controlling_field_path: `${parent}video_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'youtube_lite'
      }
    }),
    fi.boolean('', 'video_prop_visibility', {
      inline_help_text: '<span style="color:#33475b;">Show/hide</span> additional <span style="color:#007a8c;font-weight:700;font-size:14px;">Video</span> properties.',
      display: 'toggle',
      visibility: {
        controlling_field_path: `${parent}video_type`,
        operator: 'NOT_EQUAL',
        controlling_value_regex: 'youtube_lite'
      }
    }),
    fi.boolean('Force full width', 'force_full_width_video', {
      locked: opt?.hideForceFullWidthVideoProp || false,
      help_text: 'With the <strong>Force full width</strong> option enabled, it will take the full width of the parent element, even if there is extra padding around it.',
      display_width: 'half_width',
      default: false,
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}video_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'youtube_lite'
          },
          {
            controlling_field_path: `${parent}video_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.boolean('Autoplay', 'autoplay', {
      display_width: 'half_width',
      default: false,
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}video_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'youtube_lite'
          },
          {
            controlling_field_path: `${parent}video_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
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
            controlling_field_path: `${parent}video_type`,
            operator: 'NOT_EQUAL',
            controlling_value_regex: 'youtube_lite'
          },
          {
            controlling_field_path: `${parent}force_full_width_video`,
            operator: 'EQUAL',
            controlling_value_regex: 'false'
          },
          {
            controlling_field_path: `${parent}video_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
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
          },
          {
            controlling_field_path: `${parent}video_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    })
  ]
}

export { video }
