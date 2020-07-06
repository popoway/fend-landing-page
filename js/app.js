/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

let sectionY = {};
let hideHeader;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
 * Build a li as navbar item for navbar.
 * @param {Element} section The section which this function builds li for.
 * @returns {Element} The li element.
 */
function buildNavItem(section) {
  const name = section.getAttribute('data-nav');
  const anchor = section.id;
  const navItem = document.createElement('li');
  const navItemAnchor = document.createElement('a');
  navItemAnchor.textContent = name;
  navItemAnchor.classList.add('menu__link');
  navItemAnchor.href = `#${anchor}`;
  navItem.appendChild(navItemAnchor);
  return navItem;
}

/**
 * Smoothly scroll to the specified id upon the event.
 * @param {Event} event The event which occurs on the anchor.
 * @returns {null}
 */
function scrollToID(event) {
  event.preventDefault();
  const id = event.target.hash; // need only the anchor part
  console.log('Scroll to ' + id);
  const element = document.querySelector(id);
  window.scrollTo({
    top: element.offsetTop,
    left: 0,
    behavior: 'smooth'
  });
}

/**
 * For all sections, check which one is active.
 * @returns {string} Return the id of the active section.
 */
function activeSection() {
  const viewportY = window.pageYOffset;
  let minSection = 'section1';
  let minDistance = Math.abs(viewportY - sectionY['section1']);
  for (let i in sectionY) {
    const currentDistance = Math.abs(viewportY - sectionY[i])
    if (currentDistance < minDistance) {
      minSection = i;
      minDistance = currentDistance;
    }
    else {
      continue;
    }
  }
  console.log(`${minSection} is the closest section to the top with distance of ${minDistance}`);
  return minSection;
}

/**
 * Set navbar item as active when its corresponding section is active.
 * @param {string} id The id of the active section.
 * @returns {null}
 */
function addActiveToNavItem(id) {
  const navItems = document.querySelectorAll('a');
  for (const navItem of navItems) {
    if (navItem.hash === '#' + id) {
      navItem.classList.add('active-menu-link');
    }
    else {
      navItem.classList.remove('active-menu-link');
    }
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav() {
  const sections = document.querySelectorAll('section');
  const navbarList = document.querySelector('#navbar__list');
  for (const section of sections) {
    navbarList.appendChild(buildNavItem(section));
  }
}

// Add class 'active' to section when near top of viewport
function addActiveToSectionOnScroll() {
  window.addEventListener('scroll', () => {
    // stop previous unfinished setTimeout
    clearTimeout(hideHeader);
    // display header upon scrolling
    document.querySelector('.page__header').classList.remove('hidden');

    const sections = document.querySelectorAll('section');
    for (const section of sections) {
      sectionY[section.id] = section.offsetTop; // get offsetTop for all sections to compare later
    }
    console.log(sectionY);
    const currentActiveSectionID = activeSection()
    const currentActiveSection = document.getElementById(currentActiveSectionID);
    for (const section of sections) {
      section.classList.remove('your-active-class');
    }
    currentActiveSection.classList.add('your-active-class');
    addActiveToNavItem(currentActiveSectionID);

    // hide header after 3 seconds
    hideHeader = setTimeout(() => {
      const header = document.querySelector('.page__header');
      header.classList.add('hidden');
    }, 3000);
  });
}

// Scroll to anchor ID using scrollTO event
function scrollToSectionOnLinkClick() {
  const links = document.querySelectorAll('a');
  for (const link of links) {
    link.addEventListener('click', scrollToID);
  }
}

/**
 * End Main Functions
 * Begin Events
 *
*/

document.addEventListener('DOMContentLoaded', () => {
  // Build menu
  buildNav();

  // Scroll to section on link click
  scrollToSectionOnLinkClick();

  // Set sections as active
  addActiveToSectionOnScroll();
})
