/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const _heading = [
  fi.text('Heading', 'heading', {
    allow_new_line: true,
    default: 'Heading'
  }),
  fi.choice('Tag', 'heading_tag', {
    choices: [
      ['h1', 'H1'],
      ['h2', 'H2'],
      ['h3', 'H3'],
      ['h4', 'H4'],
      ['h5', 'H5'],
      ['h6', 'H6']
    ],
    default: 'h2',
    editor_options: {
      required: true,
      help_text: 'Semantic heading tag (h1-h6)',
      display_width: 'half_width'
    },
    display_conditions: {
      visibility: {
        controlling_field_path: 'heading',
        operator: 'NOT_EMPTY'
      }
    }
  }),
  fi.choice('Style', 'heading_style', {
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
    editor_options: {
      help_text: 'Display different heading styles not related to semantic heading type (tag h1-h6)',
      display_width: 'half_width'
    },
    display_conditions: {
      visibility: {
        controlling_field_path: 'heading',
        operator: 'NOT_EMPTY'
      }
    }
  })
]

const _subheading = [
  fi.text('Subheading', 'subheading', {
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
    editor_options: {
      required: true,
      help_text: 'Semantic heading tag (h1-h6)',
      display_width: 'half_width'
    },
    display_conditions: {
      visibility: {
        controlling_field_path: 'subheading',
        operator: 'NOT_EMPTY'
      }
    }
  }),
  fi.choice('Style', 'subheading_style', {
    choices: [
      ['heading_style_12', 'Heading style 12'],
      ['heading_style_11', 'Heading style 11'],
      ['heading_style_10', 'Heading style 10'],
      ['heading_style_9', 'Heading style 9'],
      ['heading_style_8', 'Heading style 8'],
      ['heading_style_7', 'Heading style 7'],
      ['heading_style_6', 'Heading style 6'],
      ['heading_style_5', 'Heading style 5'],
      ['heading_style_4', 'Heading style 4'],
      ['heading_style_3', 'Heading style 3'],
      ['heading_style_2', 'Heading style 2'],
      ['heading_style_1', 'Heading style 1']
    ],
    editor_options: {
      help_text: 'Display different heading styles not related to semantic heading type (tag h1-h6)',
      display_width: 'half_width'
    },
    display_conditions: {
      visibility: {
        controlling_field_path: 'subheading',
        operator: 'NOT_EMPTY'
      }
    }
  })
]

const heading = [
  _heading,
  fi.boolean('Heading link', 'enable_heading_link', {
    display_conditions: {
      visibility: {
        controlling_field_path: 'heading',
        operator: 'NOT_EMPTY'
      }
    }
  }),
  fi.link('', 'heading_link', {
    display_conditions: {
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'enable_heading_link',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          },
          {
            controlling_field_path: 'heading',
            operator: 'NOT_EMPTY'
          }
        ]
      }
    }
  })
]

const subheading = [
  _subheading
]

export {
  heading,
  subheading
}
