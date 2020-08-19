'use strict';
import Glide from '@glidejs/glide';
import AOS from 'aos';
require('intersection-observer');

// for ei forEach support in nodelist
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

const glideCustomers = document.querySelectorAll('.glide_customers');

for (let i = 0; i < glideCustomers.length; i++) {
  let glide = new Glide(glideCustomers[i], {
    type: 'carousel',
    perView: 1,
    autoplay: 2000,
    focusAt: 'center',
  });

  glide.mount();
}

//

const glideClients = document.querySelectorAll('.glide_clients');

for (let i = 0; i < glideClients.length; i++) {
  let glide = new Glide(glideClients[i], {
    type: 'carousel',
    perView: 3,
    focusAt: 'center',
    gap: 50,
    // autoplay: 3000,
    breakpoints: {
      992: {
        perView: 2,
      },
      600: {
        perView: 1,
      },
    },
  });

  glide.mount();
}

AOS.init();

// MAIN NAV

const mainHeader = document.getElementById('main-header');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50 || document.documentElement.scrollTop > 50) {
    mainHeader.classList.add('hd-smooth');
  } else {
    mainHeader.classList.remove('hd-smooth');
  }
});

//SECTION OTHER CLIENTS
const businessClients = document.querySelectorAll('.client-img img');
const observeClients = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.setAttribute('src', entry.target.dataset.image);

    observeClients.unobserve(entry.target);
  });
});

businessClients.forEach((client) => observeClients.observe(client));

// SECTION BUSINESS
const businessBgImg = document.querySelectorAll('.handle-business');

const observeBusiness = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) return;

  entry.target.style.backgroundImage = `url("./images/sc-images/business.jpg")`;
  observeBusiness.unobserve(entry.target);
});

businessBgImg.forEach((item) => observeBusiness.observe(item));

// SECTION DIGITAL BUSINESS IMAGES
const digitalImages = document.querySelectorAll('.digital-image img');

const observeDigital = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.setAttribute('src', entry.target.dataset.image);
    observeDigital.unobserve(entry.target);
  });
});

digitalImages.forEach((item) => observeDigital.observe(item));

// NAV
// SIDE NAVBAR
const navToggle = document.querySelector('.toggle-box');
const sideNavbar = document.querySelector('.side-navbar');
const sideNavbarBg = document.querySelector('.side-bg');
const closeSideNavbar = document.querySelector('.btn-x');

navToggle.addEventListener('click', (e) => {
  sideNavbarBg.classList.add('side-show-bg');
  sideNavbar.classList.add('side-navbar-show');
});

closeSideNavbar.addEventListener('click', () => {
  sideNavbarBg.classList.remove('side-show-bg');
  sideNavbar.classList.remove('side-navbar-show');
});

sideNavbarBg.addEventListener('click', (e) => {
  sideNavbarBg.classList.remove('side-show-bg');
  sideNavbar.classList.remove('side-navbar-show');
});

// footer section

const footerItems = document.querySelectorAll('.ft-item');

footerItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (e.target.classList.contains('ft-item')) {
      const ftItemHolder = e.target.querySelector('.ft-items-holder');

      ftItemHolder.classList.toggle('max-height-holder');
    }
  });
});

// form

const contactForm = document.querySelector('.contact-form');

const inputName = document.getElementById('input-name');
const inputLastName = document.getElementById('input-lastname');
const inputEmail = document.getElementById('input-email');
const inputCompany = document.getElementById('input-company');
const inputTextArea = document.querySelector('.text-area');

// CONTACT FORM VALIDATION

const contactValidation = () => {
  // form validation true || false
  let usernameValidate;
  let lastnameValidate;
  let emailValidate;
  let companyValidate;
  let textAreaValidate;

  // val === value
  const firstnameVal = inputName.value.trim();
  const lastnameVal = inputLastName.value.trim();
  const emailVal = inputEmail.value.trim();
  const companyVal = inputCompany.value.trim();
  const textAreaVal = inputTextArea.value.trim();

  // first name
  if (firstnameVal === '' || firstnameVal === null) {
    usernameValidate = false;
    setInputError(inputName, 'This field is required.');
  } else {
    usernameValidate = true;
    setSuccessInput(inputName);
  }

  // lastname
  if (lastnameVal === '' || lastnameVal === null) {
    lastnameValidate = false;
    setInputError(inputLastName, 'This field is required.');
  } else {
    lastnameValidate = true;
    setSuccessInput(inputLastName);
  }

  //email
  if (emailVal === '' || emailVal === null) {
    emailValidate = false;
    setInputError(inputEmail, 'This field is required.');
  } else if (
    validateEmail(inputEmail.value) !== true ||
    validateEmail(inputEmail.value) === null
  ) {
    emailValidate = false;
    setInputError(inputEmail, 'Enter a valid email.');
  } else {
    emailValidate = true;
    setSuccessInput(inputEmail);
  }

  // company
  if (companyVal === '' || companyVal === null) {
    companyValidate = false;
    setInputError(inputCompany, 'This field is required.');
  } else {
    companyValidate = true;
    setSuccessInput(inputCompany);
  }

  // text area or msg
  if (textAreaVal === '' || textAreaVal === null) {
    textAreaValidate = false;
    inputTextArea.classList.add('input-err');
  } else {
    textAreaValidate = true;
    inputTextArea.classList.remove('input-err');
  }

  // check if inputs are valide
  // if valide = submitted
  if (
    usernameValidate &&
    lastnameValidate &&
    emailValidate &&
    companyValidate &&
    textAreaValidate
  ) {
    inputName.value = '';
    inputLastName.value = '';
    inputEmail.value = '';
    inputCompany.value = '';
    inputTextArea.value = '';
    console.log('submitted');
  }
};

// set error for inputs
const setInputError = (input, msg) => {
  input.classList.add('input-err');
  input.nextElementSibling.innerText = msg;
};

// set success for inputs
const setSuccessInput = (input) => {
  input.classList.remove('input-err');
  input.nextElementSibling.innerText = '';
};

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// add the validation event if not null to other pages
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    contactValidation();
  });
}

// about page

const workRevImg = document.querySelectorAll('.sc-work-rev');

const observeWorkRev = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) return;
  entry.target.style.backgroundImage = `url("../images/sc-images/company-review.jpg")`;
  observeWorkRev.unobserve(entry.target);
});

workRevImg.forEach((item) => observeWorkRev.observe(item));
