let config = {strength: 1};
// add animation in all heading
gsap.to("h1", {
    repeat: -1,
    yoyo: true,
    y: 12,
    duration: 0.8,
    ease: "power1.inOut",
    modifiers: {
      x: gsap.utils.unitize(value => value * config.strength, "px")
    }
  });

  // add animation in about paragraph
  const about = document.getElementById("about-para");

  gsap.to(about, {
    repeat: -1,
    yoyo: true,
    x: 9,
    duration: 0.8,
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
const aboutSec = document.querySelector("#aboutSection");

// object of animation script
const t1 = new TimelineMax();

t1.fromTo(particles, 1, { x:"-90%" }, { x: "0%", ease: Power2.easeInOut })
.fromTo(tittle, 1.5, { y:"-100%" }, { y: "0%", ease: Power2.easeInOut }, "-=1.2")
.fromTo(logoImage, 1.2, { y:"-40%" }, { y: "0%", ease: Power2.easeInOut }, "-=1.2")
.fromTo(siteText, 1.2, { y:"-100%" }, { y: "0%", ease: Power2.easeInOut }, "-=1.2");

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

    // when about section is on view
    if ($(this).scrollTop() >= (aboutSec.offsetWidth-250) && !scrolledDown) {
        t1.fromTo(aboutSec, 1.2, { y:"45%", opacity: 0 }, { y: "0%", opacity: 1 });
        scrolledDown = true;
    }
});

// Top Progress bar animation when scrolling
gsap.registerPlugin(ScrollTrigger);
gsap.to('progress', {
  value: 100,
  ease: 'none',
  scrollTrigger: { scrub: 0.3 }
});

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
      duration: 1.25, 
      x: 0,
      y: 0, 
      autoAlpha: 1, 
      ease: "expo", 
      overwrite: "auto"
    });
  }
  
  function hide(elem) {
    gsap.set(elem, {autoAlpha: 0});
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
      hide(elem); // assure that the element is hidden when scrolled into view
      
      ScrollTrigger.create({
        trigger: elem,
        onEnter: function() { animateFrom(elem) }, 
        //onEnterBack: function() { animateFrom(elem, -1) },
        //onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
      });
    });
  });

  // add 3D view in product image
  let proxy = { skew: 0 }
  let  skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg") // fast
    clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees. 

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
    }
  }
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".skewElem", {transformOrigin: "right center", force3D: true});

  