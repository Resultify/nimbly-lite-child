import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

/**
 * #### meeting fields
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 */
const meeting = (parent = '', opt) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.meeting('Meeting', 'meeting', {
      visibility: {
        controlling_field_path: `${parent}module_components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'meeting'
      }
    })
  ]
}

export { meeting }
