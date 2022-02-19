(function ($) {
    
    "use strict";
    var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
    
    // Preloader
    $(window).on('load', function () {
        setTimeout(function () {
            $("#loader").fadeOut(200);
        }, 200);
    });
    // Animations
   var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};

    // Document on load.
	$(function(){
		contentWayPoint();
	});

    
    
    var wind = $(window);
    // ScrollIt 
    $.scrollIt({
        upKey: 38
        , downKey: 40
        , easing: 'swing'
        , scrollTime: 600
        , activeClass: 'active'
        , onPageChange: null
        , topOffset: -70
    });
    // Navbar scrolling background 
    wind.on("scroll", function () {
        var bodyScroll = wind.scrollTop()
            , navbar = $(".navbar")
            , logo = $(".navbar:not(.nav-box) .logo> img");
        if (bodyScroll > 100) {
            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo-dark.png');
        }
        else {
            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo-light.png');
        }
    });
    // close navbar-collapse when a clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });
    // Sections Background Image
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    // Awards owlCarousel
    $('.awards .owl-carousel').owlCarousel({
        loop: true
        , margin: 15
        , mouseDrag: true
        , autoplay: true
        , dots: false
        , responsiveClass: true
        , responsive: {
            0: {
                margin: 10
                , items: 2
            }
            , 600: {
                items: 3
            }
            , 1000: {
                items: 4
            }
        }
    });
    // Team owlCarousel
    $('.team .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , dots: false
        , mouseDrag: true
        , autoplay: false
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            }
            , 600: {
                items: 2
            }
            , 1000: {
                items: 3
            }
        }
    });
    // Testimonial owlCarousel
    $(".testimonials .owl-carousel, .blocks .owl-carousel, .testimonial-item .owl-carousel").owlCarousel({
        items: 1
        , loop: true
        , dots: true
        , mouseDrag: false
        , autoplay: false
        , smartSpeed: 500
    });
    // Services owlCarousel
    $('.services .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , mouseDrag: true
        , autoplay: false
        , dots: true
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 2
            }
            , 1000: {
                items: 2
            }
        }
    });
    // Smooth Scrolling
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]').not('[href="#0"]').click(function (event) {
            // On-page links
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        }
                        else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
    // Slider
    $(document).ready(function () {
        var owl = $('.header .owl-carousel');
        // Slider owlCarousel
        $('.slider .owl-carousel').owlCarousel({
            items: 1
            , loop: true
            , margin: 0
            , autoplay: true
            , smartSpeed: 1000
        });
        // Slider owlCarousel
        $('.slider-fade .owl-carousel').owlCarousel({
            items: 1
            , loop: true
            , margin: 0
            , autoplay: true
            , smartSpeed: 500
            , animateOut: 'fadeOut'
        });
        owl.on('changed.owl.carousel', function (event) {
            var item = event.item.index - 2; // Position of the current item
            $('h5').removeClass('animated fadeInLeft');
            $('h1').removeClass('animated fadeInRight');
            $('p').removeClass('animated fadeInUp');
            $('.butn').removeClass('animated zoomIn');
            $('.owl-item').not('.cloned').eq(item).find('h5').addClass('animated fadeInLeft');
            $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInRight');
            $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('.butn').addClass('animated zoomIn');
        });
    });
    // img zoom
    $(".img-zoom").magnificPopup({
            type: "image"
            , closeOnContentClick: !0
            , mainClass: "mfp-fade"
            , gallery: {
                enabled: !0
                , navigateByImgClick: !0
                , preload: [0, 1]
            }
        })
    // Button
    var buttons = document.querySelectorAll(".btn .fl-btn");
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.addEventListener("click", function () {
            if (!button.classList.contains("active")) button.classList.add("active");
            else button.classList.remove("active");
        });
    }
    
})(jQuery);