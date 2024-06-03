import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'
import { fullWidthImage } from './full-width-image.js'
import { simpleImage } from './simple-image.js'
import { icon } from './icon.js'
import { lottie } from './lottie.js'

const mediaGroup = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.choice('Media type', 'media_type', {
      visibility: {
        controlling_field_path: `${parent}module_components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'media'
      },
      choices: [
        ['full_width_image', 'Full width image'],
        ['simple_image', 'Simple image'],
        ['icon', 'Icon'],
        ['lottie', 'Lottie Animation'],
        ['video', 'Video']
      ]
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
      fullWidthImage(`${parent}full_width_image_group.`)
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
      simpleImage(`${parent}simple_image_group.`)
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
    )
  ]
}

export { mediaGroup }
