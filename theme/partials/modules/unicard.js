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
import { meeting } from '../components/meeting.js'
import { moduleComponents } from '../components/module-components.js'
import { animationList } from '../data/animation-list.js'
import { shadowList } from '../data/shadow-list.js'
import { unicardDefaultContent } from './unicard-default.js'
import { styleGroup } from './unicard-style.js'

/**
 * #### unicard fields
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
 * @param {boolean} [opt.showCardStyle] - show style group
 */
const unicardFields = (components, parent = '', opt) => {
  const fields = []
  fields.push(moduleComponents(components))
  components.choices.includes('categories') && fields.push(categoryGroup(parent))
  components.choices.includes('media') && fields.push(mediaGroup(parent, opt?.mediaGroup))
  components.choices.includes('main_heading') && fields.push(group('Heading', 'heading',
    {
      icon: {
        name: 'heading',
        set: 'fontawesome-6.4.2',
        type: 'SOLID'
      },
      visibility: {
        controlling_field_path: `${parent}module_components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'main_heading'
      },
      expanded: true
    },
    heading(`${parent}heading.`, opt?.heading)
  ))
  components.choices.includes('sub_heading') && fields.push(group('Subheading', 'subheading',
    {
      icon: {
        name: 'bold',
        set: 'fontawesome-6.4.2',
        type: 'SOLID'
      },
      visibility: {
        controlling_field_path: `${parent}module_components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'sub_heading'
      },
      expanded: true
    },
    heading(`${parent}subheading.`, {
      defaultHeading: unicardDefaultContent.subheading,
    })
  ))
  components.choices.includes('richtext') && fields.push(fi.richtext('Rich text', 'richtext', {
    default: unicardDefaultContent.richtext,
    visibility: {
      controlling_field_path: `${parent}module_components`,
      operator: 'MATCHES_REGEX',
      controlling_value_regex: 'richtext'
    }
  }))
  components.choices.includes('buttons') && fields.push(buttonGroup(parent))
  components.choices.includes('custom_text') && fields.push(customTextGroup(parent))
  components.choices.includes('list') && fields.push(listGroup(parent))
  components.choices.includes('accordion') && fields.push(accordionGroup(parent))
  components.choices.includes('form') && fields.push(group('Form', 'form_group',
    {
      icon: {
        name: 'wpforms',
        set: 'fontawesome-6.4.2',
        type: 'REGULAR'
      },
      visibility: {
        controlling_field_path: `${parent}module_components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'form'
      }
    },
    form(`${parent}form_group.`, opt?.form)
  ))
  components.choices.includes('meeting') && fields.push(meeting(parent))
  components.choices.includes('additional_images') && fields.push(group('Additional images', 'additional_images_group',
    {
      icon: {
        name: 'images',
        set: 'fontawesome-6.4.2',
        type: 'REGULAR'
      },
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
  ))
  components.choices.includes('simple_text') && fields.push(simpleText(parent))
  fields.push(fi.boolean('Whole area link', 'whole_area_link', {
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
  }))
  fields.push(styleGroup(parent, opt))
  return fields
}

/**
 * #### fullWidthImage fields
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 * @param {boolean} [opt.hideHoverProps] - hide hover props
 * @param {boolean} [opt.showVerticalAlignment] - show vertical alignment prop
 * @param {boolean} [opt.showMobileAlignment] - show mobile alignment prop
 * @param {boolean} [opt.showMaxWidth] - show max width prop
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
      default: unicardDefaultContent.style.background_type ?? null,
      choices: [
        ['background_color', 'Background color'],
        ['background_image', 'Background image'],
        ['background_gradient', 'Background gradient']
      ]
    }),
    fi.color('Background color', 'background_color', {
      default: unicardDefaultContent.style.background_color ?? null,
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
      default: unicardDefaultContent.style.spacing ?? null,
      visibility: {
        hidden_subfields: {
          margin: true
        }
      }
    }),
    fi.border('Border', 'border'),
    fi.number('Border radius', 'border_radius', {
      default: unicardDefaultContent.style.border_radius ?? null,
      min: 0,
      suffix: 'px',
      display_width: 'half_width'
    }),
    fi.choice('Shadow', 'shadow', {
      default: unicardDefaultContent.style.shadow ?? null,
      display_width: 'half_width',
      placeholder: 'No shadow',
      choices: shadowList
    }),
    fi.number('Max width', 'max_width', {
      locked: !(opt?.showMaxWidth),
      min: 0,
      suffix: 'px',
      display_width: 'half_width'
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
        placeholder: 'No shadow',
        choices: shadowList
      }),
      fi.choice('Animation', 'animation', {
        display_width: 'half_width',
        placeholder: 'No animation',
        choices: animationList
      })
    )
  ]
}

export { unicardFields, unicardStyleFields }
