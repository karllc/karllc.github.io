(function ($) {
	"use strict";
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
    // Document on load.
    $(function () {
        contentWayPoint();
    });
	var template = {
		init: function () {
			this.cacheDom();
			this.bindEvents();
		},
		cacheDom: function(){
			this.pageWrapper = $('#next-page-wrapper');
			this._body = $('body');

		},
		bindEvents: function(){
			var self = this;
		},
	};
    /* Swiper slider */
    if (window.innerWidth < 1200) {
        new Swiper(".swiper-container", {
            direction: "horizontal",
            slidesPerView: 1,
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
            paginationClickable: !0,
            spaceBetween: 0,
            speed: 3000,
            autoplay: false,
            loop: !0
        })
    } else {
        new Swiper(".swiper-container", {
            direction: "horizontal",
            slidesPerView: 1,
            parallax: !0,
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
            paginationClickable: !0,
            spaceBetween: 0,
            parallax: !0,
            speed: 3000,
            autoplay: false,
            loop: !0
        })
    };
    // Sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    // Team owlCarousel
    $('.team .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        autoplay: false,
        dots: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:2,
            }
        }
    });
    // Clients owlCarousel
    $('.clients .owl-carousel').owlCarousel({
        loop:true,
        margin: 60,
        mouseDrag:true,
        autoplay:true,
        dots: false,
        responsiveClass:true,
        responsive:{
            0:{
                margin: 10,
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:6
            }
        }
    });
    // Testimonials owlCarousel
    $('.testimonials .owl-carousel').owlCarousel({
        loop:true,
        margin: 30,
        mouseDrag:true,
        autoplay:true,
        dots: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2
            },
            1000:{
                items:2
            }
        }
    });
    // Project owlCarousel
    $('.projects .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , mouseDrag: true
        , autoplay: true
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
                items: 3
            }
        }
    });
    //  magnificPopup 
    $('.gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    // isotope Portfolio 
    $('.gallery').isotope({
      itemSelector: '.items'
    });
    var $gallery = $('.gallery').isotope({});
    // filter items on button click
    $('.filtering').on( 'click', 'span', function() {
        var filterValue = $(this).attr('data-filter');
        $gallery.isotope({ filter: filterValue });
    });
    $('.filtering').on( 'click', 'span', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
	template.init();
    $(function () {
        contentWayPoint();
    });
    $(function () {
            var preloader = $('#Lfa-page-loading');
            if (preloader.length > 0) {
                preloader.fadeOut("slow", function () {
                    preloader.remove();
                });
            }
        });
})(jQuery);