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
import { styleGroup } from './unicard-style.js'

/**
 * #### module components
 * @typedef {Object} UNICARD_CONTENT_DEFAULTS
 * @property {'full_width_image'|'simple_image'|'icon'|'video'|'lottie'} [media_type] - media type
 * @property {object} [full_width_image] - full width image group
 * @property {boolean} [full_width_image.force_full_width_image] - force full width image
 * @property {'1/1'|'1.91/1'|'2/1'|'3/1'|'3/2'|'4/3'|'4/5'|'5/4'|'9/16'|'16/9'} [full_width_image.full_width_image_aspect_ratio] - full width image aspect ratio
 * @property {string} [full_width_image.src] - full width image source
 * @property {object} [simple_image] - simple image group
 * @property {string} [simple_image.src] - simple image source
 * @property {object} [icon] - icon group
 * @property {string} [icon.name] - icon name
 * @property {'SOLID'|'REGULAR'} [icon.type] - icon type
 * @property {string} [icon.unicode] - icon unicode
 * @property {object} [lottie] - lottie group
 * @property {string} [lottie.lottie_file_src] - lottie file source
 * @property {object} [video] - video group
 * @property {'hubspot_video'|'embed'} [video.video_type] - video type
 * @property {string} [video.video_url] - video file source
 * @property {string} [video.video_iframe_url] - video iframe source
 * @property {string} [heading] - heading
 * @property {string} [subheading] - subheading
 * @property {string} [richtext] - rich text content
 * @property {boolean} [buttons] - add default buttons
 * @property {boolean} [accordion] - add default accordion
 */

/**
 * #### module components
 * @typedef {Object} UNICARD_STYLE_DEFAULTS
 * @property {'LEFT'|'CENTER'|'RIGHT'} [horizontal_align] - horizontal alignment for the component
 * @property {'TOP'|'MIDDLE'|'BOTTOM'} [vertical_align] - vertical alignment for the component
 * @property {'LEFT'|'CENTER'|'RIGHT'} [mobile_alignment] - text color for the component
 * @property {string} [text_color] - text color for the component
 * @property {number} [content_gap] - content gap for the component
 * @property {'background_color'|'background_image'|'background_gradient'} [background_type] - background type for the component
 * @property {string} [background_color] - background color for the component
 * @property {number} [background_opacity] - background opacity for the component
 * @property {string} [background_image_src] - background image for the component
 * @property {string} [background_image_overlay_type] - background image overlay type for the component
 * @property {string} [background_image_overlay_color] - background image overlay type for the component
 * @property {number} [background_image_overlay_opacity] - background image overlay opacity for the component
 * @property {number} [padding] - padding for the component
 * @property {string} [border_color] - border color for the component
 * @property {number} [border_width] - border width for the component
 * @property {number} [border_radius] - border radius for the component
 * @property {'shadow-sm'|'shadow-md'|'shadow-lg'|'shadow-xl'|'shadow-2xl'|'shadow-custom1'|'shadow-custom2'|'shadow-custom3'} [shadow] - shadow for the component
 * @property {boolean} [hover_effects] - hover effects for the component
 * @property {string} [hover_text_color] - hover text color for the component
 * @property {string} [hover_background_color] - hover background color for the component
 * @property {number} [hover_background_opacity] - hover background opacity for the component
 * @property {string} [hover_border_color] - hover border color for the component
 * @property {'shadow-sm'|'shadow-md'|'shadow-lg'|'shadow-xl'|'shadow-2xl'|'shadow-custom1'|'shadow-custom2'|'shadow-custom3'} [hover_shadow] - hover shadow for the component
 * @property {'ani-scale1x'|'ani-scale2x'|'ani-scale3x'|'ani-scale4x'|'ani-slideup1x'|'ani-slideup2x'|'ani-slideup3x'|'ani-custom1'|'ani-custom2'|'ani-custom3'} [hover_animation] - hover animation for the component
 */

