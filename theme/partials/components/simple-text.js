import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const simpleText = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.text('Simple text', 'simple_text', {
      visibility: {
        controlling_field_path: `${parent}module_components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'simple_text'
      },
      allow_new_line: true
    })
  ]
}

export { simpleText }
