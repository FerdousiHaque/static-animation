let config = {strength: 1};
// add animation in all heading - done
gsap.to("h1", {
    repeat: -1,
    yoyo: true,
    y: 12,
    duration: 1.5,
    ease: "power1.inOut",
    modifiers: {
      x: gsap.utils.unitize(value => value * config.strength, "px")
    }
  });

//first main title moving animation
gsap.to(".count-particles", {
    repeat: -1,
    yoyo: true,
    y: 15,
    duration: 1.5,
    ease: "power1.inOut",
    modifiers: {
      x: gsap.utils.unitize(value => value * config.strength, "px")
    }
  });

// add animation in about paragraph - done
const about = document.getElementById("about-para");

gsap.to(about, {
    repeat: -1,
    yoyo: true,
    x: 10,
    duration: 1,
    ease: "power1.inOut",
    modifiers: {
      x: gsap.utils.unitize(value => value * config.strength, "px")
    }
  });


// Add animation in different section
const particles = document.querySelector("#particles-js");
const tittle = document.querySelector("#company_tittle");
const logoImage = document.querySelector("#sitelogo");
const siteText = document.querySelector("#exploreSite");

// object of animation script
const t1 = new TimelineMax();

t1.fromTo(particles, 1, { x:"-90%" }, { x: "0%", ease: Power2.easeInOut })
.fromTo(tittle, 1.5, { y:"-100%", opacity: 0 }, { y: "0%", opacity: 1, ease: Power2.easeInOut }, "-=1.2")
.fromTo(logoImage, 1.2, { y:"-40%" , opacity: 0 }, { y: "0%", opacity: 1, ease: Power2.easeInOut }, "-=1.2")
.fromTo(siteText, 1.2, { y:"-100%" , opacity: 0 }, { y: "0%", opacity: 1, ease: Power2.easeInOut }, "-=1.2");

// Animation occure when particular section is reached
scrolledDown = false;
$(window).scroll(function () {

    // scrollUp Button appare, after some scrolling
    var current = $(this).scrollTop();
    if(current > 350) {
        document.getElementById("scrollUp").style.display = "block";
    } else {
        document.getElementById("scrollUp").style.display = "none";
    }

    // add active class of navbar
    addClassOnScroll();
});

// Top Progress bar animation when scrolling - ADDdone
gsap.registerPlugin(ScrollTrigger);
gsap.to('progress', {
  value: 100,
  ease: 'none',
  scrollTrigger: { scrub: 0.3 }
});

// left-right animation
function animateFrom(elem, direction) {
    direction = direction | 1;
    
    var x = 0,
        y = direction * 100;
    if(elem.classList.contains("gs_reveal_fromLeft")) {
      x = -200;
      y = 0;
    } else if(elem.classList.contains("gs_reveal_fromRight")) {
      x = 200;
      y = 0;
    }
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
      duration: 1.5, 
      x: 0,
      y: 0, 
      autoAlpha: 1, 
      ease: "expo", 
      overwrite: "auto"
    });
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
      
      ScrollTrigger.create({
        start: "15px 75%",
        trigger: elem,
        toggleActions: 'play none none none',
        onEnter: function() { animateFrom(elem) }, 
        once: true
        });
    });
  });

//product image mouse over movement 
var wraps = document.querySelectorAll(".movement");

for (var i = 0; i < wraps.length; i++) {
    wraps[i].addEventListener("mouseover", function () {
        animation(this);
    });
}

// Mouse
var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function (event) {
        var e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function (e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function () {
        return "(" + this.x + ", " + this.y + ")";
    }
};

// product image rotation 
function animation(container) {

    var inner = container.querySelector(".product");

    // Track the mouse position relative to the center of the container.
    mouse.setOrigin(container);
    var counter = 0;
    var refreshRate = 10;
    var isTimeToUpdate = function () {
        return counter++ % refreshRate === 0;
    };
    var onMouseEnterHandler = function (event) {
        update(event);
    };

    var onMouseLeaveHandler = function () {
        inner.style = "";
    };

    var onMouseMoveHandler = function (event) {
        if (isTimeToUpdate()) {
            update(event);
        }
    };
    var update = function (event) {
        mouse.updatePosition(event);
        console.log(mouse.x);
        console.log(mouse.y);
        console.log("after");
        updateTransformStyle(
            (mouse.y / inner.offsetHeight / 2).toFixed(2),
            (mouse.x / inner.offsetWidth / 2).toFixed(2)
        );
    };

    var updateTransformStyle = function (x, y) {
        if(x>6){x = (x-6).toFixed(2);} else if(x<=6){
          x = (6-x).toFixed(2);
        } 
        if(y<=0) {
          y = Math.abs(y)+Math.abs(y);
        }
        var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        inner.style.transform = style;
        inner.style.webkitTransform = style;
        inner.style.mozTranform = style;
        inner.style.msTransform = style;
        inner.style.oTransform = style;
    };
    container.onmousemove = onMouseMoveHandler;
    container.onmouseleave = onMouseLeaveHandler;
    container.onmouseenter = onMouseEnterHandler;

}

// stricky navbar will appare onScroll
var navbar = document.querySelector('.jwpnavbar');

ScrollTrigger.create({
  start: 'top -1500',
  toggleClass: {className: 'jwpnavbar--scrolled', targets: '.jwpnavbar'},
  onUpdate: ({direction}) => {
    if (direction == -1) {
      navbar.classList.add('jwpnavbar--scrolled');
      navbar.classList.remove('jwpnavbar--up');
    } else {
      navbar.classList.remove('jwpnavbar--scrolled');
      navbar.classList.add('jwpnavbar--up');
    }
    if($(this).scrollTop() < 1500) {
      navbar.classList.remove('jwpnavbar--scrolled');
      navbar.classList.add('jwpnavbar--up');
    }
  }
});

// active class of navbar activate
var addClassOnScroll = function () {
  var windowTop = $(window).scrollTop();
  $('section[id]').each(function (index, elem) {
      var offsetTop = $(elem).offset().top;
      var outerHeight = $(this).outerHeight(true);

      if( windowTop > (offsetTop - 50) && windowTop < ( offsetTop + outerHeight)) {
          var elemId = $(elem).attr('id');
          $("ul li a.active").removeClass('active');
          $("ul li a[href='#" + elemId + "']").addClass('active');
      }
  });
};