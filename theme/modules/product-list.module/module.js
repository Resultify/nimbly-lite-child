function addListener () {
  const selector = window.document.querySelector('#qd_sorting')

  if (selector) {
    selector.addEventListener('change', (event) => {
      changeSorting(event)
    })
  }
}

function changeSorting (event) {
  const value = event.target.value
  if (value) {
    window.location.href = value
  }
}

function addEventListenerToFilters () {
  document.addEventListener('DOMContentLoaded', function () {
    function buildQueryString () {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const params = {}
      for (const [key, value] of urlParams.entries()) {
        params[key] = value
      }
      let queryStringMerged = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&')

      if (queryStringMerged) {
        queryStringMerged = '&' + queryStringMerged
      }

      return queryStringMerged
    }

    function appendToLinks (selector, queryString, excludeParams = []) {
      const container = document.querySelector(selector)
      const selects = container.getElementsByTagName('select')

      const urlParams = new URLSearchParams(queryString)
      excludeParams.forEach(param => urlParams.delete(param))
      const filteredQueryString = urlParams.toString() ? '&' + urlParams.toString() : ''

      for (let i = 0; i < selects.length; i++) {
        const options = selects[i].getElementsByTagName('option')
        for (let j = 0; j < options.length; j++) {
          const currentHref = options[j].getAttribute('value')
          if (currentHref.includes('?')) {
            options[j].setAttribute('value', currentHref + filteredQueryString)
          } else {
            options[j].setAttribute('value', currentHref + '?' + filteredQueryString.substring(1))
          }
        }
      }
    }

    const queryString = buildQueryString()
    appendToLinks('.product-listing-module__sorting-filter', queryString, ['qd_sorting'])
  })
}

function init () {
  addListener()
  addEventListenerToFilters()
}

init()
