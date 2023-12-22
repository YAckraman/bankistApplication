'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const morebtn = document.querySelector('.btn--scroll-to');
const scrto = document.querySelector('#section--1');
morebtn.addEventListener('click', function (e) {
  const dimensions = scrto.getBoundingClientRect();
  console.log(dimensions);
  //to print the scroll dimensions
  console.log(window.pageXOffset, pageYOffset);
  //to the dimensions of viewport
  console.log(
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // window.scrollTo({
  //   left: scrto.left + window.pageXOffset,
  //   top: scrto.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  scrto.scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
const optionsContainer = document.querySelector('.operations__tab-container');
const optionBtn = document.querySelectorAll('.operations__tab');
const operationContent = document.querySelectorAll('.operations__content');
optionsContainer.addEventListener('click', function (e) {
  const target = e.target;
  const clicked = target.closest('.operations__tab');
  if (!clicked) return;
  //add active button to active class

  optionBtn.forEach(e => e.classList.remove('operation__tab--active'));
  operationContent.forEach(e =>
    e.classList.remove('operations__content--active')
  );
  clicked.classList.add('operation__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');

  console.log(clicked.dataset.tab);
});

//the shadow of the navbar
//use dry principle of not repeat yourself
const addHandler = function (e) {
  const opacity = this;
  if (e.target.classList.contains('nav__link')) {
    const target = e.target;
    // console.log(target);
    const siblings = target.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(function (ele) {
      if (ele !== target) {
        ele.style.opacity = opacity;
      }
    });
    const logo = target.closest('.nav').querySelector('img');
    logo.style.opacity = opacity;
  }
};
/////////////////////////////////////
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', addHandler.bind(0.5));
//////////////when we undoo the hover on the link============================
nav.addEventListener('mouseout', addHandler.bind(1));
////////////////////////////////////////////////////////////////////////
//////////Applying fixed scroll///////////////////////////////////////
const navHeight = nav.getBoundingClientRect().height;
const scrollApply = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(scrollApply, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
const header = document.querySelector('.header');
headerObserver.observe(header);
////////////////////////////////////////////////////////////
/////////////Make the element appear smoothly///////////////
const observeHandler = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const AllSectionsObserver = new IntersectionObserver(observeHandler, {
  root: null,
  threshold: 0.15,
});
const sectionObserver = document.querySelectorAll('.section');

sectionObserver.forEach(section => {
  AllSectionsObserver.observe(section);
  //section.classList.add('section--hidden');
});
//////////image-load//////////////////////////
const images = document.querySelectorAll('img[data-src]');
const imageObserveHandler = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imageObserveHandler, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
images.forEach(img => imgObserver.observe(img));
///////////////////////////////////////////////////////////////
////////////slide bar////////////////////////////////////////
const slides = document.querySelector('.slider');
const slidesContainer = document.querySelectorAll('.slide');

const rightBtn = document.querySelector('.slider__btn--right');
const leftBtn = document.querySelector('.slider__btn--left');

let curslide = 0;
const length = slidesContainer.length;
const goToslide = function (slide) {
  slidesContainer.forEach(
    (e, i) => (e.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToslide(0);
const nextSlide = function () {
  curslide++;
  if (curslide === length) curslide = 0;
  goToslide(curslide);
};
const prevSlide = function () {
  if (curslide === 0) curslide = length;
  curslide--;
  goToslide(curslide);
};
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e) {
  if (e.key == 'ArrowRight') nextSlide();
  else if (e.key == 'ArrowLeft') prevSlide();
});
const dots = document.querySelector('.dots');
const addDots = function () {
  slidesContainer.forEach(function (_, i) {
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-num=${i}></button>`
    );
  });
};
addDots();
const activateDot = function (curslide) {
  slidesContainer.forEach(e => e.classList.remove('dots__dot--active'));
  goToslide(curslide);
  console.log(curslide);
  document
    .querySelector(`.dots__dot[data-num="${curslide}"]`)
    .classList.add('dots__dot--active');
};
dots.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { num } = e.target.dataset;

    activateDot(num);
  }
});
console.log(slidesContainer);
