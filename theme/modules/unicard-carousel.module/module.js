// init carousel
function runCarousel () {
  const carouselItems = document.getElementsByClassName('splide-carousel')
  if (!carouselItems) return
  for (let i = 0; i < carouselItems.length; i++) {
    new window.libSplide(carouselItems[i]).mount({ Intersection: window.libSplideIntersection}) // eslint-disable-line
  }
}

// init auto scroll carousel
function runAutoScrollCarousel () {
  const carouselItems = document.getElementsByClassName('splide-auto-scroll')
  if (!carouselItems) return
  for (let i = 0; i < carouselItems.length; i++) {
    new window.libSplide(carouselItems[i]).mount({ AutoScroll: window.libSplideAutoScroll, Intersection: window.libSplideIntersection}) // eslint-disable-line
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runAutoScrollCarousel)
  document.addEventListener('DOMContentLoaded', runCarousel)
} else {
  runAutoScrollCarousel()
  runCarousel()
}
