/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'
import { shadowList } from '../../partials/data/shadow-list.js'

init(
  group('Card', 'card_group',
    {
      occurrence: {
        min: 2,
        max: 2,
        default: 2,
        sorting_label_field: 'card_group.heading'
      },
      default: [
        {
          heading: {
            heading_tag: 'h2',
            heading_text: 'Left card'
          },
          module_components: ['main_heading', 'media']
        },
        {
          heading: {
            heading_tag: 'h2',
            heading_text: 'Right card'
          },
          module_components: ['main_heading', 'richtext', 'buttons']
        }
      ]
    },
    unicardFields(
      {
        enabledByDefault: ['main_heading'],
        choices: ['media', 'main_heading', 'sub_heading', 'richtext', 'custom_text', 'list', 'accordion', 'separator', 'buttons', 'additional_images']
      },
      'card_group.',
      {
        mediaGroup: {
          defaultMediaType: 'full_width_image',
          hideForceFullWidthImageProp: true,
          hideForceFullWidthVideoProp: true
        },
        hideWholeAreaLinkProp: true
      }
    )
  ),
  styleGroup(
    fi.number('Proportions', 'proportions', {
      display: 'slider',
      default: 50,
      min: 0,
      max: 100,
      step: 5,
      suffix: '%'
    }),
    fi.number('', 'desktop_gap', {
      default: 40,
      display_width: 'half_width',
      inline_help_text: 'Gap on <span style="color:#007a8c;font-weight:700;font-size:14px;">Desktop</span>',
      min: 0,
      suffix: 'px'
    }),
    fi.number('', 'mobile_gap', {
      default: 20,
      display_width: 'half_width',
      inline_help_text: 'Gap on <span style="color:#007a8c;font-weight:700;font-size:14px;">Mobile</span>',
      min: 0,
      suffix: 'px'
    }),
    fi.choice('Background type', 'background_type', {
      placeholder: 'No background',
      choices: [
        ['background_color', 'Background color'],
        ['background_image', 'Background image'],
        ['background_gradient', 'Background gradient']
      ]
    }),
    fi.color('Background color', 'background_color', {
      visibility: {
        controlling_field_path: 'style.media_style_group.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_color'
      }
    }),
    fi.backgroundimage('Background image', 'background_image', {
      visibility: {
        controlling_field_path: 'style.media_style_group.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_image'
      }
    }),
    fi.choice('Background image overlay type', 'background_image_overlay_type', {
      visibility: {
        controlling_field_path: 'style.media_style_group.background_type',
        operator: 'EQUAL',
        controlling_value_regex: 'background_image'
      },
      placeholder: 'No overlay',
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
            controlling_field_path: 'style.media_style_group.background_type',
            operator: 'EQUAL',
            controlling_value_regex: 'background_image'
          },
          {
            controlling_field_path: 'style.media_style_group.background_image_overlay_type',
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
            controlling_field_path: 'style.media_style_group.background_type',
            operator: 'EQUAL',
            controlling_value_regex: 'background_image'
          },
          {
            controlling_field_path: 'style.media_style_group.background_image_overlay_type',
            operator: 'EQUAL',
            controlling_value_regex: 'gradient'
          }
        ]
      }
    }),
    fi.gradient('Background gradient', 'background_gradient', {
      visibility: {
        controlling_field_path: 'style.media_style_group.background_type',
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
      min: 0,
      suffix: 'px',
      display_width: 'half_width'
    }),
    fi.choice('Shadow', 'shadow', {
      display_width: 'half_width',
      choices: shadowList
    }),
    fi.boolean('Reverse', 'mobile_reverse', {
      display_width: 'half_width',
      inline_help_text: 'Order on <span style="color:#007a8c;font-weight:700;font-size:14px;">Mobile</span>'
    }),
    group('Card 1', 'card_style_group1', {},
      unicardStyleFields('style.card_style_group1.', {
        hideHoverProps: true,
        showMobileAlignment: true,
        showVerticalAlignment: true
      })
    ),
    group('Card 2', 'card_style_group2', {},
      unicardStyleFields('style.card_style_group2.', {
        hideHoverProps: true,
        showMobileAlignment: true,
        showVerticalAlignment: true
      })
    )
  )
)
