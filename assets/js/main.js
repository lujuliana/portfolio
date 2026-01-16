
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
		
		// Initialize scroll-top button as hidden
		var backToTop = document.querySelector(".scroll-top");
		if (backToTop) {
			backToTop.style.display = "none";
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


	// WOW active
    new WOW().init();


    // ====== scroll top js
    function scrollTo(element, to = 0, duration= 600) {

        const start = element.scrollTop;
        const change = to - start;
        let currentTime = 0;
        const startTime = Date.now();

        const animateScroll = () => {
            const elapsed = Date.now() - startTime;
            currentTime = Math.min(elapsed, duration);

            const val = Math.easeLinear(currentTime, start, change, duration);

            element.scrollTop = val;

            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    Math.easeLinear = function (t, b, c, d) {
        return c * (t / d) + b;
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
