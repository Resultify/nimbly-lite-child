/* eslint-disable no-unused-vars */
import {
  group,
  styleGroup,
  init,
  moduleFields as fi
} from '@resultify/hubspot-fields-js'
import { unicardFields, unicardStyleFields } from '../../partials/modules/unicard.js'
import { mediaGroup } from '../../partials/components/media-group.js'
import { shadowList } from '../../partials/data/shadow-list.js'

init(
  group('Media', 'media_group', {},
    fi.choice('Module components', 'module_components', {
      multiple: true,
      locked: true,
      reordering_enabled: true,
      default: 'media',
      choices: [
        ['media', 'media']
      ]
    }),
    mediaGroup('media_group.', {
      defaultMediaType: 'full_width_image',
      hideForceFullWidthImageProp: true,
      hideAlignmentProp: true,
      hideForceFullWidthVideoProp: true,
      additional_media_types: [['form', 'Form']]
    })
  ),
  group('Card', 'card_group', {},
    unicardFields({
      enabledByDefault: ['main_heading', 'richtext', 'buttons'],
      choices: ['media', 'main_heading', 'sub_heading', 'richtext', 'custom_text', 'list', 'accordion', 'separator', 'buttons', 'additional_images']
    }, 'card_group.')
  ),
  styleGroup(
    fi.boolean('Reverse', 'mediacard_desktop_reverse', {
      display_width: 'half_width',
      inline_help_text: 'Order on <span style="color:#007a8c;font-weight:700;font-size:14px;">Desktop</span>'
    }),
    fi.boolean('Reverse', 'mediacard_mobile_reverse', {
      display_width: 'half_width',
      inline_help_text: 'Order on <span style="color:#007a8c;font-weight:700;font-size:14px;">Mobile</span>'
    }),
    fi.number('', 'mediacard_desktop_gap', {
      default: 40,
      display_width: 'half_width',
      inline_help_text: 'Gap on <span style="color:#007a8c;font-weight:700;font-size:14px;">Desktop</span>',
      min: 0,
      suffix: 'px'
    }),
    fi.number('', 'mediacard_mobile_gap', {
      default: 20,
      display_width: 'half_width',
      inline_help_text: 'Gap on <span style="color:#007a8c;font-weight:700;font-size:14px;">Mobile</span>',
      min: 0,
      suffix: 'px'
    }),
    fi.number('Proportions', 'mediacard_proportions', {
      display: 'slider',
      default: 50,
      min: 0,
      max: 100,
      step: 5,
      suffix: '%'
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
    group('Media', 'media_style_group', {},
      fi.alignment('Desktop', 'media_desktop_alignment', {
        default: {
          horizontal_align: 'CENTER',
          vertical_align: 'MIDDLE'
        },
        required: true,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'OR',
          criteria: [
            {
              controlling_field_path: 'media_group.media_type',
              operator: 'EQUAL',
              controlling_value_regex: 'simple_image'
            },
            {
              controlling_field_path: 'media_group.media_type',
              operator: 'EQUAL',
              controlling_value_regex: 'icon'
            }
          ]
        }
      }),
      fi.alignment('Alignment', 'media_lottie_alignment', {
        default: {
          horizontal_align: 'CENTER'
        },
        alignment_direction: 'HORIZONTAL',
        required: true,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'AND',
          criteria: [
            {
              controlling_field_path: 'media_group.media_type',
              operator: 'EQUAL',
              controlling_value_regex: 'lottie'
            }
          ]
        }
      }),
      fi.alignment('Mobile', 'media_mobile_alignment', {
        alignment_direction: 'HORIZONTAL',
        default: {
          horizontal_align: 'LEFT'
        },
        required: true,
        visibility_rules: 'ADVANCED',
        advanced_visibility: {
          boolean_operator: 'OR',
          criteria: [
            {
              controlling_field_path: 'media_group.media_type',
              operator: 'EQUAL',
              controlling_value_regex: 'icon'
            },
            {
              controlling_field_path: 'media_group.media_type',
              operator: 'EQUAL',
              controlling_value_regex: 'simple_image'
            }
          ]
        }
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
      })
    ),
    group('Card', 'card_style_group', {},
      fi.alignment('', 'card_vertical_alignment', {
        alignment_direction: 'VERTICAL'
      }),
      unicardStyleFields('style.card_style_group.')
    )
  )
)
