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
  fi.choice('Image type', 'image_type', {
    display_width: 'half_width',
    choices: [
      ['full_width', 'Full width'],
      ['image', 'Image'],
      ['icon', 'Icon'],
      ['lottie', 'Lottie Animation']
    ]
  }),
  group('Full width image', 'full_width',
    {
      expanded: false,
      visibility: {
        controlling_field_path: 'image_type',
        operator: 'EQUAL',
        controlling_value_regex: 'full_width'
      }
    },
    component.fullWidthImage('full_width')
  ),
  group('Image', 'image',
    {
      expanded: false,
      visibility: {
        controlling_field_path: 'image_type',
        operator: 'EQUAL',
        controlling_value_regex: 'image'
      }
    },
    component.simpleImage('image')
  ),
  group('Icon', 'icon',
    {
      expanded: false,
      visibility: {
        controlling_field_path: 'image_type',
        operator: 'EQUAL',
        controlling_value_regex: 'icon'
      }
    },
    component.icon('icon')
  ),
  group('Lottie animation', 'lottie',
    {
      expanded: false,
      visibility: {
        controlling_field_path: 'image_type',
        operator: 'EQUAL',
        controlling_value_regex: 'lottie'
      }
    },
    component.lottie('lottie')
  ),
  group('Heading', 'heading', { expanded: true },
    component.heading('heading')
  ),
  component.subheading(),
  fi.richtext('Rich text', 'richtext'),
  component.text(),
  component.buttons,
  group('Additional images', 'additional_images',
    {
      occurrence: {
        min: 0,
        max: 20,
        sorting_label_field: 'additional_images.image.alt'
      }
    },
    component.simpleImage('additional_images')
  ),
  component.order([
    'Image',
    'Heading',
    'Subheading',
    'Rich text',
    'Text',
    'Separator',
    'Buttons',
    'Additional images'
  ]),
  fi.boolean('Whole area link', 'whole_area_link', {
    display: 'toggle',
    default: false,
    display_width: 'half_width'
  }),
  styleGroup(
    group('General', 'general',
      {
        expanded: true
      },
      fi.color('Text color', 'text_color', {
        show_opacity: false
      }),
      fi.alignment('Alignment', 'alignment',
        {
          default: {
            horizontal_align: 'LEFT'
          },
          alignment_direction: 'HORIZONTAL'
        }
      ),
      fi.number('Content gap', 'content_gap', {
        suffix: 'px',
        default: 12,
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
          controlling_field_path: 'style.general.background_type',
          operator: 'EQUAL',
          controlling_value_regex: 'background_color'
        }
      }),
      fi.backgroundimage('Background image', 'background_image', {
        visibility: {
          controlling_field_path: 'style.general.background_type',
          operator: 'EQUAL',
          controlling_value_regex: 'background_image'
        }
      }),
      fi.gradient('Background gradient', 'background_gradient', {
        visibility: {
          controlling_field_path: 'style.general.background_type',
          operator: 'EQUAL',
          controlling_value_regex: 'background_gradient'
        }
      }),
      fi.border('Border', 'border'),
      fi.number('Border radius', 'border_radius', {
        default: 0,
        suffix: 'px',
        display_width: 'half_width'
      }),
      partial.shadowList(),
      fi.spacing('Spacing', 'spacing')
    ),
    fi.boolean('Card content block styles', 'content_block_styles'),
    fi.number('Content separator gap', 'content_separator_gap', {
      suffix: 'px',
      inherited_value: {
        default_value_path: 'module.style.general.content_gap'
      },
      visibility: {
        controlling_field_path: 'style.content_block_styles',
        operator: 'EQUAL',
        controlling_value_regex: 'true'
      }
    }),
    group('Top content block', 'top_content_block',
      {
        visibility: {
          controlling_field_path: 'style.content_block_styles',
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      },
      fi.color('Background color', 'background_color'),
      fi.border('Border', 'border'),
      fi.number('Border radius', 'border_radius', {
        suffix: 'px'
      }),
      fi.spacing('Spacing', 'spacing', {
        visibility: {
          hidden_subfields: {
            margin: true
          }
        }
      })
    ),
    group('Bottom content block', 'bottom_content_block',
      {
        visibility: {
          controlling_field_path: 'style.content_block_styles',
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      },
      fi.color('Background color', 'background_color'),
      fi.border('Border', 'border'),
      fi.number('Border radius', 'border_radius', {
        suffix: 'px'
      }),
      fi.spacing('Spacing', 'spacing', {
        visibility: {
          hidden_subfields: {
            margin: true
          }
        }
      })
    ),
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
      fi.color('Overlay color', 'overlay_color'),
      partial.shadowList(),
      partial.animationList()
    ),
    component.textStyle(),
    component.iconStyle('icon'),
    component.buttonsStyle
  )
)
