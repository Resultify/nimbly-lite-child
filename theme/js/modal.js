let escapeKeyListener = null

// Feature-detect native `inert` support (preferred). If unavailable we fall back to tabindex manipulation.
let inertSupported = (typeof HTMLElement !== 'undefined' && 'inert' in HTMLElement.prototype)

const FOCUSABLE_SELECTOR =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'

// Normalize size inputs for CSS variables. Accepts numeric values ("60" or 60)
// and explicit percent strings ("60%"). Returns a percent string (e.g. "60%")
// or null if the input is invalid/empty. The CSS in this project expects %.
function normalizeSize(value) {
  if (value === null || typeof value === 'undefined') return null
  // Allow numbers
  if (typeof value === 'number') return `${value}%`

  const s = String(value).trim()
  if (!s) return null

  // If purely numeric, treat as percentage
  if (/^\d+(?:\.\d+)?$/.test(s)) return `${s}%`

  // Allow explicit percent strings only
  if (/^\d+(?:\.\d+)?%$/.test(s)) return s

  return null
}

// Make all non-modal page elements unreachable (either via `inert` or by setting tabindex="-1").
function makePageInert(modal) {
  const all = Array.from(document.body.children)
  all.forEach(el => {
    if (el === modal) return
    if (modal.contains(el)) return

    if (inertSupported && 'inert' in el) {
      if (el.hasAttribute('aria-hidden')) {
        el.dataset.savedAria = el.getAttribute('aria-hidden')
      } else {
        el.dataset.savedAria = 'null'
      }

      try {
        el.inert = true
        el.setAttribute('aria-hidden', 'true')
      } catch (err) {
        // If setting inert fails, fallback to removing from tab order.
        if (el.hasAttribute('tabindex')) {
          el.dataset.savedTabindex = el.getAttribute('tabindex')
        } else {
          el.dataset.savedTabindex = 'none'
        }
        el.setAttribute('tabindex', '-1')
      }
    } else {
      // No inert support — use tabindex fallback and remember previous value.
      if (el.hasAttribute('tabindex')) {
        el.dataset.savedTabindex = el.getAttribute('tabindex')
      } else {
        el.dataset.savedTabindex = 'none'
      }
      el.setAttribute('tabindex', '-1')
    }
  });
}

// Restore page elements to their previous interactive state.
function restorePage(modal) {
  const all = Array.from(document.body.children)
  all.forEach(el => {
    if (el === modal) return
    if (modal.contains(el)) return

    if (inertSupported && 'inert' in el) {
      try {
        el.inert = false
      } catch (err) {
        // ignore
      }

      const savedAria = el.dataset.savedAria
      if (typeof savedAria === 'undefined') return
      if (savedAria === 'null') {
        el.removeAttribute('aria-hidden')
      } else {
        el.setAttribute('aria-hidden', savedAria)
      }
      delete el.dataset.savedAria
      return
    }

    const saved = el.dataset.savedTabindex
    if (typeof saved === 'undefined') return
    if (saved === 'none') {
      el.removeAttribute('tabindex')
    } else {
      el.setAttribute('tabindex', saved)
    }
    delete el.dataset.savedTabindex
  })
}

// Close the modal, clean up listeners, and restore page state + focus.
function closeModal(modal) {
  if (modal && modal.dataset && modal.dataset.closing === 'true') return
  if (modal && modal.dataset) modal.dataset.closing = 'true'
  const modalBody = modal.querySelector('.modal-body')

  // Close native dialog when available
  if (modal instanceof HTMLDialogElement && typeof modal.close === 'function') {
    try { modal.close() } catch (err) { /* ignore */ }
  } else {
    // visual fallback (not expected for supported browsers)
    modal.style.display = 'none'
  }

  modalBody.innerHTML = ''
  document.body.style.overflow = ''

  if (escapeKeyListener) {
    document.removeEventListener('keydown', escapeKeyListener)
    escapeKeyListener = null
  }

  if (modal.trapListener) {
    document.removeEventListener('keydown', modal.trapListener)
    modal.trapListener = null
  }

  restorePage(modal)

  // Restore focus to the element that opened the modal (if available).
  if (modal.lastTrigger && typeof modal.lastTrigger.focus === 'function') {
    modal.lastTrigger.focus()
    modal.lastTrigger = null
  }

  // Clear per-open CSS variable to avoid leakage between opens.
  if (modal && modal.querySelector) {
    const mc = modal.querySelector('.modal-content')
    if (mc && mc.style) {
      mc.style.removeProperty('--modal-content-bg')
      mc.style.removeProperty('--modal-base-width')
      mc.style.removeProperty('--modal-base-height')
      mc.style.removeProperty('--modal-close-color')
      mc.style.removeProperty('--modal-close-hover-color')
    }
  }

  // Remove the modal element from the DOM to ensure a clean state for next open.
  try {
    if (modal.parentNode) modal.parentNode.removeChild(modal)
  } catch (err) {
    // ignore
  }
}

