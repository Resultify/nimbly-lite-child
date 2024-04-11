/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

const _image = [
  fi.choice('Image type', 'image_type', {
    editor_options: {
      help_text: 'bla',
      display_width: 'half_width'
    },
    choices: [
      ['full_width', 'Full width'],
      ['image', 'Image'],
      ['icon', 'Icon']
    ]
  }),
  fi.choice('Aspect ratio', 'aspect_ratio', {
    editor_options: {
      display_width: 'half_width',
      required: true
    },
    default: '16/9',
    display_conditions: {
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'image_type',
            operator: 'EQUAL',
            controlling_value_regex: 'full_width'
          },
          {
            controlling_field_path: 'full_width_image',
            operator: 'NOT_EMPTY',
            property: 'src'
          }
        ]
      }
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
  fi.image('Image', 'full_width_image', {
    resizable: false,
    show_loading: false,
    responsive: true,
    display_conditions: {
      visibility: {
        controlling_field_path: 'image_type',
        operator: 'EQUAL',
        controlling_value_regex: 'full_width'
      }
    }
  }),
  fi.image('Image', 'image', {
    resizable: false,
    show_loading: false,
    responsive: false,
    display_conditions: {
      visibility: {
        controlling_field_path: 'image_type',
        operator: 'EQUAL',
        controlling_value_regex: 'image'
      }
    }
  }),
  fi.icon('Icon', 'icon', {
    display_conditions: {
      visibility: {
        controlling_field_path: 'image_type',
        operator: 'EQUAL',
        controlling_value_regex: 'icon'
      }
    }
  }),
  fi.choice('Icon style', 'icon_style', {
    editor_options: {
      display_width: 'half_width',
      required: true
    },
    default: 'primary',
    display_conditions: {
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'image_type',
            operator: 'EQUAL',
            controlling_value_regex: 'icon'
          },
          {
            controlling_field_path: 'icon',
            operator: 'NOT_EMPTY',
            property: 'name'
          }
        ]
      }
    },
    choices: [
      ['primary', 'Primary'],
      ['secondary', 'Secondary']
    ]
  }),
  fi.choice('Icon size', 'icon_size', {
    editor_options: {
      display_width: 'half_width',
      required: true
    },
    default: 'regular',
    display_conditions: {
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'image_type',
            operator: 'EQUAL',
            controlling_value_regex: 'icon'
          },
          {
            controlling_field_path: 'icon',
            operator: 'NOT_EMPTY',
            property: 'name'
          }
        ]
      }
    },
    choices: [
      ['small', 'Small'],
      ['regular', 'Regular'],
      ['large', 'Large']
    ]
  })
]

const image = [
  _image
]

export {
  _image,
  image
}
