// Case Study List Module JavaScript - Industry Filter

document.addEventListener('DOMContentLoaded', function () {
  const filterDropdown = document.getElementById('case-study-industry-filter')
  const filterButtons = document.querySelectorAll('.case-study-list__filter-btn')
  const caseStudyItems = document.querySelectorAll('.case-study-list__item')

  // Configuration - read from data attributes or module config
  // These will be set by the template if using button list
  let inactiveButtonStyle = ''
  let activeButtonStyle = ''

  // Extract button styles from existing buttons if available
  if (filterButtons.length > 0) {
    const firstButton = filterButtons[0]
    // Get all button classes and extract the style classes
    const classes = Array.from(firstButton.classList)
    // Find the style classes (btn-primary, btn-secondary1, etc.)
    activeButtonStyle = classes.find(c => c.match(/btn-(primary|secondary\d)/)) || 'btn-primary'
    // Find the alternate by checking the data attribute or template values
    // For now, we'll determine it from the button state
  }

  // If we have buttons, extract the styles from HTML data attributes or current state
  if (filterButtons.length > 0) {
    // The active button is the "all" button initially
    const allButton = filterButtons[0]
    // Get style classes (excluding btn-link, btn-regular)
    const allClasses = Array.from(allButton.classList)
    activeButtonStyle = allClasses.find(c => c.match(/btn-(primary|secondary\d)/)) || 'btn-primary'

    // Get inactive style from second button
    if (filterButtons.length > 1) {
      const secondButton = filterButtons[1]
      const secondClasses = Array.from(secondButton.classList)
      inactiveButtonStyle = secondClasses.find(c => c.match(/btn-(primary|secondary\d)/)) || 'btn-secondary1'
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
          } else {
            btn.classList.add(inactiveButtonStyle)
          }
        })

        // Filter case studies
        filterCaseStudies(selectedIndustry)
      })
    })
  }
})
