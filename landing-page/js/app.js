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
//create a document fragment to append ul elements to it
const fragment = document.createDocumentFragment();
//selecting all section classes
const sections = document.querySelectorAll('section');
/**
 * End Global Variables
*/
/*
 * Begin Main Functions
*/

// build the nav

function buildNav()
{
    //loop on each section
    sections.forEach(function(section){
        //creating li and a elements, then append a to li
        const listElement = document.createElement('li');
        const linkElemnt = document.createElement('a');
        // add style to link element
        linkElemnt.classList.add('menu__link');
        //set the text content for a element with section name
        linkElemnt.textContent = section.getAttribute('data-nav');
        listElement.appendChild(linkElemnt);
        fragment.appendChild(listElement);
    });
    //append fragment to ul
    document.querySelector('#navbar__list').appendChild(fragment);
}


// Add class 'active' to section when near top of viewport
function updateActiveSection()
{
    //get all the link
    const links = document.querySelectorAll('a');
    // variable for storing the currently active link
    let activeLink = null;
    // loop on each section to get its boundries relative to the view port
    sections.forEach(function(section){
        const rect = section.getBoundingClientRect();
        //get the link that coressponds to the current section in the loop iteration
        for(link of links)
        {
            if(link.textContent === section.getAttribute('data-nav'))
            {
                activeLink = link;
                break;
            }
        }
        // if the section is within the boundries of view port then add active class to the section and the coressponding link to change the style
        if((( rect.y) > Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)-350) || (rect.bottom <= 500))
        {
            section.classList.remove('your-active-class');
            activeLink.classList.remove('your-active-class');
        }
        else
        {
            section.classList.add('your-active-class');
            activeLink.classList.add('your-active-class');
        }
    });
}

// Scroll to anchor ID using scrollTO event
function navBarClick(event) {
    // take action only when the a elements in the navbar
    if (event.target.nodeName === 'A')
    {
        //loop over the section and when the section data nav value matches the text content of the clicked link scroll to it
        for (section of sections)
        {
            if(section.getAttribute('data-nav') === event.target.textContent)
            {
                section.scrollIntoView({'behavior':'smooth'});
            }
        }
    }
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();
// Scroll to section on link click
document.querySelector('#navbar__list').addEventListener('click', navBarClick);
// Set sections as active
window.addEventListener("scroll", updateActiveSection);