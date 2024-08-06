import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'
import { categoryGroup } from '../components/category-group.js'
import { mediaGroup } from '../components/media-group.js'
import { heading } from '../components/heading.js'
import { customTextGroup } from '../components/custom-text-group.js'
import { buttonGroup } from '../components/button-group.js'
import { simpleImage } from '../components/simple-image.js'
import { simpleText } from '../components/simple-text.js'
import { listGroup } from '../components/list-group.js'
import { accordionGroup } from '../components/accordion-group.js'
import { form } from '../components/form.js'
import { moduleComponents } from '../components/module-components.js'
import { animationList } from '../data/animation-list.js'
import { shadowList } from '../data/shadow-list.js'

/**
 * #### fullWidthImage fields
 * @param {MODULE_COMPONENTS} components - parent path
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 * @param {object} [opt.form] - form options
 * @param {object} [opt.heading] - heading options
 * @param {string} [opt.heading.defaultHeading] - default heading text
 * @param {object} [opt.mediaGroup] - media group options
 * @param {string} [opt.mediaGroup.defaultMediaType] - default media type
 * @param {boolean} [opt.mediaGroup.hideForceFullWidthImageProp] - hide force_full_width_image property for fullWidthImage component
 * @param {boolean} [opt.mediaGroup.hideAlignmentProp] - hide alignment property for simpleImage component
 * @param {boolean} [opt.mediaGroup.hideForceFullWidthVideoProp] - hide force_full_width_video property for video component
 * @param {boolean} [opt.mediaGroup.showLottieScaleProp] - show lottie scale property
 * @param {boolean} [opt.hideWholeAreaLinkProp] - hide whole area link property
 */
const unicardFields = (components, parent = '', opt) => {
  return [
    categoryGroup(parent),
    mediaGroup(parent, opt?.mediaGroup),
    group('Heading', 'heading',
      {
        visibility: {
          controlling_field_path: `${parent}module_components`,
          operator: 'MATCHES_REGEX',
          controlling_value_regex: 'main_heading'
        },
        expanded: true
      },
      heading(`${parent}heading.`, opt?.heading)
    ),
    group('Subheading', 'subheading',
      {
        visibility: {
          controlling_field_path: `${parent}module_components`,
          operator: 'MATCHES_REGEX',
          controlling_value_regex: 'sub_heading'
        },
        expanded: true
      },
      heading(`${parent}subheading.`)
    ),
    fi.richtext('Rich text', 'richtext', {
      visibility: {
        controlling_field_path: `${parent}module_components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'richtext'
      }
    }),
    buttonGroup(parent),
    customTextGroup(parent),
    listGroup(parent),
    accordionGroup(parent),
    group('Form', 'form_group',
      {
        visibility: {
          controlling_field_path: `${parent}module_components`,
          operator: 'MATCHES_REGEX',
          controlling_value_regex: 'form'
        }
      },
      form(`${parent}form_group.`, opt?.form)
    ),
    group('Additional images', 'additional_images_group',
      {
        visibility: {
          controlling_field_path: `${parent}module_components`,
          operator: 'MATCHES_REGEX',
          controlling_value_regex: 'additional_images'
        },
        occurrence: {
          min: 0,
          max: 20
        }
      },
      simpleImage(`${parent}additional_images_group.`, { hideAlignmentProp: true })
    ),
    simpleText(parent),
    fi.boolean('Whole area link', 'whole_area_link', {
      help_text: 'When enabled, the whole area of the module will be clickable as a link.<br>To make this work, you need to add a link to any of the heading, subheading or button components.',
      display: 'toggle',
      default: false,
      visibility_rules: 'ADVANCED',
      locked: opt?.hideWholeAreaLinkProp || false,
      advanced_visibility: {
        boolean_operator: 'OR',
        criteria: [
          {
            controlling_field_path: `${parent}module_components`,
            operator: 'MATCHES_REGEX',
            controlling_value_regex: 'main_heading'
          },
          {
            controlling_field_path: `${parent}module_components`,
            operator: 'MATCHES_REGEX',
            controlling_value_regex: 'sub_heading'
          },
          {
            controlling_field_path: `${parent}module_components`,
            operator: 'MATCHES_REGEX',
            controlling_value_regex: 'buttons'
          }
        ]
      }
    }),
    moduleComponents(components)
  ]
}

/**
 * #### fullWidthImage fields
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 * @param {boolean} [opt.hideHoverProps] - hide hover props
 * @param {boolean} [opt.showVerticalAlignment] - show vertical alignment prop
 * @param {boolean} [opt.showMobileAlignment] - show mobile alignment prop
 */
const unicardStyleFields = (parent = '', opt) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.alignment('Alignment', 'alignment',
      {
        display_width: 'half_width',
        default: {
          horizontal_align: 'LEFT'
        },
        alignment_direction: opt?.showVerticalAlignment ? 'BOTH' : 'HORIZONTAL'
      }
    ),
    fi.alignment('Mobile alignment', 'mobile_alignment',
      {
        display_width: 'half_width',
        locked: !(opt?.showMobileAlignment),
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
      min: 0,
      suffix: 'px',
      default: 16,
      display_width: 'half_width',
      help_text: 'General gap between all card components'
    }),
    fi.choice('Background type', 'background_type', {
      display_width: opt?.showMobileAlignment ? null : 'half_width',
      placeholder: 'No background',
      choices: [
        ['background_color', 'Background color'],
        ['background_image', 'Background image'],
        ['background_gradient', 'Background gradient']
      ]
    }),
    fi.color('Background color', 'background_color', {
      visibility: {
        controlling_field_path: `${parent}background_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'background_color'
      }
    }),
    fi.backgroundimage('Background image', 'background_image', {
      visibility: {
        controlling_field_path: `${parent}background_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'background_image'
      }
    }),
    fi.choice('Background image overlay type', 'background_image_overlay_type', {
      visibility: {
        controlling_field_path: `${parent}background_type`,
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
            controlling_field_path: `${parent}background_type`,
            operator: 'EQUAL',
            controlling_value_regex: 'background_image'
          },
          {
            controlling_field_path: `${parent}background_image_overlay_type`,
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
            controlling_field_path: `${parent}background_type`,
            operator: 'EQUAL',
            controlling_value_regex: 'background_image'
          },
          {
            controlling_field_path: `${parent}background_image_overlay_type`,
            operator: 'EQUAL',
            controlling_value_regex: 'gradient'
          }
        ]
      }
    }),
    fi.gradient('Background gradient', 'background_gradient', {
      visibility: {
        controlling_field_path: `${parent}background_type`,
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
    fi.boolean('Card hover effects', 'hover_effects', {
      locked: opt?.hideHoverProps || false
    }),
    group('Hover', 'hover',
      {
        expanded: true,
        locked: opt?.hideHoverProps || false,
        visibility: {
          controlling_field_path: `${parent}hover_effects`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      },
      fi.color('Text color', 'text_color'),
      fi.color('Background color', 'background_color'),
      fi.color('Border color', 'border_color'),
      fi.choice('Shadow', 'shadow', {
        display_width: 'half_width',
        choices: shadowList
      }),
      fi.choice('Animation', 'animation', {
        display_width: 'half_width',
        choices: animationList
      })
    )
  ]
}

export { unicardFields, unicardStyleFields }
