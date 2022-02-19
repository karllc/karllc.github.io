/* ===================================================

[ CUSTOM SETTINGS ]

01. Preloader
02. Animations
03. ScrollIt
04. Navbar scrolling background 
05. Sections Background Image
06. Skill Progress
07. Awards owlCarousel
08. Team owlCarousel
09. Testimonials owlCarousel
10. Services owlCarousel
11. Services Page owlCarousel
12. Smooth Scrolling
13. Slider 
14. Img zoom
15. Button
16. Accordion
17. Scroll back to top

=================================================== */

(function ($) {
    "use strict";
    
    // Preloader
    $(window).on('load', function () {
        setTimeout(function () {
            $("#loader").fadeOut(400);
        }, 400);
    });
    
     // Animations
    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(function (direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function () {
                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            }
                            else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            }
                            else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            }
                            else {
                                el.addClass('fadeInUp animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, {
            offset: '85%'
        });
    };
    $(function () {
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
    
    // Skill Progress
    wind.on('scroll', function () {
        $(".skill-progress .progres").each(function () {
            var bottom_of_object = 
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = 
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if(bottom_of_window > bottom_of_object) {
                $(this).css({
                  width : myVal
                });
            }
        });
    });
    var c4 = $('.circle');
    var myVal = $(this).attr('data-value');
    $(".sk-progress .circle").each(function () {
        c4.circleProgress({
            startAngle: -Math.PI / 4 * 2,
            value: myVal,
            fill: {
              gradient: ["#7fa1c6", "#7fa1c6"]
            }
        });

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
                , dots: false
            }
            , 600: {
                items: 3
                , dots: false
            }
            , 1000: {
                items: 5
            }
        }
    });
    
    // Team owlCarousel
    $('.team .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , dots: true
        , mouseDrag: true
        , autoplay: false
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
                , dots: false
        
            }
            , 600: {
                items: 2
                , dots: false
        
            }
            , 1000: {
                items: 3
            }
        }
    });
    
    // Testimonials owlCarousel
    $('.testimonials .owl-carousel').owlCarousel({
        loop:true,
        center: true,
        margin: 15,
        mouseDrag:false,
        autoplay:true,
        dots: true,
        smartSpeed: 1500,
        responsiveClass:true,
        responsive:{
            0:{
                items:1
                , dots: false
            },
            700:{
                items:2
                , dots: false
            },
            1000:{
                items:3
            }
        }
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
                , dots: false

            , }
            , 600: {
                items: 2
                , dots: false
  
            }
            , 1000: {
                items: 3
            }
        }
    });
    
    // Services Page owlCarousel
    $('.services-page .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , mouseDrag: true
        , autoplay: false
        , dots: false
        , nav: true
        , navText: ['<i class="ti-arrow-left" aria-hidden="true"></i>', '<i class="ti-arrow-right" aria-hidden="true"></i>']
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 1
            }
            , 1000: {
                items: 1
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
            $('h5').removeClass('animated fadeInUp');
            $('h1').removeClass('animated fadeInUp');
            $('p').removeClass('animated fadeInUp');
            $('.btn').removeClass('animated zoomIn');
            $('.owl-item').not('.cloned').eq(item).find('h5').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
            $('.owl-item').not('.cloned').eq(item).find('.btn').addClass('animated zoomIn');
        });
    });
    
    // Img zoom
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
        button.addEventListener("on", function () {
            if (!button.classList.contains("active")) button.classList.add("active");
            else button.classList.remove("active");
        });
    }
    
    // Accordion
    $(".accordion").on("click", ".title", function () {
        $(this).next().slideDown();
        $(".accordion-info").not($(this).next()).slideUp();
    });
    $(".accordion").on("click", ".item", function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
    
    //  Scroll back to top
	var progressPath = document.querySelector('.progress-wrap path');
	var pathLength = progressPath.getTotalLength();
	progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
	progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
	progressPath.style.strokeDashoffset = pathLength;
	progressPath.getBoundingClientRect();
	progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
	var updateProgress = function () {
		var scroll = $(window).scrollTop();
		var height = $(document).height() - $(window).height();
		var progress = pathLength - (scroll * pathLength / height);
		progressPath.style.strokeDashoffset = progress;
	}
	updateProgress();
	$(window).scroll(updateProgress);
	var offset = 150;
	var duration = 550;
	jQuery(window).on('scroll', function () {
		if (jQuery(this).scrollTop() > offset) {
			jQuery('.progress-wrap').addClass('active-progress');
		}
		else {
			jQuery('.progress-wrap').removeClass('active-progress');
		}
	});
	jQuery('.progress-wrap').on('click', function (event) {
			event.preventDefault();
			jQuery('html, body').animate({
				scrollTop: 0
			}, duration);
			return false;
		})
    
})(jQuery);