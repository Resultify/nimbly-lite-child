import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'

const text = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    fi.text('Text', 'text', {
      allow_new_line: true
    })
  ]
}

const textStyle = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    group('Text', 'text',
      {
        visibility: {
          controlling_field_path: `${parent}text`,
          operator: 'NOT_EMPTY'
        }
      },
      fi.spacing('Spacing', 'spacing'),
      fi.color('Background', 'background'),
      fi.font('Font', 'font')
    )
  ]
}

export {
  text,
  textStyle
}
