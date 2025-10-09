/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}

navLink.forEach((n) => n.addEventListener('click', linkAction));

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const navLinks = document.querySelectorAll('.nav__link');
const talkBtn = document.querySelector('.nav__link-btn');
const contactLink = document.querySelector('.nav__link[href="#contact"]');

// Handle normal nav links
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(l => l.classList.remove('active-link'));
    this.classList.add('active-link');
  });
});

// Handle "Let's Talk" button separately
if (talkBtn && contactLink) {
  talkBtn.addEventListener('click', function () {
    navLinks.forEach(l => l.classList.remove('active-link'));
    contactLink.classList.add('active-link');
  });
}

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const header = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); 
    else header.classList.remove('scroll-header');
}

window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); 
    else scrollUp.classList.remove('show-scroll');
}

window.addEventListener('scroll', scrollUp);

/*==================== ABOUT TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]');

    tabs.forEach((tab) =>{
        tab.addEventListener('click', () =>{
            const target = document.querySelector(tab.dataset.target);

            tabContents.forEach((tabContent) =>{
                tabContent.classList.remove('tab__active');
            });
            target.classList.add('tab__active');

            tabs.forEach((tab) =>{
                tab.classList.remove('tab__active');
            });
            tab.classList.add('tab__active');
        });
    });

/*=============== CONTACT FORM =============== */
const contactForm = document.getElementById('contact-form'),
    contactName = document.getElementById('contact-name'),
    contactEmail = document.getElementById('contact-mail'),
    contactSubject = document.getElementById('contact-subject'),
    contactMessage = document.getElementById('contact-message'),
    errorMessage = document.getElementById('error-message');

    const sendEmail = (e) => {
        e.preventDefault();

        if(contactName.value === '' || 
            contactEmail.value === '' || 
            contactSubject.value === '' || 
            contactMessage.value === '')
            {
                errorMessage.textContent = 'Please fill in all the fields.';
            }
        else{
            //serviceID - templateID - #form - publicKey
            emailjs.sendForm('service_2nmbefc', 
                'template_l8djvoj', 
                '#contact-form', 
                '9KDzq7PRHJ8LuKRgh'
                ).then(() => {
                errorMessage.classList.add('color-first');
                errorMessage.textContent = 'Message sent ✔️';
                setTimeout(() => {
                    errorMessage.textContent = '';
                }, 5000);
            }, (error) => {
                alert('OOPS! SOMETHING HAS FAILED...', error);
            });

            contactName.value = '';
            contactEmail.value = '';
            contactSubject.value = '';
            contactMessage.value = '';
        }
    };
    contactForm.addEventListener('submit', sendEmail);