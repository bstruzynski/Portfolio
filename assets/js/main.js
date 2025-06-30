(function(){
  "use strict";
  const select = (el, all = false) =>
    all ? [...document.querySelectorAll(el)] : document.querySelector(el);

  function on(type, el, listener, all = false){
    (all ? select(el, true) : [select(el)]).forEach(e => {
      if(e) e.addEventListener(type, listener);
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = select('.mobile-nav-toggle');
    const header = select('#header');
    const navLinks = select('#navbar .nav-link, #navbar .dropdown-item', true);
    let overlay = null;

    function openSidebar() {
  document.body.classList.add('menu-open');
  document.documentElement.classList.add('menu-open');
  header.classList.add('mobile-active');
  mobileToggle.classList.add('active');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeSidebar);
  }
}
function closeSidebar() {
  document.body.classList.remove('menu-open');
  document.documentElement.classList.remove('menu-open');
  header.classList.remove('mobile-active');
  mobileToggle.classList.remove('active');
  if (overlay) {
    overlay.removeEventListener('click', closeSidebar);
    overlay.remove();
    overlay = null;
  }
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
    
    // Napraw resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) closeSidebar();
    });
  });
  // Typed.js
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    document.querySelectorAll('.typed').forEach(function(el) {
      el.classList.add('visible-typed'); // fade-in
      var typed_items = el.getAttribute('data-typed-items');
      if (!typed_items) return;
      typed_items = typed_items.split(',').map(item => item.trim());
      new Typed(el, {
        strings: typed_items,
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 1200,
        loop: true
      });
    });
  }, 1500); 
});

  // AOS
  window.addEventListener('load', () => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
  AOS.refresh(); 
});

  // Glightbox
  GLightbox({ selector: '.portfolio-lightbox' });

  // Isotope filtering
  window.addEventListener('load', () => {
    let container = select('.portfolio-container');
    if(container){
      let iso = new Isotope(container, { itemSelector: '.portfolio-item' });
      let filters = select('#portfolio-flters li', true);
      on('click', '#portfolio-flters li', function(e){
        e.preventDefault();
        filters.forEach(el => el.classList.remove('filter-active'));
        this.classList.add('filter-active');
        iso.arrange({ filter: this.getAttribute('data-filter') });
      }, true);
    }
  });

  // Highlight
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#navbar .nav-link, #navbar .dropdown-item");

  function activateNavLink() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", activateNavLink);
  document.addEventListener("DOMContentLoaded", () => {
  const sections = [...document.querySelectorAll("section[id]")];
  let isScrolling = false;
  let wheelTimeout;
 // Smooth Scroll
function smoothScrollTo(targetY, duration = 800) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const percent = Math.min(progress / duration, 1);
    const eased = easeInOutCubic(percent);
    window.scrollTo(0, startY + diff * eased);
    if (progress < duration) {
      requestAnimationFrame(step);
    } else {
      isScrolling = false;
    }
  }
  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  requestAnimationFrame(step);
}

  function getCurrentSectionIndex() {
    const scrollY = window.scrollY + window.innerHeight / 2;
    return sections.findIndex((section, index) => {
      const offsetTop = section.offsetTop;
      const next = sections[index + 1]?.offsetTop ?? Infinity;
      return scrollY >= offsetTop && scrollY < next;
    });
  }

  function scrollToSection(direction) {
    if (isScrolling) return;
    isScrolling = true;
    const currentIndex = getCurrentSectionIndex();
    const nextIndex = direction === "down" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex >= 0 && nextIndex < sections.length) {
      smoothScrollTo(sections[nextIndex].offsetTop);
    } else {
      isScrolling = false;
    }
  }

  window.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaY) < 30 || isScrolling) return;
    clearTimeout(wheelTimeout);
    scrollToSection(e.deltaY > 0 ? "down" : "up");
    wheelTimeout = setTimeout(() => {
      isScrolling = false;
    }, 800);
  }, { passive: true });

  window.addEventListener("keydown", (e) => {
    if (isScrolling) return;
    if (["ArrowDown", "PageDown"].includes(e.key)) {
      e.preventDefault();
      scrollToSection("down");
    } else if (["ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      scrollToSection("up");
    }
  });
});
})();
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    backToTop.classList.add('active');
  } else {
    backToTop.classList.remove('active');
  }
});
  document.addEventListener('DOMContentLoaded', function() {
    const heroH1 = document.getElementById('hero-title');
    if (heroH1) {
      setTimeout(() => {
        heroH1.classList.add('hero-h1-animate');
        heroH1.classList.remove('hero-h1-void');
      }, 200);
    }
  });
