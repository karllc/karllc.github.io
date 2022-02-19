/* ----------------------------------------------------------------

[ Custom settings ]

01. Preloader
02. ScrollIt
03. Navbar scrolling background
04. Sections background image from data background
05. Isotope Active
06. Animations
07. YouTubePopUp
08. Parallax Slider 
09. Testimonials owlCarousel
10. Team owlCarousel
11. Scroll back to top
12. Slider
13. Accordion Box

------------------------------------------------------------------- */

$(function () {
	"use strict";
	
	// Preloader
	$("#preloader").fadeOut(900);
	$(".preloader-bg").delay(800).fadeOut(900);
	var wind = $(window);
	
	// ScrollIt
	$.scrollIt({
		upKey: 38, // key code to navigate to the next section
		downKey: 40, // key code to navigate to the previous section
		easing: 'swing', // the easing function for animation
		scrollTime: 600, // how long (in ms) the animation takes
		activeClass: 'active', // class given to the active nav element
		onPageChange: null, // function(pageIndex) that is called when page is changed
		topOffset: -70 // offste (in px) for fixed top navigation
	});
	
	// Navbar scrolling background
	wind.on("scroll", function () {
		var bodyScroll = wind.scrollTop()
			, navbar = $(".navbar")
			, logo = $(".navbar .logo> img");
		if (bodyScroll > 100) {
			navbar.addClass("nav-scroll");
			logo.attr('src', 'img/logo-light.png');
		}
		else {
			navbar.removeClass("nav-scroll");
			logo.attr('src', 'img/logo-light.png');
		}
	});
	// Close navbar-collapse when a  clicked
	$(".navbar-nav .dropdown-item a").on('click', function () {
		$(".navbar-collapse").removeClass("show");
	});
	
	// Sections background image from data background
	var pageSection = $(".bg-img, section");
	pageSection.each(function (indx) {
		if ($(this).attr("data-background")) {
			$(this).css("background-image", "url(" + $(this).data("background") + ")");
		}
	});
	
	// Isotope Active
	$('.savoye-project-items').imagesLoaded(function () {
		// Add isotope on click filter function
		$('.savoye-project-filter li').on('click', function () {
			$(".savoye-project-filter li").removeClass("active");
			$(this).addClass("active");
			var selector = $(this).attr('data-filter');
			$(".savoye-project-items").isotope({
				filter: selector
				, animationOptions: {
					duration: 750
					, easing: 'linear'
					, queue: false
				, }
			});
			return false;
		});
		$(".savoye-project-items").isotope({
			itemSelector: '.single-item'
			, layoutMode: 'masonry'
		, });
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
	
	//  YouTubePopUp
	$("a.vid").YouTubePopUp();
	
	// Parallax Slider 
	$(document).ready(function () {
		var owl = $('.parallax-header .owl-carousel');
		// Parallax slider owlCarousel
		$('.parallax-slider .owl-carousel').owlCarousel({
			items: 1
			, loop: true
			, dots: true
			, margin: 0
			, autoplay: true
			, slideSpeed: 100
			, autoplayTimeout: 4000
			, nav: false
			, navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>']
		});
		// Parallax slider-fade owlCarousel
		$('.parallax-slider-fade .owl-carousel').owlCarousel({
			items: 1
			, loop: true
			, dots: true
			, margin: 0
			, autoplay: true
			, slideSpeed: 100
			, autoplayTimeout: 4000
			, animateOut: 'fadeOut'
			, nav: false
			, navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>']
		});
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
            },
            700:{
                items:2
            },
            1000:{
                items:3
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
			}
			, 600: {
				items: 2
			}
			, 1000: {
				items: 3
			}
		}
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
	
	// Slider 
	$(document).ready(function () {
		var owl = $('.header .owl-carousel');
		// Slider owlCarousel
		$('.slider .owl-carousel').owlCarousel({
			items: 1
			, loop: true
			, dots: true
			, margin: 0
			, autoplay: true
			, autoplayTimeout: 6000
			, smartSpeed: 500
			, nav: false
			, navText: ['<i class="ti-arrow-left" aria-hidden="true"></i>', '<i class="ti-arrow-right" aria-hidden="true"></i>']
		});
		// Slider Fade owlCarousel
		$('.slider-fade .owl-carousel').owlCarousel({
			items: 1
			, loop: true
			, dots: true
			, margin: 0
			, autoplay: true
			, autoplayTimeout: 6000
			, smartSpeed: 500
			, animateOut: 'fadeOut'
			, nav: false
			, navText: ['<i class="ti-arrow-left" aria-hidden="true"></i>', '<i class="ti-arrow-right" aria-hidden="true"></i>']
		});
		owl.on('changed.owl.carousel', function (event) {
			var item = event.item.index - 2; // Position of the current item
			$('h6').removeClass('animated fadeInUp');
			$('h1').removeClass('animated fadeInUp');
			$('p').removeClass('animated fadeInUp');
			$('.btn').removeClass('animated fadeInUp');
			$('.owl-item').not('.cloned').eq(item).find('h6').addClass('animated fadeInUp');
			$('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInUp');
			$('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
			$('.owl-item').not('.cloned').eq(item).find('.btn').addClass('animated fadeInUp');
		});
	});
	
	// Accordion Box
	if ($(".accordion-box").length) {
		$(".accordion-box").on("click", ".acc-btn", function () {
			var outerBox = $(this).parents(".accordion-box");
			var target = $(this).parents(".accordion");
			if ($(this).next(".acc-content").is(":visible")) {
				//return false;
				$(this).removeClass("active");
				$(this).next(".acc-content").slideUp(300);
				$(outerBox).children(".accordion").removeClass("active-block");
			}
			else {
				$(outerBox).find(".accordion .acc-btn").removeClass("active");
				$(this).addClass("active");
				$(outerBox).children(".accordion").removeClass("active-block");
				$(outerBox).find(".accordion").children(".acc-content").slideUp(300);
				target.addClass("active-block");
				$(this).next(".acc-content").slideDown(300);
			}
		});
	}
});