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
  breakpoints: {
    0: {
      spaceBetween: 16,
      slidesPerView: 'auto'
    },
    484: {
      spaceBetween: 24,
      slidesPerView: 2
    },
    1280: {
      centeredSlides: true,
      spaceBetween: 36,
      slidesPerView: 'auto'
    }
  }
}

Object.assign(processEl, paramsProcess)
processEl.initialize()



function toggleAccordeon(el) {
  const elHeight = el.offsetHeight
  const elDescHeight = el.children[1].children[0].offsetHeight
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


document.querySelectorAll('.accordeon-body').forEach((e) => { e.style.height = e.children[0].offsetHeight + (window.innerWidth < 1280) + (window.innerWidth < 484) + 'px' })



document.querySelector('#file').addEventListener('change', () => {
  if (document.querySelector('#file').files) {
    document.querySelector('.file-icon img').style.backgroundColor = 'var(--main-color)'
  }
})

document.querySelector('.menu-trigger').addEventListener('click', () => {
  const wrapper = document.querySelector('.slide-menu-wrapper')
  wrapper.classList.toggle('active')
  if (wrapper.classList.contains('active')) {
    document.querySelector('.menu-trigger img').setAttribute('src', 'images/big_cross.svg')
  } else {
    document.querySelector('.menu-trigger img').setAttribute('src', 'images/burger.svg')
  }
})

document.querySelector('.slide-menu .menu-items').addEventListener('click', () => {
  document.querySelector('.slide-menu-wrapper').classList.remove('active')
  document.querySelector('.menu-trigger img').setAttribute('src', 'images/burger.svg')
})

document.querySelector('.main-nav.mobile .logo').addEventListener('click', () => {
  document.querySelector('.slide-menu-wrapper').classList.remove('active')
  document.querySelector('.menu-trigger img').setAttribute('src', 'images/burger.svg')
})