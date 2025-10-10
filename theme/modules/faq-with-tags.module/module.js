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

class FaqModuleSearch {
  constructor (el) {
    // Store the whole element
    this.el = el
    // Store the search input element
    this.searchInput = el.querySelector('.faq-with-tags-module__search-input')
    // Store the no results message
    this.noResults = el.querySelector('.faq-with-tags-module__no-results')
    // Store all FAQ items
    this.faqItems = el.querySelectorAll('.faq-with-tags-module__details')
    // Store active tag display
    this.tagDisplay = el.querySelector('.faq-with-tags-module__button-tags')
    // Store all tag containers
    this.tagContainers = el.querySelectorAll('.faq-with-tags-module__tag')
  }

  init () {
    if (!this.searchInput) return

    this.searchInput.addEventListener('input', (e) => this.onSearch(e))
  }

  onSearch (e) {
    const searchTerm = e.target.value.toLowerCase().trim()
    let hasVisibleItems = false
    let activeTagId = null

    // Find which tag is currently active
    if (this.tagDisplay && this.tagDisplay.classList.contains('show')) {
      const activeTagClass = this.el.getAttribute('data-active-tag');
      // Validate class name: only allow letters, numbers, underscores, and hyphens
      if (/^[A-Za-z0-9_-]+$/.test(activeTagClass)) {
        const activeTagBtn = this.tagDisplay.querySelector(`[class~="${activeTagClass}"]`);
        if (activeTagBtn) {
          activeTagId = activeTagBtn.getAttribute('data-id');
        }
      }
    }

    // If search term exists, hide tag navigation and show all tag containers
    if (searchTerm) {
      if (this.tagDisplay) this.tagDisplay.style.display = 'none'
      this.tagContainers.forEach(container => {
        container.classList.add('show')
      })
    } else {
      // If no search term, restore tag navigation and original visibility
      if (this.tagDisplay) this.tagDisplay.style.display = ''
      this.tagContainers.forEach(container => {
        if (activeTagId) {
          container.classList.toggle('show', container.id === activeTagId)
        }
      })
    }

    // Filter each FAQ item
    this.faqItems.forEach(item => {
      const questionEl = item.querySelector('.faq-with-tags-module__text');
      const answerEl = item.querySelector('.faq-with-tags-module__richtext');
      const question = questionEl && questionEl.textContent ? questionEl.textContent.toLowerCase() : '';
      const answer = answerEl && answerEl.textContent ? answerEl.textContent.toLowerCase() : '';

      if (!searchTerm || question.includes(searchTerm) || answer.includes(searchTerm)) {
        item.style.display = ''
        hasVisibleItems = true
      } else {
        item.style.display = 'none'
      }
    })

    // Show/hide no results message
    if (this.noResults) {
      this.noResults.style.display = searchTerm && !hasVisibleItems ? 'block' : 'none'
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

    // Initialize search functionality
    const search = new FaqModuleSearch(el)
    search.init()
  })
})
