/// <reference path="./types.js" />
import {
  moduleFields as fi
} from '@resultify/hubspot-fields-js'

/**
 * #### simpleImage fields
 * @param {MODULE_COMPONENTS} components - parent path
 * @param {object} [opt] - options
 * @param {object} [opt.hideComponentsProp] - hide components selection property
 */
const moduleComponents = (components, opt) => {
  const choices = components.choices.map(component => {
    const words = component.split('_').join(' ')
    const title = words[0].toUpperCase() + words.slice(1)
    return [component, title]
  })
  const enabledByDefault = components.enabledByDefault.filter(choice => components.choices.includes(choice))
  return [
    fi.choice('Module components', 'module_components', {
      locked: opt?.hideComponentsProp || false,
      multiple: true,
      reordering_enabled: true,
      default: enabledByDefault,
      choices
    })
  ]
}

export { moduleComponents }
