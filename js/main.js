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
  centeredSlides: true,
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



function toggleAccordeon(el) {
  const elHeight = el.offsetHeight
  const elDescHeight = el.children[1].children[0].offsetHeight + el.children[1].children[1].offsetHeight
  if (el.children[0].offsetHeight === el.offsetHeight) {
    el.style.height = elHeight + elDescHeight + 'px'
    el.style.backgroundColor = '#1A1A1A'
    el.children[0].children[0].style.rotate = '180deg'
  } else {
    el.style.height = el.children[0].offsetHeight + 'px'
    el.style.backgroundColor = '#000000'
    el.children[0].children[0].style.rotate = '0deg'
  }
}

document.querySelectorAll('.accordeon-body').forEach((e) => { e.style.height = e.offsetHeight + 'px' })



document.querySelector('#file').addEventListener('change', () => {
  if (document.querySelector('#file').files) {
    document.querySelector('.file-icon img').style.backgroundColor = 'var(--main-color)'
  }
})