class FaqModuleAnimations {
  constructor (el) {
    // Store the <details> element
    this.el = el
    // Store the <summary> element
    this.summary = el.querySelector('.faq-with-tags-module__text')
    // Store the content element
    this.content = el.querySelector('.faq-with-tags-module__richtext')
    // Store if the element is animating
    this.isAnimating = false
  }

  init () {
    // Detect user clicks on the summary element
    this.summary.addEventListener('click', (e) => this.onClick(e))
  }

  onClick (e) {
    // Stop default behaviour from the browser
    e.preventDefault()
    // Check if the element is being animated or is already closed
    if (!this.isAnimating && !this.el.open) {
      this.expand()
    // Check if the element is being animated or is already open
    } else if (!this.isAnimating && this.el.open) {
      this.shrink()
    }
  }

  expand () {
    this.isAnimating = true
    // Set the element as "opening"
    this.el.classList.remove('closing')
    this.el.classList.add('opening')
    this.el.open = true

    setTimeout(() => {
      this.isAnimating = false
      this.el.classList.remove('opening')
    }, 200)
  }

  shrink () {
    this.isAnimating = true
    // Set the element as "closing"
    this.el.classList.remove('opening')
    this.el.classList.add('closing')

    setTimeout(() => {
      this.el.open = false
      this.isAnimating = false
      this.el.classList.remove('closing')
    }, 200)
  }
}

class FaqModuleTagSwitching {
  constructor (el) {
    // Store the whole element
    this.el = el
    // Store the tags element
    this.tags = el.querySelector('.faq-with-tags-module__button-tags')
    // Store class-names of active and inactive button tags
    this.active_tag = el.getAttribute('data-active-tag')
    this.inactive_tag = el.getAttribute('data-inactive-tag')
  }

  init () {
    // Detect user clicks on the summary element
    this.tags.addEventListener('click', (e) => this.onClick(e))
  }

  onClick (e) {
    let id = null

    // Is target a button?
    if (e.target.tagName === 'BUTTON') {
      id = e.target.getAttribute('data-id')
      // Or is parent a button?
    } else if (e.target.parentElement.tagName === 'BUTTON') {
      id = e.target.parentElement.getAttribute('data-id')
    }

    if (id) {
      // Go through all tags (source) and set classes
      this.tags.querySelectorAll('.btn-link').forEach((e) => {
        if (id === e.getAttribute('data-id')) {
          e.classList.add(this.active_tag)
          e.classList.remove(this.inactive_tag)
        } else {
          e.classList.add(this.inactive_tag)
          e.classList.remove(this.active_tag)
        }
      })

      // Go through all tag (destination) and set classes
      this.el.querySelectorAll('.faq-with-tags-module__tag').forEach((e) => {
        if (id === e.id) {
          e.classList.add('show')
        } else {
          e.classList.remove('show')
        }
      })
    }
  }
}

window.addEventListener('load', function () {
  document.querySelectorAll('.faq-with-tags-module-animate .faq-with-tags-module__details').forEach((el) => {
    const t = new FaqModuleAnimations(el)
    t.init()
  })

  document.querySelectorAll('.faq-with-tags-module').forEach((el) => {
    const t = new FaqModuleTagSwitching(el)
    t.init()
  })
})
