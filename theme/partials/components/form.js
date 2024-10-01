import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

/**
 * #### form fields
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 */
const form = (parent = '', opt) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.text('Title', 'form_heading_text', {
      allow_new_line: true
    }),
    fi.form('Form', 'form'),
    fi.boolean('', 'form_prop_visibility', {
      inline_help_text: '<span style="color:#33475b;">Show/hide</span> additional <span style="color:#007a8c;font-weight:700;font-size:14px;">Form</span> properties.',
      display: 'toggle'
    }),
    fi.choice('Title tag', 'form_heading_tag', {
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
        controlling_field_path: `${parent}form_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.choice('Title style', 'form_heading_style', {
      choices: [
        ['display-1', 'Style 12'],
        ['display-2', 'Style 11'],
        ['display-3', 'Style 10'],
        ['display-4', 'Style 9'],
        ['display-5', 'Style 8'],
        ['display-6', 'Style 7'],
        ['h1', 'Style 6 [H1]'],
        ['h2', 'Style 5 [H2]'],
        ['h3', 'Style 4 [H3]'],
        ['h4', 'Style 3 [H4]'],
        ['h5', 'Style 2 [H5]'],
        ['h6', 'Style 1 [H6]']
      ],
      help_text: 'Display different heading styles not related to semantic heading type (tag h1-h6)',
      display_width: 'half_width',
      visibility: {
        controlling_field_path: `${parent}form_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.choice('Button style', 'button_style', {
      choices: [
        ['primary', 'Primary'],
        ['secondary1', 'Button 2'],
        ['secondary2', 'Button 3'],
        ['secondary3', 'Button 4']
      ],
      display_width: 'half_width',
      visibility: {
        controlling_field_path: `${parent}form_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.choice('Button size', 'button_size', {
      choices: [
        ['small', 'Small'],
        ['regular', 'Regular'],
        ['large', 'Large']
      ],
      display_width: 'half_width',
      visibility: {
        controlling_field_path: `${parent}form_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.choice('Button position', 'button_position', {
      display_width: 'half_width',
      choices: [
        ['left', 'Left'],
        ['center', 'Center'],
        ['right', 'Right']
      ],
      default: 'left',
      required: true,
      visibility: {
        controlling_field_path: `${parent}form_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    fi.color('Text color', 'form_text_color', {
      visibility: {
        controlling_field_path: `${parent}form_prop_visibility`,
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    })
  ]
}

export { form }
