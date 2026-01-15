
(function() {
//===== Prealoder

	window.onload = function () {
		window.setTimeout(fadeout, 500);
	}

	function fadeout() {
		document.querySelector('.preloader').style.opacity = '0';
		document.querySelector('.preloader').style.display = 'none';
	}

	// Logo click handler
	document.addEventListener('DOMContentLoaded', function() {
		var logo = document.querySelector('#logo');
		if (logo) {
			logo.addEventListener('click', function() {
				window.location.href = 'index.html';
			});
		}
	});

    /*=====================================
    Sticky
    ======================================= */
    window.onscroll = function () {
        var header_navbar = document.querySelector(".navbar-area");
        if (!header_navbar) return;
        
        var sticky = header_navbar.offsetTop;
        var logo = document.querySelector('.navbar-brand img');

        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
            if (logo) {
                logo.src = 'assets/img/logo/logo-2-green.svg';
            }
        } else {
            header_navbar.classList.remove("sticky");
            if (logo) {
                logo.src = 'assets/img/logo/logo-2-white.svg';
            }
        }



        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (backToTo) {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                backToTo.style.display = "flex";
            } else {
                backToTo.style.display = "none";
            }
        }
    };

    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');
    
    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });

    // section menu active
	function onScroll(event) {
		var sections = document.querySelectorAll('.page-scroll');
		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute('href');
			var refElement = document.querySelector(val);
			if (!refElement) continue;
			var scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

	window.document.addEventListener('scroll', onScroll);


    //===== close navbar-collapse when a  clicked
    let navbarToggler = document.querySelector(".navbar-toggler");    
    var navbarCollapse = document.querySelector(".navbar-collapse");

    document.querySelectorAll(".page-scroll").forEach(e =>
        e.addEventListener("click", () => {
            if (navbarToggler) navbarToggler.classList.remove("active");
            if (navbarCollapse) navbarCollapse.classList.remove('show');
        })
    );
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarToggler.classList.toggle("active");
        });
    } 


	// WOW active
    new WOW().init();


    // ====== scroll top js
    function scrollTo(element, to = 0, duration= 1000) {

        const start = element.scrollTop;
        const change = to - start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = (() => {

            currentTime += increment;

            const val = Math.easeInOutQuad(currentTime, start, change, duration);

            element.scrollTop = val;

            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        });

        animateScroll();
    };

    Math.easeInOutQuad = function (t, b, c, d) {

        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    document.querySelector('.scroll-top').onclick = function () {
        scrollTo(document.documentElement); 
    }


})();

// Image overlay functionality
document.addEventListener('DOMContentLoaded', function() {
    const imageOverlay = document.getElementById('imageOverlay');
    const overlayImage = document.getElementById('overlayImage');
    const overlayClose = document.querySelector('.overlay-close');
    const frameImages = document.querySelectorAll('.frame-item img');

    console.log('Image overlay init - overlay:', !!imageOverlay, 'image:', !!overlayImage, 'close:', !!overlayClose);

    // Only proceed if overlay elements exist
    if (!imageOverlay || !overlayImage) {
        console.warn('Core overlay elements not found');
        return;
    }

    console.log('Found', frameImages.length, 'frame images');

    // Open overlay on image click
    frameImages.forEach(img => {
        img.addEventListener('click', function(e) {
            console.log('Image clicked');
            e.stopPropagation();
            overlayImage.src = this.src;
            imageOverlay.classList.add('active');
        });
    });

    // Close overlay on X click - only if element exists
    if (overlayClose) {
        overlayClose.addEventListener('click', function() {
            imageOverlay.classList.remove('active');
        });
    }

    // Close overlay on background click
    imageOverlay.addEventListener('click', function() {
        imageOverlay.classList.remove('active');
    });

    // Prevent closing when clicking on the image itself
    overlayImage.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
