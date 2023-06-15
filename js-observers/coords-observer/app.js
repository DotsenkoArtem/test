const sections = document.querySelectorAll('.section')
sections.forEach(section => {
  section.style.backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`



  let heading = section.querySelector('.section__heading')
  let text = section.querySelector('.section__content')
  // УСТАНОВКА ЦВЕТА ТЕКСТА В ЗАВИСИМОСТИ ОТ ФОНА С ИСПОЛЬЗОВАНИЕМ БИБЛИОТЕКИ CHROMA.JS
  if(chroma(section.style.backgroundColor).luminance() > .5){
    heading.style.color = `#000`
    text.style.color = `#000`
  } else {
    heading.style.color = `#fff`
    text.style.color = `#fff`
  }
})


let scrollDirection = 0;
let startY = window.pageYOffset;
let currentY = 0;

let elemThreshold = .5

function getScrollDirection() {
  currentY = window.pageYOffset;
  scrollDirection = startY - currentY;
  startY = currentY;
}

window.addEventListener('scroll', getScrollDirection)
sections.forEach(section => {
  observe(section)
})



function observe(elem) {
  window.addEventListener('load', function(){
    if (
      (elem.getBoundingClientRect().top <=
        document.documentElement.clientHeight - elem.clientHeight * elemThreshold &&
        elem.getBoundingClientRect().bottom >
          document.documentElement.clientHeight - elem.clientHeight * elemThreshold) ||
      (elem.getBoundingClientRect().bottom >= elem.clientHeight * elemThreshold &&
      elem.getBoundingClientRect().top < elem.clientHeight * elemThreshold)
    ) {
      elem.classList.add('fadeIn')
    }
  })


  window.addEventListener('scroll', watch)

  function watch() {
    
    if (
      (elem.getBoundingClientRect().top <=
        document.documentElement.clientHeight - elem.clientHeight * elemThreshold &&
        elem.getBoundingClientRect().bottom >
          document.documentElement.clientHeight - elem.clientHeight * elemThreshold &&
        scrollDirection < 0) ||
      (elem.getBoundingClientRect().bottom >= elem.clientHeight * elemThreshold &&
      elem.getBoundingClientRect().top < elem.clientHeight * elemThreshold &&
        scrollDirection > 0)
    ) {
      elem.classList.add('fadeIn')
    }
    
    if(elem.classList.contains('fadeIn')) {
      window.removeEventListener('scroll', watch)
    }
  }
}

