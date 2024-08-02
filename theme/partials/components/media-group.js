import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'
import { fullWidthImage } from './full-width-image.js'
import { simpleImage } from './simple-image.js'
import { icon } from './icon.js'
import { lottie } from './lottie.js'
import { video } from './video.js'

/**
 * #### mediaGroup fields
 * @memberof command
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 * @param {string} [opt.defaultMediaType] - default media type
 * @param {boolean} [opt.hideForceFullWidthImageProp] - hide force_full_width_image property for fullWidthImage component
 * @param {boolean} [opt.hideAlignmentProp] - hide alignment property for simpleImage component
 * @param {boolean} [opt.hideForceFullWidthVideoProp] - hide force_full_width_video property for video component
 * @param {Array<Array<string, string>>} [opt.additional_media_types] - additional media types
 */
const mediaGroup = (parent = '', opt) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  const mediaTypeChoices = [
    ['full_width_image', 'Full width image'],
    ['simple_image', 'Simple image'],
    ['icon', 'Icon'],
    ['lottie', 'Lottie Animation'],
    ['video', 'Video']
  ]
  if (opt?.additional_media_types?.length && opt?.additional_media_types?.length > 0) {
    mediaTypeChoices.push(...opt.additional_media_types)
  }
  return [
    fi.choice('Media type', 'media_type', {
      visibility: {
        controlling_field_path: `${parent}module_components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'media'
      },
      default: opt?.defaultMediaType || null,
      placeholder: 'None',
      choices: mediaTypeChoices
    }),
    group('Full width image', 'full_width_image_group',
      {
        expanded: true,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}media_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'full_width_image'
            },
            {
              controlling_field_path: `${parent}module_components`,
              operator: 'MATCHES_REGEX',
              controlling_value_regex: 'media'
            }
          ]
        }
      },
      fullWidthImage(`${parent}full_width_image_group.`, opt)
    ),
    group('Simple image', 'simple_image_group',
      {
        expanded: true,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}media_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'simple_image'
            },
            {
              controlling_field_path: `${parent}module_components`,
              operator: 'MATCHES_REGEX',
              controlling_value_regex: 'media'
            }
          ]
        }
      },
      simpleImage(`${parent}simple_image_group.`, opt)
    ),
    group('Icon', 'icon_group',
      {
        expanded: true,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}media_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'icon'
            },
            {
              controlling_field_path: `${parent}module_components`,
              operator: 'MATCHES_REGEX',
              controlling_value_regex: 'media'
            }
          ]
        }
      },
      icon(`${parent}icon_group.`)
    ),
    group('Lottie animation', 'lottie_group',
      {
        expanded: true,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}media_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'lottie'
            },
            {
              controlling_field_path: `${parent}module_components`,
              operator: 'MATCHES_REGEX',
              controlling_value_regex: 'media'
            }
          ]
        }
      },
      lottie(`${parent}lottie_group.`)
    ),
    group('Video', 'video_group',
      {
        expanded: true,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}media_type`,
              operator: 'EQUAL',
              controlling_value_regex: 'video'
            },
            {
              controlling_field_path: `${parent}module_components`,
              operator: 'MATCHES_REGEX',
              controlling_value_regex: 'media'
            }
          ]
        }
      },
      video(`${parent}video_group.`, opt)
    )
  ]
}

export { mediaGroup }
