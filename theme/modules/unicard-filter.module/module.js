// run isotope plugin
function runIsotope () {
  const cardModulesWithFilter = document.getElementsByClassName('unicard-filter')
  if (!cardModulesWithFilter) return
  let initHashFilter = true
  for (const cardModule of cardModulesWithFilter) {
    const cardModuleItems = cardModule.querySelector('.unicard-filter-cards-wrp')
    if (!cardModuleItems) return

    // get filter value from hash
    function getHashFilter () {
      const urlHash = decodeURI(window.location.hash)
      const matches = urlHash.match(/filter=([^&]+)/i)
      const hashFilter = matches && matches[1]
      return hashFilter && decodeURIComponent(hashFilter)
    }

    // update button state
    function updateBtnState (btns) {
      filterBtns.querySelectorAll('button').forEach((btn) => {
        const filterValue = btn.getAttribute('data-filter')
        const isBtnActive = filterValue === getHashFilter()
        if (isBtnActive) {
          btn.classList.add('active')
        } else {
          btn.classList.remove('active')
        }
      })
    }

    // init isotope
    const iso = new Isotope(cardModuleItems, { // eslint-disable-line
      itemSelector: '.iso-item',
      percentPosition: true,
      masonry: {
        gutter: '.iso-gutter-sizer',
        columnWidth: '.unicard'
      }
    })

    const filterBtns = cardModule.querySelector('.real-btn-group-wrp-macro')

    // filter items on button click
    if (filterBtns) {
      filterBtns.addEventListener('click', (event) => {
        const clickTarget = event.target
        if (clickTarget.matches('button')) {
          const isBtnActive = clickTarget.matches('.active')
          if (isBtnActive) {
            iso.arrange({ filter: '*' })
            // remove hash including '#' from url
            window.location.hash = 'filter=*'
            updateBtnState(filterBtns)
          } else {
            const filterValue = clickTarget.getAttribute('data-filter')
            iso.arrange({ filter: `.${filterValue}` })
            window.location.hash = `filter=${encodeURIComponent(filterValue)}`
            updateBtnState(filterBtns)
          }
        }
      }, false)
    }

    // filter items on site load (only first module!!!)
    if (initHashFilter) {
      const hashFilter = getHashFilter()
      filterBtns.querySelectorAll('button').forEach((btn) => {
        const filterValue = btn.getAttribute('data-filter')
        const isBtnActive = filterValue === hashFilter
        if (isBtnActive) {
          btn.classList.add('active')
          iso.arrange({ filter: `.${hashFilter}` })
          initHashFilter = false
        }
      })
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runIsotope)
} else {
  runIsotope()
}
