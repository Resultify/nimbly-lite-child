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
 * @param {object} [opt.mediaGroup] - media group options
 * @param {boolean} [opt.mediaGroup.hideForceFullWidthImageProp] - hide force_full_width_image property for fullWidthImage component
 * @param {boolean} [opt.mediaGroup.hideAlignmentProp] - hide alignment property for simpleImage component
 * @param {boolean} [opt.mediaGroup.hideForceFullWidthVideoProp] - hide force_full_width_video property for video component
 * @param {boolean} [opt.mediaGroup.showLottieScaleProp] - show lottie scale property
 * @param {Array<Array<string, string>>} [opt.additional_media_types] - additional media types
 * @param {object} [opt.default] - default media type properties
 * @param {'full_width_image'|'simple_image'|'icon'} [opt.default.media_type] - default media type
 * @param {object} [opt.default.full_width_image] - default full width image properties
 * @param {boolean} [opt.default.full_width_image.force_full_width_image] - default force full width image
 * @param {'1/1'|'1.91/1'|'2/1'|'3/1'|'3/2'|'4/3'|'4/5'|'5/4'|'9/16'|'16/9'} [opt.default.full_width_image.full_width_image_aspect_ratio] - default full width image aspect ratio
 * @param {object} [opt.default.full_width_image.src] - default full width image source
 * @param {object} [opt.default.simple_image] - default simple image properties
 * @param {object} [opt.default.simple_image.src] - default simple image source
 * @param {object} [opt.default.icon] - default icon properties
 * @param {string} [opt.default.icon.name] - default icon name
 * @param {'SOLID'|'REGULAR'} [opt.default.icon.type] - default icon type
 * @param {string} [opt.default.icon.unicode] - default icon unicode
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
      default: opt?.default?.media_type ?? 'full_width_image',
      placeholder: 'None',
      choices: mediaTypeChoices
    }),
    group('Full width image', 'full_width_image_group',
      {
        icon: {
          name: 'image',
          set: 'fontawesome-6.4.2',
          type: 'REGULAR'
        },
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
        icon: {
          name: 'file-image',
          set: 'fontawesome-6.4.2',
          type: 'REGULAR'
        },
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
        icon: {
          name: 'cube',
          set: 'fontawesome-6.4.2',
          type: 'SOLID'
        },
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
      icon(`${parent}icon_group.`, opt)
    ),
    group('Lottie animation', 'lottie_group',
      {
        icon: {
          name: 'puzzle-piece',
          set: 'fontawesome-6.4.2',
          type: 'SOLID'
        },
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
      lottie(`${parent}lottie_group.`, opt)
    ),
    group('Video', 'video_group',
      {
        icon: {
          name: 'video',
          set: 'fontawesome-6.4.2',
          type: 'SOLID'
        },
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
