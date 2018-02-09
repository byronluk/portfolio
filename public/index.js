function windowSizeHandler() {
  const mq = window.matchMedia( "(max-width:415px)" );
  var navHeader = document.getElementById('nav-header');
  var footerLinks = document.getElementById('footer-links');

  if (mq.matches) {
    navHeader.innerHTML = 'BL';
    footerLinks.style.display = 'block';
    windowLocation();
  } else {
    navHeader.innerHTML = 'Byron Luk';
    footerLinks.style.display = 'none';
  }
};
function onNavBlocksClick() {
  var navLinks = document.getElementById('nav-links');

  if (navLinks.classList.contains('visibility-hidden') || navLinks.classList.contains('animation-out')) {
    navLinks.classList.remove('visibility-hidden', 'animation-out');
    navLinks.classList.add('animation-in');
  } else {
    navLinks.classList.add('animation-out');
    navLinks.classList.remove('animation-in');
    setTimeout(function() {
      navLinks.classList.add('visibility-hidden');
    }, 3000);
  }
};
function windowLocation() {
  if (!!document.referrer) {
    var lastPage = document.referrer.match(/\/[a-z]*$/)[0];
    document.querySelector(".footer-links a[href=\"" + lastPage + "\"] .fa-circle").classList.remove('active-link');
  }
  var currentPage = location.href.match(/\/[a-z]*$/)[0];
  document.querySelector(".footer-links a[href=\"" + currentPage + "\"] .fa-circle").classList.add('active-link');
};
$(document).ready(function() {
  $("body, div.main-section").animate({
    opacity: 1,
    width: 100 + '%',
  }, 1200);

  $("a.transition").click(function(event){
      event.preventDefault();
      linkLocation = this.href;
      $("body, div.main-section").animate({
        opacity: 0,
        width: 0,
      }, 1200, redirectPage);      
    });
    function redirectPage() {
        window.location = linkLocation;
    }
});

function rotateProjects(event) {
  const direction = event.currentTarget.id;
  const projectsContainer = document.getElementById('projects-container');
  const projects = projectsContainer.querySelectorAll('a');

  let slideOut = findVisibleProjects(projects);
  let slideIn = slideOut + 1;
  if (direction === 'right') {
    slideIn = slideOut - 1;
  }
  //  prevents sliding for non existent indexes
  if (slideIn < 0 || slideIn >= projects.length) {
    return;
  }
  projects[slideOut].classList.add(`slide-${direction}_out`);
  projects[slideIn].classList.add(`slide-${direction}_in`);
  projects[slideIn].classList.remove('display-none');
  setTimeout(function() {
    projects[slideOut].classList.add('display-none');
    projects[slideOut].classList.remove(`slide-${direction}_out`);
    projects[slideIn].classList.remove(`slide-${direction}_in`);
  }, 1950);
};

function findVisibleProjects(projects) {
  for (var i = 0; i < projects.length; i++) {
    if (!projects[i].classList.contains('display-none')) {
      return i;
    }
  }
}

function slideDescriptionIn() {
  const projectsContainer = document.getElementById('projects-container');
  if (!projectsContainer) {
    return;
  }
  const projects = projectsContainer.querySelectorAll('a');

  for (var i = 0; i < projects.length; i++) {
    projects[i].addEventListener('mouseover', handleMouseover);
    projects[i].addEventListener('mouseout', handleMouseout);
  }
}
function handleMouseover(event) {
  const pElement = event.currentTarget.children[1];
  pElement.classList.remove('display-none');
}
function handleMouseout(event) {
  const pElement = event.currentTarget.children[1];
  pElement.classList.add('display-none');
}
slideDescriptionIn();
windowSizeHandler();
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
if (leftButton) {
  leftButton.addEventListener('click', rotateProjects);
  rightButton.addEventListener('click', rotateProjects);
}
window.addEventListener('resize', windowSizeHandler);
document.getElementById('navblocksbutton').addEventListener('click', onNavBlocksClick);