// Create modal DOM lazily and wire close handlers (click on backdrop and close button).
function createModal() {
  const modal = document.createElement('dialog')
  modal.id = 'modal'
  modal.className = 'modal'
  modal.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true" aria-label="Modal">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <div class="modal-body"></div>
    </div>
  `

  document.body.appendChild(modal)
  // Prevent clicks inside the content from bubbling to the dialog backdrop.
  const modalContentEl = modal.querySelector('.modal-content')
  if (modalContentEl) {
    modalContentEl.addEventListener('click', (e) => e.stopPropagation())
  }

  const closeButton = modal.querySelector('.modal-close')
  closeButton.addEventListener('click', (e) => {
    e.stopPropagation()
    try { modal.close() } catch (err) { /* ignore */ }
    closeModal(modal)
  })

  // Clicking backdrop closes
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      try { modal.close() } catch (err) { /* ignore */ }
      closeModal(modal)
    }
  })

  // Escape key triggers 'cancel' on native dialogs
  modal.addEventListener('cancel', (e) => {
    e.preventDefault()
    try { modal.close() } catch (err) { /* ignore */ }
    closeModal(modal)
  })

  return modal
}

// Open and configure the modal: set size/colors, inject iframe, trap focus and prevent body scroll.
function openModal(modal, url, options = {}) {
  const { modalWidth, modalHeight, modalCloseColor, modalCloseHoverColor, contentBackground } = options
  const modalBody = modal.querySelector('.modal-body')
  const modalContent = modal.querySelector('.modal-content')

  // If the modal element is being reused, ensure any previous 'closing' marker is cleared.
  if (modal && modal.dataset && modal.dataset.closing) {
    try { delete modal.dataset.closing } catch (err) { modal.dataset.closing = 'false' }
  }

  // If a size is provided, normalize and set the var; otherwise remove it so CSS fallback applies.
  const normWidth = normalizeSize(modalWidth)
  if (normWidth) {
    modalContent.style.setProperty('--modal-base-width', normWidth)
  } else {
    modalContent.style.removeProperty('--modal-base-width')
  }

  const normHeight = normalizeSize(modalHeight)
  if (normHeight) {
    modalContent.style.setProperty('--modal-base-height', normHeight)
  } else {
    modalContent.style.removeProperty('--modal-base-height')
  }

  if (modalCloseColor) {
    modalContent.style.setProperty('--modal-close-color', modalCloseColor)
  }

  if (modalCloseHoverColor) {
    modalContent.style.setProperty('--modal-close-hover-color', modalCloseHoverColor)
  }

  if (modalContent && contentBackground) {
    modalContent.style.setProperty('--modal-content-bg', contentBackground)
  }

  if (url) {
    modalBody.innerHTML = ''
    const iframe = document.createElement('iframe')
    iframe.src = url
    iframe.title = 'Modal content'
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    iframe.loading = 'lazy'
    modalBody.appendChild(iframe)
  }

  if (options && options.trigger) modal.lastTrigger = options.trigger

  makePageInert(modal)

  // Get visible focusable elements inside the modal for the trap.
  const getFocusable = () => Array.from(modal.querySelectorAll(FOCUSABLE_SELECTOR)).filter(el => (
    el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length
  ))

  if (modal.trapListener) document.removeEventListener('keydown', modal.trapListener)

  // Simple keyboard focus trap (Tab / Shift+Tab)
  modal.trapListener = function (e) {
    const isTab = (e.key === 'Tab' || e.keyCode === 9)
    if (!isTab) return

    // for native dialog check modal.open, otherwise fallback to display flag
    const isOpen = (modal instanceof HTMLDialogElement) ? !!modal.open : modal.style.display === 'flex'
    if (!isOpen) return

    const focusable = getFocusable()
    if (!focusable.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement

    if (e.shiftKey) {
      if (active === first || active === modal) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (active === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  document.addEventListener('keydown', modal.trapListener)

  // Focus close button initially to provide a known starting point in the modal.
  const closeBtn = modal.querySelector('.modal-close')
  if (closeBtn) closeBtn.focus()

  if (escapeKeyListener) document.removeEventListener('keydown', escapeKeyListener)

  // Close on Escape key (extra safety for environments without dialog cancel)
  escapeKeyListener = (e) => {
    const isOpen = (modal instanceof HTMLDialogElement) ? !!modal.open : modal.style.display === 'flex'
    if (e.key === 'Escape' && isOpen) closeModal(modal)
  }
  document.addEventListener('keydown', escapeKeyListener)

  // Prevent background scroll while modal is open.
  document.body.style.overflow = 'hidden'

  // open native dialog
  if (modal instanceof HTMLDialogElement && typeof modal.showModal === 'function') {
    try { modal.showModal() } catch (err) { modal.style.display = 'flex' }
  } else {
    // visual fallback (not expected)
    modal.style.display = 'flex'
  }
}

// Wire up triggers: read per-trigger CSS custom properties (if present) to configure the modal.
document.querySelectorAll('.modal-trigger').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault()
    const modal = document.getElementById('modal') || createModal()
    const url = trigger.getAttribute('data-modal-url')

    let contentBackground = null
    let modalWidth = null
    let modalHeight = null
    let modalCloseColor = null
    let modalCloseHoverColor = null

    if (typeof getComputedStyle === 'function' && trigger instanceof Element) {
      const cs = getComputedStyle(trigger)
      contentBackground = (cs.getPropertyValue('--modal-content-bg') || '').trim() || null
      modalWidth = (cs.getPropertyValue('--modal-width') || '').trim() || null
      modalHeight = (cs.getPropertyValue('--modal-height') || '').trim() || null
      modalCloseColor = (cs.getPropertyValue('--modal-close-color') || '').trim() || null
      modalCloseHoverColor = (cs.getPropertyValue('--modal-close-hover-color') || '').trim() || null
    }

    openModal(modal, url, {
      modalWidth,
      modalHeight,
      modalCloseColor,
      modalCloseHoverColor,
      contentBackground,
      trigger
    })
  })
})
