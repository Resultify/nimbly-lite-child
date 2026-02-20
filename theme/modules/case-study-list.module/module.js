// Case Study List Module JavaScript - Industry Filter

document.addEventListener('DOMContentLoaded', function () {
  const filterDropdown = document.getElementById('case-study-industry-filter')
  const caseStudyItems = document.querySelectorAll('.case-study-list__item')

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

  // If filter dropdown exists, add filtering functionality
  if (filterDropdown) {
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

    // Listen for dropdown change
    filterDropdown.addEventListener('change', function () {
      const selectedIndustry = this.value
      filterCaseStudies(selectedIndustry)
    })
  }
})