/**
 * #### unicard fields
 * @param {MODULE_COMPONENTS} components - parent path
 * @param {string} [parent] - parent path
 * @param {object} [opt] - options
 * @param {object} [opt.form] - form options
 * @param {object} [opt.mediaGroup] - media group options
 * @param {boolean} [opt.mediaGroup.hideMediaTypeProp]
 * @param {boolean} [opt.mediaGroup.hideForceFullWidthImageProp] - hide force_full_width_image property for fullWidthImage component
 * @param {boolean} [opt.mediaGroup.hideAlignmentProp] - hide alignment property for simpleImage component
 * @param {boolean} [opt.mediaGroup.hideForceFullWidthVideoProp] - hide force_full_width_video property for video component
 * @param {boolean} [opt.mediaGroup.showLottieScaleProp] - show lottie scale property
 * @param {boolean} [opt.hideWholeAreaLinkProp] - hide whole area link property
 * @param {boolean} [opt.hideComponentsProp] - hide components selection property
 * @param {boolean} [opt.showCardStyle] - show style group
 * @param {UNICARD_CONTENT_DEFAULTS} [opt.default] - default content
 */
const unicardFields = (components, parent = '', opt) => {
  const fields = []
  fields.push(moduleComponents(components, opt))
  components.choices.includes('categories') && fields.push(categoryGroup(parent))
  components.choices.includes('media') && fields.push(mediaGroup(parent, opt))
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
    heading(`${parent}heading.`, {
      default: {
        heading: opt?.default?.heading
      }
    })
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
      default: {
        heading: opt?.default?.subheading
      }
    })
  ))
  components.choices.includes('richtext') && fields.push(fi.richtext('Rich text', 'richtext', {
    default: opt?.default?.richtext ?? null,
    visibility: {
      controlling_field_path: `${parent}module_components`,
      operator: 'MATCHES_REGEX',
      controlling_value_regex: 'richtext'
    }
  }))
  components.choices.includes('buttons') && fields.push(buttonGroup(parent, opt))
  components.choices.includes('custom_text') && fields.push(customTextGroup(parent))
  components.choices.includes('list') && fields.push(listGroup(parent))
  components.choices.includes('accordion') && fields.push(accordionGroup(parent, opt))
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
    simpleImage(`${parent}additional_images_group.`, {
      mediaGroup: {
        hideAlignmentProp: true,
      }
    })
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
 * @param {object} [opt.hide] - hide options
 * @param {boolean} [opt.hide.hoverProps] - hide hover props
 * @param {boolean} [opt.hide.textColorProps] - hide
 * @param {boolean} [opt.hide.contentGapProps] - hide content gap prop
 * @param {object} [opt.show] - show options
 * @param {boolean} [opt.show.verticalAlignment] - show vertical alignment prop
 * @param {boolean} [opt.show.mobileAlignment] - show mobile alignment prop
 * @param {boolean} [opt.show.maxWidth] - show max width prop
 * @param {UNICARD_STYLE_DEFAULTS} [opt.default] - default style
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
          horizontal_align: opt?.default?.horizontal_align ?? 'LEFT',
          vertical_align: opt?.default?.vertical_align ?? null
        },
        alignment_direction: opt?.show?.verticalAlignment ? 'BOTH' : 'HORIZONTAL'
      }
    ),
    fi.alignment('Mobile alignment', 'mobile_alignment',
      {
        display_width: 'half_width',
        locked: !(opt?.show?.mobileAlignment),
        alignment_direction: 'HORIZONTAL',
        default: {
          horizontal_align: opt?.default?.mobile_alignment ?? null,
        }
      }
    ),
    fi.color('Text color', 'text_color', {
      default: opt?.default?.text_color ?? null,
      display_width: 'half_width',
      show_opacity: false,
      locked: opt?.hide?.textColorProps || false,
    }),
    fi.number('Content gap', 'content_gap', {
      min: 0,
      suffix: 'px',
      default: opt?.default?.content_gap ?? 16,
      display_width: 'half_width',
      help_text: 'General gap between all card components',
      locked: opt?.hide?.contentGapProps || false,
    }),
    fi.choice('Background type', 'background_type', {
      display_width: opt?.show?.mobileAlignment ? null : 'half_width',
      placeholder: 'No background',
      default: opt?.default?.background_type ?? null,
      choices: [
        ['background_color', 'Background color'],
        ['background_image', 'Background image'],
        ['background_gradient', 'Background gradient']
      ]
    }),
    fi.color('Background color', 'background_color', {
      default: {
        color: opt?.default?.background_color ?? null,
        opacity: opt?.default?.background_opacity ?? null
      },
      visibility: {
        controlling_field_path: `${parent}background_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'background_color'
      }
    }),
    fi.backgroundimage('Background image', 'background_image', {
      default: {
        src: opt?.default?.background_image_src ?? null,
        background_position : "MIDDLE_CENTER",
        background_size : "cover",
      },
      visibility: {
        controlling_field_path: `${parent}background_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'background_image',
      }
    }),
    fi.choice('Background image overlay type', 'background_image_overlay_type', {
      visibility: {
        controlling_field_path: `${parent}background_type`,
        operator: 'EQUAL',
        controlling_value_regex: 'background_image'
      },
      default: opt?.default?.background_image_overlay_type ?? null,
      placeholder: 'No overlay',
      choices: [
        ['color', 'Color'],
        ['gradient', 'Gradient']
      ]
    }),
    fi.color('Background image overlay', 'background_image_overlay', {
      default: {
        color: opt?.default?.background_image_overlay_color ?? null,
        opacity: opt?.default?.background_image_overlay_opacity ?? null
      },
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
      default: {
        padding : {
          bottom: {
            units: "px",
            value: opt?.default?.padding ?? null
          },
          left: {
            units: "px",
            value: opt?.default?.padding ?? null
          },
          right: {
            units: "px",
            value: opt?.default?.padding ?? null
          },
          top: {
            units: "px",
            value: opt?.default?.padding ?? null
          }
        }
      },
      visibility: {
        hidden_subfields: {
          margin: true
        }
      }
    }),
    fi.border('Border', 'border'),
    fi.number('Border radius', 'border_radius', {
      default: opt?.default?.border_radius ?? null,
      min: 0,
      suffix: 'px',
      display_width: 'half_width'
    }),
    fi.choice('Shadow', 'shadow', {
      default: opt?.default?.shadow ?? null,
      display_width: 'half_width',
      placeholder: 'No shadow',
      choices: shadowList
    }),
    fi.number('Max width', 'max_width', {
      locked: !(opt?.show?.maxWidth),
      min: 0,
      suffix: 'px',
      display_width: 'half_width'
    }),
    fi.boolean('Card hover effects', 'hover_effects', {
      default: opt?.default?.hover_effects ?? null,
      locked: opt?.hide?.hoverProps || false
    }),
    group('Hover', 'hover',
      {
        expanded: true,
        locked: opt?.hide?.hoverProps || false,
        visibility: {
          controlling_field_path: `${parent}hover_effects`,
          operator: 'EQUAL',
          controlling_value_regex: 'true'
        }
      },
      fi.color('Text color', 'text_color', {
        default: {
          color: opt?.default?.hover_text_color ?? null,
          opacity: 100
        }
      }),
      fi.color('Background color', 'background_color', {
        default: {
          color: opt?.default?.hover_background_color ?? null,
          opacity: opt?.default?.hover_background_opacity ?? null
        }
      }),
      fi.color('Border color', 'border_color', {
        default: {
          color: opt?.default?.hover_border_color ?? null,
          opacity: 100
        },
        help_text: 'Will be applied only if regular card border is added at least transparent',
      }),
      fi.choice('Shadow', 'shadow', {
        default: opt?.default?.hover_shadow ?? null,
        display_width: 'half_width',
        placeholder: 'No shadow',
        choices: shadowList
      }),
      fi.choice('Animation', 'animation', {
        default: opt?.default?.hover_animation ?? null,
        display_width: 'half_width',
        placeholder: 'No animation',
        choices: animationList
      })
    )
  ]
}

export { unicardFields, unicardStyleFields }
