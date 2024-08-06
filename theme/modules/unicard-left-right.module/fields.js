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
          media_type: 'full_width_image',
          full_width_image_group: {
            full_width_image_aspect_ratio: '16/9'
          },
          icon_group: {
            icon_type: 'fontawesome',
            icon_size: 80
          },
          lottie_group: {
            lottie_speed: 1,
            lottie_mode: 'forward',
            lottie_loop: true
          },
          video_group: {
            video_type: 'hubspot_video',
            embed: {
              source_type: 'oembed'
            }
          },
          heading: {
            heading_tag: 'h2',
            heading_text: 'Left card',
            heading_icon_position: 'left'
          },
          subheading: {
            heading_tag: 'h3',
            heading_text: 'Subheading',
            heading_icon_position: 'left'
          },
          accordion_group: {
            accordion_icon_position: 'left',
            accordion_border_style: 'border_divider'
          },
          form_group: {
            form_heading_tag: 'h3'
          },
          module_components: ['main_heading', 'media']
        },
        {
          media_type: 'full_width_image',
          full_width_image_group: {
            full_width_image_aspect_ratio: '16/9'
          },
          icon_group: {
            icon_type: 'fontawesome',
            icon_size: 80
          },
          lottie_group: {
            lottie_speed: 1,
            lottie_mode: 'forward',
            lottie_loop: true
          },
          video_group: {
            video_type: 'hubspot_video',
            embed: {
              source_type: 'oembed'
            }
          },
          heading: {
            heading_tag: 'h2',
            heading_text: 'Right card',
            heading_icon_position: 'left'
          },
          subheading: {
            heading_tag: 'h3',
            heading_text: 'Subheading',
            heading_icon_position: 'left'
          },
          accordion_group: {
            accordion_icon_position: 'left',
            accordion_border_style: 'border_divider'
          },
          form_group: {
            form_heading_tag: 'h3'
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
          showLottieScaleProp: true,
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
    fi.spacing('', 'mobile_spacing', {
      inline_help_text: 'Spacing on <span style="color:#007a8c;font-weight:700;font-size:14px;">Mobile</span>',
      visibility: {
        controlling_field_path: 'style.hero_image_mode',
        operator: 'EQUAL',
        controlling_value_regex: 'true',
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
    ),
    fi.boolean('Hero Image mode', 'hero_image_mode', {
      inline_help_text: 'Enable hero image mode',
      help_text: 'Hero image mode will add an optimized background image to the module wrapper',
      display: 'toggle',
      default: false
    }),
    group('Hero Image', 'hero_image_group',
      {
        visibility: {
          controlling_field_path: 'style.hero_image_mode',
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      },
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
          controlling_field_path: 'style.hero_image_group.background_type',
          operator: 'EQUAL',
          controlling_value_regex: 'background_color'
        }
      }),
      fi.backgroundimage('Background image', 'background_image', {
        visibility: {
          controlling_field_path: 'style.hero_image_group.background_type',
          operator: 'EQUAL',
          controlling_value_regex: 'background_image'
        }
      }),
      fi.choice('Background image overlay type', 'background_image_overlay_type', {
        visibility: {
          controlling_field_path: 'style.hero_image_group.background_type',
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
              controlling_field_path: 'style.hero_image_group.background_type',
              operator: 'EQUAL',
              controlling_value_regex: 'background_image'
            },
            {
              controlling_field_path: 'style.hero_image_group.background_image_overlay_type',
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
              controlling_field_path: 'style.hero_image_group.background_type',
              operator: 'EQUAL',
              controlling_value_regex: 'background_image'
            },
            {
              controlling_field_path: 'style.hero_image_group.background_image_overlay_type',
              operator: 'EQUAL',
              controlling_value_regex: 'gradient'
            }
          ]
        }
      }),
      fi.gradient('Background gradient', 'background_gradient', {
        visibility: {
          controlling_field_path: 'style.hero_image_group.background_type',
          operator: 'EQUAL',
          controlling_value_regex: 'background_gradient'
        }
      }),
      fi.number('Container width', 'container_width', {
        min: 0,
        suffix: 'px',
        display_width: 'half_width'
      })
    )
  )
)
