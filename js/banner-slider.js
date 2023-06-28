swiperEl = document.querySelector('.slider-banner-content')

const params = {
  pagination: {
    el: '.banner-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    }
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
}

Object.assign(swiperEl, params)
swiperEl.initialize()



processEl = document.querySelector('.process-slider')

const paramsProcess = {
  shouldPreventDefault: true,
  navigation: {
    prevEl: '#prevProcess',
    nextEl: '#nextProcess'
  },
  slideToClickedSlide: true,
  slidesPerView: 'auto',
  breakpoints: {
    1280: {
      spaceBetween: 36
    }
  }
}

Object.assign(processEl, paramsProcess)
processEl.initialize()