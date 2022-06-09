'use strict';

// //////////////////////////////////
// LECTURES

// Selecting elements
console.log(document.documentElement); // entire html
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');
console.log(allSection);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // all elements with a name of button
console.log(allButtons);

// Creating and inserting elements
// insertAdjiacentHTML
// header.insertAdjacentElement('beforebegin', message);

const message = document.createElement('div'); //creates a DOM element
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  // message.parentElement.removeChild(message);
});

// Styles
message.style.backgroundColor = '#37383e';
message.style.width = '120%';

console.log(getComputedStyle(message).color);

// message.style.height = '75px';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
console.log(getComputedStyle(message).height);

// change propertyes with setProperty
document.documentElement.style.setProperty('--color-primary', 'gold');

// Attributes
// ex: in img -> alt, src, class, id are all attributes
// JS reads only standard properties, not the one we create, like desiner='Somebody'

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautifull minimalist logo';

// Non-standard
console.log(logo.designer); // this will NOT work like this
// but will work this way:
console.log(logo.getAttribute('designer'));

logo.setAttribute('company', 'Bankist');

console.log(logo.src); //absolute url
console.log(logo.getAttribute('src')); // relative url

const link = document.querySelector('.twitter-link');
const refLink = link.getAttribute('href');
console.log(refLink);
console.log(document.querySelector('.twitter-link').getAttribute('href'));

// Data-attributes
console.log(logo.dataset.versionNumber); //img has attribute: data-version-number

// Classes
logo.classList.add('asd');
logo.classList.remove('asd');
logo.classList.toggle('asd');
logo.classList.contains('asd');

// Dont use it, because will overwritte all classes
// logo.className = 'jonas';

btnScrollTo.addEventListener('click', e => {
  e.preventDefault();
  const s1Coords = section1.getBoundingClientRect();
  console.log(s1Coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Curent scroll (X/Y) ' + window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport ' + document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // OLD WAY
  // window.scrollTo(
  //   s1Coords.left + window.pageXOffset,
  //   s1Coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // NEW WAY
  // scrollIntoView
  section1.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const h1 = document.querySelector('h1');
const alert = () => {
  h1.style.color = 'blue';

  // h1.removeEventListener('mouseenter', alert);
};
h1.addEventListener('mouseenter', alert);

// Remove event after 2s
// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alert);
//   console.log('Event removed');
// }, 2000);

// This is old school
// h1.onmouseenter = e => {
//   h1.style.color = 'blue';
// };

h1.addEventListener('mouseleave', () => {
  h1.style.color = '#444';
});

// Bubbling and Capturing
// random colors

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop event propagation
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Links', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('Nav', e.target, e.currentTarget);
  },
  false //this is the default
);

// PAGE NAVIGATION
// this way is NOT so good, because it can impact performance;
// We will use event delegation;

// const links = document.querySelectorAll('.nav__link');
// links.forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document
//       .querySelector(id)
//       .scrollIntoView({ behavior: 'smooth', block: 'start' });
//   });
// });

// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////
/*
// DOM Traversing
const h1 = document.querySelector('h1');

// going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'white';

// going upwards: parent
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = `var(--gradient-secondary)`;

// going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

// ////////////////////////////////////////////////////////////
// Sticky navigation
// very bad for performance
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', e => {
//   window.scrollY > initialCoords.top
//     ? nav.classList.add('sticky')
//     : nav.classList.remove('sticky');
// });

/*
// The intersection observer API
// threshold is very important here;
const obsCallback = (entries, observer) => {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null,
  // threshold: 0.1,
  threshold: [0, 0.2],
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parset the DOM tree build', e);
// });
// document.addEventListener('load', function (e) {
//   console.log('Page fully loaded', e);
// });
// document.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   // e.returnValue = ''; // no longer work
// });
