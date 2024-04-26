import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'

const heading = (parent = '') => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}.`
  }
  return [
    group('Heading', 'heading', { expanded: true },
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
        required: true,
        help_text: 'Semantic heading tag (h1-h6)',
        display_width: 'half_width',
        visibility: {
          controlling_field_path: `${parent}heading.heading`,
          operator: 'NOT_EMPTY'
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
        help_text: 'Display different heading styles not related to semantic heading type (tag h1-h6)',
        display_width: 'half_width',
        visibility: {
          controlling_field_path: `${parent}heading.heading`,
          operator: 'NOT_EMPTY'
        }
      }),
      fi.boolean('Heading link', 'enable_heading_link', {
        display_width: 'half_width',
        visibility: {
          controlling_field_path: `${parent}heading.heading`,
          operator: 'NOT_EMPTY'
        }
      }),
      fi.boolean('Heading icon', 'enable_heading_icon', {
        display_width: 'half_width',
        locked: true,
        visibility: {
          controlling_field_path: `${parent}heading.heading`,
          operator: 'NOT_EMPTY'
        }
      }),
      fi.link('', 'heading_link', {
        visibility_rules: 'ADVANCED',
        supported_types: ['BLOG', 'CALL_TO_ACTION', 'CONTENT', 'EMAIL_ADDRESS', 'FILE', 'EXTERNAL', 'PAYMENT', 'PHONE_NUMBER', 'WHATSAPP_NUMBER'],
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: `${parent}heading.enable_heading_link`,
              operator: 'EQUAL',
              controlling_value_regex: 'true'
            },
            {
              controlling_field_path: `${parent}heading.heading`,
              operator: 'NOT_EMPTY'
            }
          ]
        }
      })
    )
  ]
}

export {
  heading
}
