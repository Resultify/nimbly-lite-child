// Case Study List Module JavaScript - Industry Filter
// Scoped to support multiple modules on the same page

document.addEventListener('DOMContentLoaded', function () {
  // Find all case study list module instances on the page
  const moduleInstances = document.querySelectorAll('.case-study-list-module')

  // Initialize each module independently
  moduleInstances.forEach(function (moduleContainer) {
    initializeModule(moduleContainer)
  })

  function initializeModule (moduleContainer) {
    // Scope all selectors to this specific module container
    const filterDropdown = moduleContainer.querySelector('.case-study-list__filter-dropdown')
    const filterButtons = moduleContainer.querySelectorAll('.case-study-list__filter-btn')
    const caseStudyItems = moduleContainer.querySelectorAll('.case-study-list__item')

    // Skip if no items to filter
    if (caseStudyItems.length === 0) {
      return
    }

    // Configuration - read from data attributes or module config
    // These will be set by the template if using button list
    let inactiveButtonStyle = ''
    let activeButtonStyle = ''

    // Extract button styles from existing buttons
    if (filterButtons.length > 0) {
      // The active button is the "all" button (first button)
      const activeButton = filterButtons[0]
      const activeClasses = Array.from(activeButton.classList)
      activeButtonStyle = activeClasses.find(c => c.match(/btn-(primary|secondary\d)/)) || 'btn-primary'

      // Get inactive style from second button if available
      if (filterButtons.length > 1) {
        const inactiveButton = filterButtons[1]
        const inactiveClasses = Array.from(inactiveButton.classList)
        inactiveButtonStyle = inactiveClasses.find(c => c.match(/btn-(primary|secondary\d)/)) || 'btn-secondary1'
      }
    }

    // Function to set first-visible class
    function setFirstVisibleClass () {
      let firstVisibleItem = null

      caseStudyItems.forEach(function (item) {
        // Remove first-visible class from all items
        item.classList.remove('first-visible')

        // Track the first visible item
        if (!firstVisibleItem && !item.classList.contains('case-study-list__item--hidden')) {
          firstVisibleItem = item
        }
      })

      // Add first-visible class to the first visible item
      if (firstVisibleItem) {
        firstVisibleItem.classList.add('first-visible')
      }
    }

    // Initialize first-visible class on page load
    setFirstVisibleClass()

    // Filter function
    function filterCaseStudies (selectedIndustry) {
      caseStudyItems.forEach(function (item) {
        const itemIndustry = item.getAttribute('data-industry')

        if (selectedIndustry === 'all' || itemIndustry === selectedIndustry) {
          // Show the item
          item.classList.remove('case-study-list__item--hidden')
        } else {
          // Hide the item
          item.classList.add('case-study-list__item--hidden')
        }
      })

      // Update first-visible class after filtering
      setFirstVisibleClass()
    }

    // If filter dropdown exists, add filtering functionality
    if (filterDropdown) {
      // Listen for dropdown change
      filterDropdown.addEventListener('change', function () {
        const selectedIndustry = this.value
        filterCaseStudies(selectedIndustry)
      })
    }

    // If filter buttons exist, add filtering functionality
    if (filterButtons.length > 0) {
      // Initialize: mark the first button (all) as active
      filterButtons[0].classList.add('is-active')

      filterButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          e.preventDefault()
          const selectedIndustry = this.getAttribute('data-filter')

          // Update button styles
          filterButtons.forEach(function (btn) {
            // Remove both style classes
            btn.classList.remove(activeButtonStyle, inactiveButtonStyle)

            // Add appropriate style based on selection
            if (btn.getAttribute('data-filter') === selectedIndustry) {
              btn.classList.add(activeButtonStyle)
              btn.classList.add('is-active')
            } else {
              btn.classList.add(inactiveButtonStyle)
              btn.classList.remove('is-active')
            }
          })

          // Filter case studies
          filterCaseStudies(selectedIndustry)
        })
      })
    }
  }
})
