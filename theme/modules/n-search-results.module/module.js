/**
 * URL query parameters are passed through to the HubSpot content search API.
 *
 * q=<search term> term to be searched for
 *
 * Content type to search can be specified with the following types.
 * type=SITE_PAGE, LANDING_PAGE, BLOG_POST, LISTING_PAGE, and KNOWLEDGE_ARTICLE
 * Multiple content types can be searched by additional "type" query params.
 * ex. type=BLOG_POST&type=LISTING_PAGE
 *
 * offset=<offset> beginning offset of the result set
 * limit=<limit> page size
 *
 * See: https://developers.hubspot.com/docs/api/cms/site-search
 *
 */
const SEARCH_URL_BASE = '/_hcms/v3/site-search/search'
const SURROUNDING_PAGE_NUMBERS = 2 // how many page numbers to attempt to surround the current page with.

/**
 * Given a page offset and a page path, returns a URL with the offset as a query parameter.
 * @param {number} pageOffset the offset of the page
 * @param {string} pagePath the path of the page
 * @returns {string} the URL with the offset as a query parameter
 */
const getSearchPageUrl = (pageOffset, pagePath) => {
  const currentPageParams = new URLSearchParams(window.location.search)
  currentPageParams.set('offset', pageOffset)
  return `${pagePath}?${currentPageParams.toString()}`
}

/**
 * Given a total number of results, an offset, and a page size, returns an object full of pagination data for display.
 * @param {number} totalItems the total number of items to be paginated
 * @param {number} currentOffset the current offset of the page
 * @param {number} pageSize the number of items per page
 * @param {object} searchConfig the search configuration object
 * @returns {object} the paginator object with data for rendering pagination
 */

const getPaginator = (totalItems, currentOffset, pageSize, searchConfig) => {
  // default page size is 10
  pageSize = pageSize || 10
  /**
   * Setting up variables
   */
  const maxPageNumbersToDisplay = SURROUNDING_PAGE_NUMBERS * 2 + 1
  const centerPageSlot = Math.ceil(maxPageNumbersToDisplay / 2)
  // calculate total pages of items
  const totalPagesOfItems = Math.ceil(totalItems / pageSize)
  const currentPage = currentOffset / pageSize + 1
  // calculate previous page url based on offset and page size
  const prevPageUrl =
    currentPage > 1 ? getSearchPageUrl(currentOffset - pageSize, searchConfig.pagePath) : ''
  // calculate next page url based on offset and page size
  const nextPageUrl =
    currentPage < totalPagesOfItems
      ? getSearchPageUrl(currentOffset + pageSize, searchConfig.pagePath)
      : ''

  /**
   *  Setting up functions.
   */

  // Page numbers are a rolling window of the current page, and attempt to center the current page in the navigation.
  const calculateBeginAndEndPageNumbers = () => {
    let firstDisplayedPageNumber
    let lastDisplayedPageNumber

    // There are less total pages than the maximum number of pages to display, so we can just display all of them.
    if (totalPagesOfItems <= maxPageNumbersToDisplay) {
      firstDisplayedPageNumber = 1
      lastDisplayedPageNumber = totalPagesOfItems
      return { firstDisplayedPageNumber, lastDisplayedPageNumber }
    }

    // The current page is less than the center page slot, so we start at 1.
    if (currentPage <= centerPageSlot) {
      firstDisplayedPageNumber = 1
      lastDisplayedPageNumber = centerPageSlot + SURROUNDING_PAGE_NUMBERS
      return { firstDisplayedPageNumber, lastDisplayedPageNumber }
    }

    // The current page is one away from the last, so we can end at the total number of pages.
    if (currentPage + 1 >= totalPagesOfItems) {
      firstDisplayedPageNumber = totalPagesOfItems - centerPageSlot
      lastDisplayedPageNumber = totalPagesOfItems
      return { firstDisplayedPageNumber, lastDisplayedPageNumber }
    }

    // The current page is somewhere in the middle, so we calculate to try and keep it in the middle.
    firstDisplayedPageNumber = currentPage - SURROUNDING_PAGE_NUMBERS
    lastDisplayedPageNumber = currentPage + SURROUNDING_PAGE_NUMBERS
    return { firstDisplayedPageNumber, lastDisplayedPageNumber }
  }

  const maybeAddLastPageLink = pages => {
    // if the number of pages is less than the total pages, add an ellipsis, and link to the last page.
    if (
      totalPagesOfItems > currentPage + SURROUNDING_PAGE_NUMBERS &&
      totalPagesOfItems > pages.length
    ) {
      const lastPageOffset = totalPagesOfItems * pageSize - pageSize

      return [
        ...pages,
        { display: '...' },
        {
          display: totalPagesOfItems,
          offset: lastPageOffset,
          url: getSearchPageUrl(lastPageOffset, searchConfig.pagePath)
        }
      ]
    }
    return pages
  }

  const maybeAddFirstPageLink = pages => {
    if (
      currentPage > centerPageSlot &&
      totalPagesOfItems > maxPageNumbersToDisplay
    ) {
      return [
        { display: '1', offset: 0, url: getSearchPageUrl(0, searchConfig.pagePath) },
        { display: '...' },
        ...pages
      ]
    }
    return pages
  }

  /**
   *  Putting variables and functions together to generate the paginator.
   */
  const {
    firstDisplayedPageNumber,
    lastDisplayedPageNumber
  } = calculateBeginAndEndPageNumbers(currentPage)

  const pageNumberSlots = Array(
    lastDisplayedPageNumber - firstDisplayedPageNumber + 1
  ).keys()

  // Fill the page number slots with display data.
  let pages = [...pageNumberSlots].map(i => {
    const pageOffset = (firstDisplayedPageNumber + i - 1) * pageSize
    return {
      display: firstDisplayedPageNumber + i,
      offset: pageOffset,
      url: getSearchPageUrl(pageOffset, searchConfig.pagePath)
    }
  })

  pages = maybeAddLastPageLink(pages)
  pages = maybeAddFirstPageLink(pages)

  const firstPageUrl = getSearchPageUrl(0, searchConfig.pagePath)
  const lastPageUrl = getSearchPageUrl(totalPagesOfItems * pageSize - pageSize, searchConfig.pagePath)

  // return object with all paginator properties required by the view
  return {
    totalItems,
    currentPage,
    prevPageUrl,
    nextPageUrl,
    firstPageUrl,
    lastPageUrl,
    pageSize,
    totalPagesOfItems,
    firstDisplayedPageNumber,
    lastDisplayedPageNumber,
    pages
  }
}

