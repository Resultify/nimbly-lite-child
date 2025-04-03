import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

/**
 * #### simpleImage fields
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 * @param {object} [opt.mediaGroup] - media group options
 * @param {boolean} [opt.mediaGroup.hideAlignmentProp] - hide alignment property for simpleImage component
 * @param {object} [opt.default] - default simple image properties
 * @param {object} [opt.default.simple_image] - default simple image properties
 * @param {string} [opt.default.simple_image.src] - default simple image source
 */
const simpleImage = (parent = '', opt) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.image('Simple image', 'simple_image', {
      resizable: false,
      show_loading: false,
      responsive: false,
      default: {
        src: opt?.default?.simple_image?.src ?? null
      }
    }),
    fi.number('Width', 'simple_image_width', {
      min: 0,
      display_width: 'half_width',
      suffix: 'px',
      visibility: {
        controlling_field_path: `${parent}simple_image`,
        operator: 'NOT_EMPTY',
        property: 'src'
      }
    }),
    fi.choice('Alignment', 'simple_image_alignment', {
      display_width: 'half_width',
      locked: opt?.mediaGroup?.hideAlignmentProp ?? false,
      choices: [
        ['start', 'Left'],
        ['center', 'Center'],
        ['end', 'Right']
      ],
      visibility: {
        controlling_field_path: `${parent}simple_image`,
        operator: 'NOT_EMPTY',
        property: 'src'
      }
    })
  ]
}

export {
  simpleImage
}
