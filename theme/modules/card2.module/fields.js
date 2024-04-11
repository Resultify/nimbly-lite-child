/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi,
  writeJson
} from '@resultify/hubspot-fields-js'
import { component } from '../../../fields-js/components/all.js'

writeJson(init(
  component.image,
  component.heading,
  component.subheading,
  fi.text('Text', 'text'),
  fi.richtext('Rich text', 'richtext'),
  component.buttons,
  component.order([
    'Image',
    'Heading',
    'Subheading',
    'Text',
    'Rich text',
    'Separator',
    'Buttons',
    'Additional images'
  ]),
  fi.boolean('Whole area link', 'whole_area_link', {
    display: 'toggle',
    default: false,
    editor_options: {
      display_width: 'half_width'
    }
  }),
  styleGroup(
    group('General', 'general',
      {
        expanded: true
      },
      fi.color('Text color', 'text_color', {
        show_opacity: false
      }),
      fi.alignment('Alignment', 'alignment'),
      fi.number('Card gap', 'card_gap', {
        suffix: 'px',
        default: 12,
        editor_options: {
          display_width: 'half_width',
          help_text: 'General gap between all card components'
        }
      }),
      fi.color('Overlay color', 'overlay_color', {
        editor_options: {
          help_text: 'Whole area link overlay color on hover'
        },
        display_conditions: {
          visibility: {
            controlling_field_path: 'whole_area_link',
            operator: 'EQUAL',
            controlling_value_regex: 'true'
          }
        }
      })
    ),
    group('Text', 'text', {},
      fi.spacing('Spacing', 'spacing'),
      fi.color('Background', 'background'),
      fi.font('Font', 'font')
    ),
    group('Custom link', 'custom_link', {},
      fi.font('Font', 'font', {
        display_conditions: {
          visibility: {
            hidden_subfields: {
              underline: true
            }
          }
        }
      }),
      fi.choice('Underline', 'underline', {
        display: 'radio',
        choices: [
          ['underline', 'Underline'],
          ['none', 'None']
        ]
      }),
      group('Hover', 'hover', {},
        fi.color('Color', 'color'),
        fi.choice('Underline', 'underline', {
          display: 'radio',
          choices: [
            ['underline', 'Underline'],
            ['none', 'None']
          ]
        })
      )
    ),
    group('Custom button 1', 'custom_button_1', {},
      fi.spacing('Spacing', 'spacing'),
      fi.color('Background', 'background'),
      fi.font('Font', 'font'),
      fi.border('Border', 'border'),
      fi.number('Border radius', 'border_radius', {
        suffix: 'px'
      }),
      group('Hover', 'hover', {},
        fi.color('Background', 'background'),
        fi.color('Color', 'color'),
        fi.color('Border color', 'border_color')
      )
    ),
    group('Custom button 2', 'custom_button_2', {},
      fi.spacing('Spacing', 'spacing'),
      fi.color('Background', 'background'),
      fi.font('Font', 'font'),
      fi.border('Border', 'border'),
      fi.number('Border radius', 'border_radius', {
        suffix: 'px'
      }),
      group('Hover', 'hover', {},
        fi.color('Background', 'background'),
        fi.color('Color', 'color'),
        fi.color('Border color', 'border_color')
      )
    )
  )
))
