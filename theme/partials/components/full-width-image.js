import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

/**
 * #### fullWidthImage fields
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 * @param {object} [opt.mediaGroup] - media group options
 * @param {boolean} [opt.mediaGroup.hideForceFullWidthImageProp] - hide force_full_width_image property for fullWidthImage component
 * @param {object} [opt.default] - default media type properties
 * @param {'full_width_image'|'simple_image'|'icon'|'video'|'lottie'} [opt.default.media_type] - default media type
 * @param {object} [opt.default.full_width_image] - default full width image properties
 * @param {boolean} [opt.default.full_width_image.force_full_width_image] - default force full width image
 * @param {'1/1'|'1.91/1'|'2/1'|'3/1'|'3/2'|'4/3'|'4/5'|'5/4'|'9/16'|'16/9'} [opt.default.full_width_image.full_width_image_aspect_ratio] - default full width image aspect ratio
 * @param {string} [opt.default.full_width_image.src] - default full width image source
 */
const fullWidthImage = (parent = '', opt) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.image('Image', 'full_width_image', {
      default: {
        src: opt?.default?.full_width_image?.src ?? null,
      },
      resizable: false,
      show_loading: false,
      responsive: true
    }),
    fi.boolean('', 'full_width_image_opt_visibility', {
      inline_help_text: '<span style="color:#33475b;">Show/hide</span> additional <span style="color:#007a8c;font-weight:700;font-size:14px;">Full width image</span> properties.',
      display: 'toggle'
    }),
    fi.choice('Aspect ratio', 'full_width_image_aspect_ratio', {
      display_width: 'half_width',
      required: true,
      default: opt?.default?.full_width_image?.full_width_image_aspect_ratio ?? '16/9',
      visibility: {
        controlling_field_path: `${parent}full_width_image_opt_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      },
      choices: [
        ['1/1', '1/1'],
        ['1.91/1', '1.91/1'],
        ['2/1', '2/1'],
        ['3/1', '3/1'],
        ['3/2', '3/2'],
        ['4/3', '4/3'],
        ['4/5', '4/5'],
        ['5/4', '5/4'],
        ['9/16', '9/16'],
        ['16/9', '16/9']
      ]
    }),
    fi.boolean('Force full width', 'force_full_width_image', {
      locked: opt?.mediaGroup?.hideForceFullWidthImageProp ?? false,
      help_text: 'This image is already full-width, but with the <strong>Force full width</strong> option enabled, it will take the full width of the parent element, even if there is extra padding around it.',
      display_width: 'half_width',
      default: opt?.default?.full_width_image?.force_full_width_image ?? false,
      visibility: {
        controlling_field_path: `${parent}full_width_image_opt_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.number('Border radius', 'full_width_image_border_radius', {
      min: 0,
      display_width: 'half_width',
      suffix: 'px',
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: `${parent}full_width_image_opt_visibility`,
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          },
          {
            controlling_field_path: `${parent}force_full_width_image`,
            operator: 'EQUAL',
            controlling_value_regex: 'false'
          }
        ]
      }
    })
  ]
}

export { fullWidthImage }
