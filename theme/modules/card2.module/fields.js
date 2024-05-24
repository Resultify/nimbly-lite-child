/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { component } from '../../../fields-js/components/all.js'
import { partial } from '../../../fields-js/partials/all.js'

init(
  fi.choice('Media type', 'media_type', {
    choices: [
      ['full_width_image', 'Full width image'],
      ['simple_image', 'Simple image'],
      ['icon', 'Icon'],
      ['lottie', 'Lottie Animation']
      // ['video', 'Video']
    ]
  }),
  group('Full width image', 'full_width_image_group',
    {
      expanded: true,
      visibility: {
        controlling_field_path: 'media_type',
        operator: 'EQUAL',
        controlling_value_regex: 'full_width_image'
      }
    },
    component.fullWidthImage('full_width_image_group')
  ),
  group('Simple image', 'simple_image_group',
    {
      expanded: true,
      visibility: {
        controlling_field_path: 'media_type',
        operator: 'EQUAL',
        controlling_value_regex: 'simple_image'
      }
    },
    component.simpleImage('simple_image_group')
  ),
  group('Icon', 'icon_group',
    {
      expanded: true,
      visibility: {
        controlling_field_path: 'media_type',
        operator: 'EQUAL',
        controlling_value_regex: 'icon'
      }
    },
    component.icon('icon_group')
  ),
  group('Lottie animation', 'lottie_group',
    {
      expanded: true,
      visibility: {
        controlling_field_path: 'media_type',
        operator: 'EQUAL',
        controlling_value_regex: 'lottie'
      }
    },
    component.lottie('lottie_group')
  ),
  group('Heading', 'heading', { expanded: true },
    component.heading('heading')
  ),
  component.subheading(),
  fi.richtext('Rich text', 'richtext'),
  component.buttonGroup(),
  component.customTextGroup(),
  group('Additional images', 'additional_images_group',
    {
      occurrence: {
        min: 0,
        max: 20
      }
    },
    component.simpleImage('additional_images_group', true)
  ),
  component.order([
    'Image',
    'Heading',
    'Subheading',
    'Rich text',
    'Button group',
    'Custom text group',
    'Additional images group',
    'Separator'
  ]),
  fi.boolean('Whole area link', 'whole_area_link', {
    display: 'toggle',
    default: false,
    display_width: 'half_width'
  }),
  styleGroup(
    fi.alignment('Alignment', 'alignment',
      {
        display_width: 'half_width',
        default: {
          horizontal_align: 'LEFT'
        },
        alignment_direction: 'HORIZONTAL'
      }
    ),
    fi.color('Text color', 'text_color', {
      display_width: 'half_width',
      show_opacity: false
    }),
    fi.number('Content gap', 'content_gap', {
      suffix: 'px',
      default: 16,
      display_width: 'half_width',
      help_text: 'General gap between all card components'
    }),
    fi.choice('Background type', 'background_type', {
      display_width: 'half_width',
      choices: [
        ['background_color', 'Background color'],
        ['background_image', 'Background image'],
        ['background_gradient', 'Background gradient']
      ]
    }),
    fi.color('Background color', 'background_color', {
      visibility: {
        controlling_field_path: 'style.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_color'
      }
    }),
    fi.backgroundimage('Background image', 'background_image', {
      visibility: {
        controlling_field_path: 'style.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_image'
      }
    }),
    fi.choice('Background image overlay type', 'background_image_overlay_type', {
      visibility: {
        controlling_field_path: 'style.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_image'
      },
      choices: [
        ['color', 'Color'],
        ['gradient', 'Gradient']
      ]
    }),
    fi.color('Background image overlay', 'background_image_overlay', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'style.background_type',
            operator: 'EQUAL',
            controlling_value_regex: 'background_image'
          },
          {
            controlling_field_path: 'style.background_image_overlay_type',
            operator: 'EQUAL',
            controlling_value_regex: 'color'
          }
        ]
      }
    }),
    fi.gradient('Background image overlay gradient', 'background_image_overlay_gradient', {
      visibility_rules: 'ADVANCED',
      advanced_visibility: {
        boolean_operator: 'AND',
        criteria: [
          {
            controlling_field_path: 'style.background_type',
            operator: 'EQUAL',
            controlling_value_regex: 'background_image'
          },
          {
            controlling_field_path: 'style.background_image_overlay_type',
            operator: 'EQUAL',
            controlling_value_regex: 'gradient'
          }
        ]
      }
    }),
    fi.gradient('Background gradient', 'background_gradient', {
      visibility: {
        controlling_field_path: 'style.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_gradient'
      }
    }),
    fi.spacing('', 'spacing', {
      visibility: {
        hidden_subfields: {
          margin: true
        }
      }
    }),
    fi.border('Border', 'border'),
    fi.number('Border radius', 'border_radius', {
      suffix: 'px',
      display_width: 'half_width'
    }),
    partial.shadowList(),
    // group('Top content block', 'top_content',
    //   {
    //     locked: false,
    //     help_text: 'Add vertical spacing to the top block of content defined by the content separator',
    //     inline_help_text: 'Add vertical spacing to the top block of content defined by the content separator'
    //   },
    //   fi.spacing('', 'top_content_spacing', {
    //     visibility: {
    //       hidden_subfields: {
    //         padding: true
    //       }
    //     }
    //   })
    // ),
    fi.boolean('Card hover effects', 'hover_effects'),
    group('Hover', 'hover',
      {
        expanded: true,
        visibility: {
          controlling_field_path: 'style.hover_effects',
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      },
      fi.color('Text color', 'text_color'),
      fi.color('Background color', 'background_color'),
      fi.color('Border color', 'border_color'),
      partial.shadowList(),
      partial.animationList()
    )
  )
)
