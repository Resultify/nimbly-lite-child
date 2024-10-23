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

function init () {
  addListener()
}

init()
