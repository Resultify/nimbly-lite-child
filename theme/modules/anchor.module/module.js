function getElementsWithId (id) {
  // Use an attribute selector to find every match without CSS identifier escaping
  return document.querySelectorAll('[id="' + id.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"]')
}

function checkDuplicateAnchorIds () {
  document.querySelectorAll('.anchor-module--editor[id]').forEach(function (el) {
    const id = el.id
    if (!id) return

    const matches = getElementsWithId(id)
    const isDuplicate = matches.length > 1
    const label = el.querySelector('.anchor-module__label')

    el.classList.toggle('anchor-module--duplicate', isDuplicate)

    if (label) {
      const labelText = isDuplicate
        ? 'Anchor: #' + id + ' — already used on this page (' + matches.length + ')'
        : 'Anchor: #' + id
      if (label.textContent !== labelText) label.textContent = labelText
    }
  })
}

function initAnchorDuplicateCheck () {
  if (window.__anchorDuplicateCheckInit) return
  if (!document.querySelector('.anchor-module--editor')) return

  window.__anchorDuplicateCheckInit = true
  checkDuplicateAnchorIds()

  let timeout
  const observer = new MutationObserver(function () {
    clearTimeout(timeout)
    timeout = setTimeout(checkDuplicateAnchorIds, 200)
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['id']
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnchorDuplicateCheck)
} else {
  initAnchorDuplicateCheck()
}
