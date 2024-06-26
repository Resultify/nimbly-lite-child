function runImageSwiper () {
  // global Swiper options
  const options = {
    modules: [window.libSwiperNavigation, window.libSwiperPagination, window.libSwiperA11y, window.libSwiperKeyboard, window.libSwiperAutoplay],
    cssMode: true,
    // lazy: true,
    // init: false,
    loop: false,
    // Pagination dots
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    slidesOffsetAfter: 20,
    slidesOffsetBefore: 20,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    // Keyboard navigation
    // keyboard: {
    //   enabled: true,
    //   onlyInViewport: true
    // },
    // autoplay: {
    //   delay: 5000
    // },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        // slidesPerGroup: 1,
        spaceBetween: 12
      },
      // when window width is >= 650px
      650: {
        slidesPerView: 2,
        // slidesPerGroup: 2,
        spaceBetween: 24
      },
      // when window width is >= 1100px
      1100: {
        slidesPerView: 3,
        slidesPerGroup: 2,
        spaceBetween: 0
        // slidesOffsetAfter: 20,
        // slidesOffsetBefore: 20
      },
      // when window width is >= 1400px
      1400: {
        slidesPerView: 3,
        slidesPerGroup: 2,
        spaceBetween: 0,
        slidesOffsetAfter: 20,
        slidesOffsetBefore: 20
      }
    }
  }

  // find all image sliders
  const imageSlider = document.getElementsByClassName('unicard-carousel-swiper')
  if (!imageSlider) return
  for (const item of imageSlider) {
    // const itemOptions = { ...options }

    // check if autoplay is enabled
    // const autoplayDelay = item.dataset.delay
    // if (autoplayDelay > 0) {
    //   itemOptions.loop = true
    //   itemOptions.autoplay = {
    //     delay: autoplayDelay * 1000
    //   }
    // }

    // init swiper
    const swiper = new window.libSwiper(item, options) // eslint-disable-line
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runImageSwiper)
} else {
  runImageSwiper()
}
