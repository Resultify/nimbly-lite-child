import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'
import { fullWidthImage } from '../components/full-width-image.js'
import { simpleImage } from '../components/simple-image.js'
import { icon } from '../components/icon.js'
import { lottie } from '../components/lottie.js'
import { heading } from '../components/heading.js'
import { customTextGroup } from '../components/custom-text-group.js'
import { buttonGroup } from '../components/button-group.js'
import { animationList } from '../data/animation-list.js'
import { shadowList } from '../data/shadow-list.js'
import { categoryList } from '../data/category-list.js'

/**
 * #### unicard component fields
 * @typedef {Array<'categories'|'media'|'main_heading'|'sub_heading'|'richtext'|'custom_text'|'lists'|'separator'|'buttons'|'additional_images'>} COMPONENTS
 */

/**
 * #### unicard options
 * @typedef {Object} UNICARD_OPTIONS
 * @property {string} [options.parent] - parent field
 * @property {COMPONENTS} options.enabledByDefault - parent field
 * @property {COMPONENTS} options.components - parent field
 */

function render (/** @type {UNICARD_OPTIONS} */ { parent, enabledByDefault, components }) {
  const choices = components.map(component => {
    const words = component.split('_').join(' ')
    const title = words[0].toUpperCase() + words.slice(1)
    return [component, title]
  })
  const defaultChoices = enabledByDefault.filter(choice => components.includes(choice))
  if (!parent) {
    parent = ''
  }
  return {
    parent,
    default: defaultChoices,
    choices
  }
}

const unicardFields = (/** @type {UNICARD_OPTIONS} */ options) => {
  const opt = render(options)
  return [
    fi.choice('Module components', 'components', {
      multiple: true,
      reordering_enabled: true,
      default: opt.default,
      choices: opt.choices
    }),
    fi.choice('Categories', 'categories', {
      visibility: {
        controlling_field_path: `${opt.parent}components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'categories'
      },
      locked: false,
      multiple: true,
      choices: categoryList
    }),
    fi.choice('Media type', 'media_type', {
      visibility: {
        controlling_field_path: `${opt.parent}components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'media'
      },
      choices: [
        ['full_width_image', 'Full width image'],
        ['simple_image', 'Simple image'],
        ['icon', 'Icon'],
        ['lottie', 'Lottie Animation'],
        ['video', 'Video']
      ]
    }),
    group('Full width image', 'full_width_image_group',
      {
        expanded: true,
        visibility: {
          controlling_field_path: `${opt.parent}media_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'full_width_image'
        }
      },
      fullWidthImage(`${opt.parent}full_width_image_group.`)
    ),
    group('Simple image', 'simple_image_group',
      {
        expanded: true,
        visibility: {
          controlling_field_path: `${opt.parent}media_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'simple_image'
        }
      },
      simpleImage(`${opt.parent}simple_image_group.`)
    ),
    group('Icon', 'icon_group',
      {
        expanded: true,
        visibility: {
          controlling_field_path: `${opt.parent}media_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'icon'
        }
      },
      icon(`${opt.parent}icon_group.`)
    ),
    group('Lottie animation', 'lottie_group',
      {
        expanded: true,
        visibility: {
          controlling_field_path: `${opt.parent}media_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'lottie'
        }
      },
      lottie(`${opt.parent}lottie_group.`)
    ),
    group('Heading', 'heading',
      {
        visibility: {
          controlling_field_path: `${opt.parent}components`,
          operator: 'MATCHES_REGEX',
          controlling_value_regex: 'main_heading'
        },
        expanded: true
      },
      heading(`${opt.parent}heading.`, 'Universal card')
    ),
    group('Subheading', 'subheading',
      {
        visibility: {
          controlling_field_path: `${opt.parent}components`,
          operator: 'MATCHES_REGEX',
          controlling_value_regex: 'sub_heading'
        },
        expanded: true
      },
      heading(`${opt.parent}subheading.`)
    ),
    // subheading(`${opt.parent}`),
    fi.richtext('Rich text', 'richtext', {
      visibility: {
        controlling_field_path: `${opt.parent}components`,
        operator: 'MATCHES_REGEX',
        controlling_value_regex: 'richtext'
      }
    }),
    buttonGroup(`${opt.parent}`),
    customTextGroup(`${opt.parent}`),
    group('Additional images', 'additional_images_group',
      {
        visibility: {
          controlling_field_path: `${opt.parent}components`,
          operator: 'MATCHES_REGEX',
          controlling_value_regex: 'additional_images'
        },
        occurrence: {
          min: 0,
          max: 20
        }
      },
      simpleImage(`${opt.parent}additional_images_group.`, true)
    ),
    fi.boolean('Whole area link', 'whole_area_link', {
      display: 'toggle',
      default: false,
      display_width: 'half_width'
    })
  ]
}

const unicardStyleFields = (parent = '', hideCardHoverEffects = false) => {
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
      display_width: 'half_width',
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
        locked: hideCardHoverEffects,
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