/**
 * Renders the page number links for the search results.
 * @param {array} pages the array of page numbers to render
 * @param {number} currentPage the current page number
 * @param {string} pageAriaLabel the aria label for the page number links
 * @param {string} currentPageAriaLabelVal the aria label for the current page number
 * @returns {string} the rendered page number links
*/
const renderPageNumberLinks = (pages, currentPage, pageAriaLabel, currentPageAriaLabelVal) => {
  return pages
    .map(page => {
      const activeClass =
        currentPage === page.display
          ? 'search-results-pagination-link-active'
          : ''
      const currentPageAriaLabel =
        currentPage === page.display
          ? `${currentPageAriaLabelVal}.` // add a period to the end of the aria label to have screen readers pause.
          : ''
      if (page.url) {
        return `<a class="search-results-pagination-link search-results-pagination-link-number ${activeClass}"
                  aria-label="${currentPageAriaLabel} ${pageAriaLabel} ${page.display}"
                  href="${page.url}">${page.display}</a>`
      }
      return `<span class="search-results-pagination-link search-results-pagination-link-ellipsis">${page.display}</span>`
    })
    .join('')
}

/**
 * Renders the page navigation for the search results.
 * @param {object} paginator the paginator object with data for rendering pagination
 * @param {HTMLElement} searchContainer the search container element
 * @param {object} searchConfig the search configuration object
 * @returns {string} the rendered page navigation
*/
const renderPageNavigation = (paginator, searchContainer, searchConfig) => {
  // firstPageLinkElement
  const firstPageLinkElement = searchContainer.querySelector('.search-results-pagination-link-first')
  if (paginator.currentPage === 1) {
    firstPageLinkElement.classList.add('search-results-link-disabled')
  } else {
    firstPageLinkElement.href = paginator.firstPageUrl ? paginator.firstPageUrl : ''
  }

  // prevPageLinkElement
  const prevPageLinkElement = searchContainer.querySelector('.search-results-pagination-link-prev')
  if (!paginator.prevPageUrl) {
    prevPageLinkElement.classList.add('search-results-link-disabled')
  } else {
    prevPageLinkElement.href = paginator.prevPageUrl
  }

  // nextPageLinkElement
  const nextPageLinkElement = searchContainer.querySelector('.search-results-pagination-link-next')
  if (!paginator.nextPageUrl) {
    nextPageLinkElement.classList.add('search-results-link-disabled')
  } else {
    nextPageLinkElement.href = paginator.nextPageUrl
  }

  // lastPageLinkElement
  const lastPageLinkElement = searchContainer.querySelector('.search-results-pagination-link-last')
  if (paginator.currentPage === paginator.totalPagesOfItems) {
    lastPageLinkElement.classList.add('search-results-link-disabled')
  } else {
    lastPageLinkElement.href = paginator.lastPageUrl
  }

  return `
    ${renderPageNumberLinks(
      paginator.pages,
      paginator.currentPage,
      searchConfig.pageAriaLabel,
      searchConfig.currentPageAriaLabel
    )}
  `
}

