import {
  moduleFields as fi,
  group
} from '@resultify/hubspot-fields-js'
import { component } from '../../../fields-js/components/all.js' // TODO remove
import { fullWidthImage } from '../components/full-width-image.js'
import { simpleImage } from '../components/simple-image.js'
import { icon } from '../components/icon.js'
import { lottie } from '../components/lottie.js'
import { heading } from '../components/heading.js'
import { subheading } from '../components/subheading.js'
import { customTextGroup } from '../components/custom-text-group.js'
import { buttonGroup } from '../components/button-group.js'
import { animationList } from '../data/animation-list.js'
import { shadowList } from '../data/shadow-list.js'
import { categoryList } from '../data/category-list.js'

/**
 * #### cardFields
 * @param {Object} [lock] - lock components
 * @param {Boolean} [lock.lockCategoty] - lock category
 * @param {Boolean} [lock.lockMedia] - lock media
 * @param {Boolean} [lock.lockHeading] - lock heading
 * @param {Boolean} [lock.lockSubheading] - lock subheading
 * @param {Boolean} [lock.lockRichText] - lock rich text
 * @param {Boolean} [lock.lockButtonGroup] - lock button group
 * @param {Boolean} [lock.lockCustomTextGroup] - lock custom text group
 * @param {Boolean} [lock.lockAdditionalImagesGroup] - lock additional images group
 * @param {Boolean} [lock.lockComponentOrder] - lock component order
 * @returns {Array<Object>} - card fields array
 */

const unicardFields = (parent = '', lock = {}) => {
  if (typeof parent === 'string' && parent !== '') {
    parent = `${parent}`
  }
  return [
    fi.choice('Category', 'category', {
      locked: false,
      multiple: true,
      choices: categoryList
    }),
    fi.choice('Media type', 'media_type', {
      locked: lock.lockMedia,
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
          controlling_field_path: `${parent}media_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'full_width_image'
        }
      },
      fullWidthImage(`${parent}full_width_image_group.`)
    ),
    group('Simple image', 'simple_image_group',
      {
        expanded: true,
        visibility: {
          controlling_field_path: `${parent}media_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'simple_image'
        }
      },
      simpleImage(`${parent}simple_image_group.`)
    ),
    group('Icon', 'icon_group',
      {
        expanded: true,
        visibility: {
          controlling_field_path: `${parent}media_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'icon'
        }
      },
      icon(`${parent}icon_group.`)
    ),
    group('Lottie animation', 'lottie_group',
      {
        expanded: true,
        visibility: {
          controlling_field_path: `${parent}media_type`,
          operator: 'EQUAL',
          controlling_value_regex: 'lottie'
        }
      },
      lottie(`${parent}lottie_group.`)
    ),
    group('Heading', 'heading', { expanded: true, locked: lock.lockHeading },
      heading(`${parent}heading.`)
    ),
    subheading(`${parent}`),
    fi.richtext('Rich text', 'richtext'),
    buttonGroup(`${parent}`),
    customTextGroup(`${parent}`),
    group('Additional images', 'additional_images_group',
      {
        locked: lock.lockAdditionalImagesGroup,
        occurrence: {
          min: 0,
          max: 20
        }
      },
      simpleImage(`${parent}additional_images_group.`, true)
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
    ], lock.lockComponentOrder),
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
