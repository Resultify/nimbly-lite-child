import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const subheading = (parent) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.text('Subheading', 'subheading_text', {
      allow_new_line: true
    }),
    fi.choice('Tag', 'subheading_tag', {
      choices: [
        ['h1', 'H1'],
        ['h2', 'H2'],
        ['h3', 'H3'],
        ['h4', 'H4'],
        ['h5', 'H5'],
        ['h6', 'H6']
      ],
      default: 'h3',
      required: true,
      help_text: 'Semantic heading tag (h1-h6)',
      display_width: 'half_width',
      visibility: {
        controlling_field_path: `${parent}subheading_text`,
        operator: 'NOT_EMPTY'
      }
    }),
    fi.choice('Style', 'subheading_style', {
      choices: [
        ['display-1', 'Style 12'],
        ['display-2', 'Style 11'],
        ['display-3', 'Style 10'],
        ['display-4', 'Style 9'],
        ['display-5', 'Style 8'],
        ['display-6', 'Style 7'],
        ['h1', 'Style 6'],
        ['h2', 'Style 5'],
        ['h3', 'Style 4'],
        ['h4', 'Style 3'],
        ['h5', 'Style 2'],
        ['h6', 'Style 1']
      ],
      help_text: 'Display different heading styles not related to semantic heading type (tag h1-h6)',
      display_width: 'half_width',
      visibility: {
        controlling_field_path: `${parent}subheading_text`,
        operator: 'NOT_EMPTY'
      }
    })
  ]
}

export {
  subheading
}
