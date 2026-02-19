// Case Study List Module JavaScript - Industry Filter

document.addEventListener('DOMContentLoaded', function() {
  const filterDropdown = document.getElementById('case-study-industry-filter');
  
  if (!filterDropdown) return;
  
  const caseStudyItems = document.querySelectorAll('.case-study-list__item');
  
  // Filter function
  function filterCaseStudies(selectedIndustry) {
    caseStudyItems.forEach(function(item) {
      const itemIndustry = item.getAttribute('data-industry');
      
      if (selectedIndustry === 'all' || itemIndustry === selectedIndustry) {
        // Show the item
        item.classList.remove('case-study-list__item--hidden');
        item.style.display = '';
      } else {
        // Hide the item
        item.classList.add('case-study-list__item--hidden');
        item.style.display = 'none';
      }
    });
  }
  
  // Listen for dropdown change
  filterDropdown.addEventListener('change', function() {
    const selectedIndustry = this.value;
    filterCaseStudies(selectedIndustry);
  });
});

