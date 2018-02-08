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
  $("body").animate({
    opacity: 1,
    width: 100 + '%',
  }, 1500);

  $("a.transition").click(function(event){
      event.preventDefault();
      linkLocation = this.href;
      $("body").animate({
        opacity: 0,
        width: 0,
      }, 1000, redirectPage);      
    });
    function redirectPage() {
        window.location = linkLocation;
    }
});

function rotateProjects() {
  const projectsContainer = document.getElementById('projects-container');
  const projects = projectsContainer.querySelectorAll('a');
  console.log(projects.length);
  console.log(projects[0].getAttribute('class'));
};

rotateProjects();
windowSizeHandler();
window.addEventListener('resize', windowSizeHandler);
document.getElementById('navblocksbutton').addEventListener('click', onNavBlocksClick);