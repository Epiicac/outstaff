swiperEl = document.querySelector('.slider-banner-content')




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

setTimeout(() => {
  document.querySelectorAll('.accordeon-body').forEach((e) => { e.style.height = e.children[0].offsetHeight + 'px' })
}, 10)

function updateFiles() {
  filelist = '<div class="selected-files">'
  Array.from(document.querySelector('#file').files).forEach((file, index) => {
    filename = file.name > 21 ? file.name.substr(0, 21) : file.name
    filelist += `<span class="selected-file">${filename}<img class="remove-file" data-id="${index}" src="./images/filecross.svg"></span>`
  })
  document.querySelector('.file-desc').innerHTML = filelist + '</div>'
  
  document.querySelectorAll('.remove-file').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      removeFileFromFileList(Number(el.getAttribute('data-id')))
    })
  })
}

document.querySelector('#file').addEventListener('change', updateFiles)

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

document.querySelector('.slide-menu-wrapper .header-button').addEventListener('click', () => {
  document.querySelector('.slide-menu-wrapper').classList.toggle('active')
  document.querySelector('.menu-trigger img').setAttribute('src', 'images/burger.svg')
})


function removeFileFromFileList(index) {
  const dt = new DataTransfer()
  const input = document.querySelector('#file')
  const { files } = input
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (index !== i)
      dt.items.add(file)
  }
  
  updateFiles()
  input.files = dt.files
}

document.querySelector('.close-popup').addEventListener('click', () => {
  document.querySelector('.sendmail-popup-wrapper').classList.toggle('hidden')
})