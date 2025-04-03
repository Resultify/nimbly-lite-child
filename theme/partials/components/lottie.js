import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

/**
 * #### fullWidthImage fields
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 * @param {object} [opt.mediaGroup] - media group options
 * @param {boolean} [opt.mediaGroup.showLottieScaleProp] - show lottie scale property
 */
const lottie = (parent = '', opt) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.file('Lottie file', 'lottie_file'),
    fi.boolean('', 'lottie_prop_visibility', {
      inline_help_text: '<span style="color:#33475b;">Show/hide</span> additional <span style="color:#007a8c;font-weight:700;font-size:14px;">Lottie</span> properties.',
      display: 'toggle'
    }),
    fi.number('Speed', 'lottie_speed', {
      min: 0,
      step: 0.1,
      display_width: 'half_width',
      default: 1,
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}lottie_file`,
            operator: 'NOT_EMPTY'
          },
          {
            controlling_field_path: `${parent}lottie_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.choice('Mode', 'lottie_mode', {
      display_width: 'half_width',
      required: true,
      default: 'forward',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}lottie_file`,
            operator: 'NOT_EMPTY'
          },
          {
            controlling_field_path: `${parent}lottie_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      },
      choices: [
        ['forward', 'Forward'],
        ['reverse', 'Reverse'],
        ['bounce', 'Bounce'],
        ['reverse-bounce', 'Reverse-bounce']
      ]
    }),
    fi.boolean('Loop', 'lottie_loop', {
      default: true,
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}lottie_file`,
            operator: 'NOT_EMPTY'
          },
          {
            controlling_field_path: `${parent}lottie_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.number('Width', 'lottie_width', {
      min: 0,
      display_width: 'half_width',
      suffix: 'px',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}lottie_file`,
            operator: 'NOT_EMPTY'
          },
          {
            controlling_field_path: `${parent}lottie_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.number('Height', 'lottie_height', {
      min: 0,
      display_width: 'half_width',
      suffix: 'px',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}lottie_file`,
            operator: 'NOT_EMPTY'
          },
          {
            controlling_field_path: `${parent}lottie_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    }),
    fi.number('Scale', 'lottie_scale', {
      min: 0,
      step: 0.1,
      max: 10,
      locked: !(opt?.mediaGroup?.showLottieScaleProp),
      display_width: 'half_width',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}lottie_file`,
            operator: 'NOT_EMPTY'
          },
          {
            controlling_field_path: `${parent}lottie_prop_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        ]
      }
    })
  ]
}

export { lottie }