/**
 * Renders the individual search result.
 * @param {object} result the search result object
 * @param {number} searchItemTitle the search item title tag
 * @param {string} searchItemTitleStyle the search item title style
 * @returns {string} the rendered search result
 */
const renderIndividualResult = (result, searchItemTitle, searchItemTitleStyle) => {
  return `<li class="search-results-listing-item">
    <div class="search-results-content">
      <h${searchItemTitle} class="heading ${searchItemTitleStyle}"><a class="search-results-link heading-link" href="${result.url}"><span class="search-results-title">${result.title}</span></a></h${searchItemTitle}>
      <p class="search-results-description">${result.description}</p>
    </div>
  </li>
  `
}

/**
 * Renders the empty search results message.
 * @param {object} resultData the search result data
 * @param {HTMLElement} searchContainer the search container element
 * @param {object} searchConfig the search configuration object
 * @returns {string} the rendered empty search results message
 */
const renderEmptyResults = (resultData, searchContainer, searchConfig) => {
  const noResultsMessage = searchConfig.noResultsMessage.replace(
    '[[search_term]]',
    `“${resultData.searchTerm}”`
  )
  searchContainer.innerHTML = `<div class="search-no-results">${noResultsMessage}</div>`
  searchContainer.style.display = 'block'
}

/**
 * Renders the search results.
 * @param {object} resultData the search result data
 * @param {HTMLElement} searchContainer the search container element
 * @param {object} searchConfig the search configuration object
 * @returns {string} the rendered search results
 */
const renderSearchResults = (resultData, searchContainer, searchConfig) => {
  const searchItemTitleTag = parseInt(searchConfig.titleTag.replace('h', ''), 10) + 1
  const searchItemTitleStyle = searchConfig.itemTitleStyle
  const paginator = getPaginator(
    resultData.total,
    resultData.offset,
    resultData.limit,
    searchConfig
  )

  const offsetString = parseInt(resultData.offset, 10) + 1
  const limitString =
    parseInt(resultData.results.length, 10) + parseInt(resultData.offset, 10)
  const totalString = resultData.total

  const results = resultData.results
    .map(result => {
      return renderIndividualResult(result, searchItemTitleTag, searchItemTitleStyle)
    })
    .join('')

  const searchResultsCountMessage = searchContainer.querySelector('.search-results-message')
  const searchResultsListing = searchContainer.querySelector('.search-results-listing')
  const searchResultsPaginationList = searchContainer.querySelector('.search-results-pagination-list')
  const updatedSearchResultsCountMessage = searchResultsCountMessage.textContent
    .replace('[[offset]]', offsetString)
    .replace('[[limit]]', limitString)
    .replace('[[total]]', totalString)

  searchResultsCountMessage.innerHTML = updatedSearchResultsCountMessage
  searchResultsListing.innerHTML = results
  searchResultsPaginationList.innerHTML = renderPageNavigation(paginator, searchContainer, searchConfig)
  searchContainer.style.display = 'block'
}

/**
 * Searches for content based on the search parameters.
 * @param {URLSearchParams} searchParams the search parameters
 * @param {HTMLElement} searchContainer the search container element
 * @param {object} searchConfig the search configuration object
 */
const search = (searchParams, searchContainer, searchConfig) => {
  let searchUrl = `${SEARCH_URL_BASE}?${searchParams.toString()}`
  const request = new XMLHttpRequest() // eslint-disable-line no-undef
  searchUrl = `${searchUrl}&limit=${searchConfig.limit}`

  request.open('GET', searchUrl, true)

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const resultData = JSON.parse(request.responseText)
      if (resultData.results.length > 0) {
        renderSearchResults(resultData, searchContainer, searchConfig)
      } else {
        renderEmptyResults(resultData, searchContainer, searchConfig)
      }
    } else {
      console.error('Server reached, error retrieving results.')
    }
  }
  request.onerror = function () {
    console.error('Could not reach the server.')
  }
  request.send()
}

/**
 * Renders the search results.
 */
function renderSearch () {
  const searchResultsItems = document.getElementsByClassName('search-results-wrp')
  if (!searchResultsItems) return

  const currentSearchParams = new URLSearchParams(window.location.search)
  if (currentSearchParams.has('term')) {
    currentSearchParams.set('q', currentSearchParams.get('term'))
    currentSearchParams.delete('term')
  }

  for (const searchResultsItem of searchResultsItems) {
    const searchResultsContainer = searchResultsItem.querySelector('.search-results')
    if (!searchResultsContainer) return
    if (currentSearchParams.get('q')?.length) {
      search(currentSearchParams, searchResultsContainer, searchResultsItem.dataset)
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderSearch)
} else {
  renderSearch()
}
