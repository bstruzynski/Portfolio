(function(){
  "use strict";
  const select = (el, all = false) =>
    all ? [...document.querySelectorAll(el)] : document.querySelector(el);

  document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = select('.mobile-nav-toggle');
    const header = select('#header');
    const navLinks = select('#navbar .nav-link, #navbar .dropdown-item', true);
    let overlay = null;

    function openSidebar() {
      header.classList.add('mobile-active');
      mobileToggle.classList.add('active');
      mobileToggle.innerHTML = '<i class="bi bi-x"></i>';
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', closeSidebar);
      }
      document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
      header.classList.remove('mobile-active');
      mobileToggle.classList.remove('active');
      mobileToggle.innerHTML = '<i class="bi bi-list"></i>';
      if (overlay) {
        overlay.removeEventListener('click', closeSidebar);
        overlay.remove();
        overlay = null;
      }
      document.body.style.overflow = '';
    }
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function () {
        if (header.classList.contains('mobile-active')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }
    if (navLinks && navLinks.length) {
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 992) closeSidebar();
        });
      });
    }
    // Napraw resize - zamyka menu gdy wracamy do desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) closeSidebar();
    });
  });

  // Typed.js
  let t = select('.typed');
  if(t){
    new Typed('.typed', {
      strings: t.getAttribute('data-typed-items').split(','),
      typeSpeed:100, backSpeed:50, backDelay:2000, loop:true
    });
  }

  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    AOS.refresh();
  });

  GLightbox({ selector: '.portfolio-lightbox' });

  // podświetlanie nawigacji
  const sections = document.querySelectorAll("section[id]");
  const navLinksAll = document.querySelectorAll("#navbar .nav-link, #navbar .dropdown-item");
  function activateNavLink() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinksAll.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
  window.addEventListener("scroll", activateNavLink);

  // Back to top
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

  // Language switcher
  window.setLanguage = function(lang) {
    document.body.classList.remove("lang-pl", "lang-en");
    document.body.classList.add("lang-" + lang);
    document.querySelectorAll('.lang-text').forEach(el => {
      const text = el.getAttribute(`data-lang-${lang}`);
      if (text) el.textContent = text;
    });
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  function toggleFooterOnHero() {
    const hero = document.querySelector('#hero');
    const footer = document.getElementById('footer');
    if (!hero || !footer) return;

    const heroRect = hero.getBoundingClientRect();
    // Jeśli hero jest w co najmniej 50% widoczny w viewport, chowamy stopkę
    const threshold = 0.5;
    const visible =
      heroRect.top < window.innerHeight * (1 - threshold) &&
      heroRect.bottom > window.innerHeight * threshold;

    if (visible) {
      footer.classList.add('hidden');
    } else {
      footer.classList.remove('hidden');
    }
  }

  window.addEventListener('scroll', toggleFooterOnHero);
  window.addEventListener('resize', toggleFooterOnHero);
  setTimeout(toggleFooterOnHero, 200);
});
