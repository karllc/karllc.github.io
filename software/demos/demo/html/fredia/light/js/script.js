(function () {
    "use strict";
    var ARC = {
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.totopButton();
            this.enablePopupGallery();
        }
        , cacheDom: function () {
            this.toTop = $('.totop');
            this._body = $('body');
            this.frediaGalleryTabs = $('.fredia-toolbar-item');
        }
        , bindEvents: function () {
            var self = this;
            this.frediaGalleryTabs.on('click', self.changeActiveTab);
            this.frediaGalleryTabs.on('click', self.addGalleryFilter);
            $(window).on('load', self.enablePreloader);
        }
        , /* popup gallery */
        enablePopupGallery: function () {
            $('.fredia-popup-gallery').each(function () {
                $(this).magnificPopup({
                    delegate: 'a'
                    , type: 'image'
                    , gallery: {
                        enabled: true
                    }
                });
            });
        }
        , /* preloader */
        enablePreloader: function () {
            var preloader = $('#fredia-page-loading');
            if (preloader.length > 0) {
                preloader.fadeOut("slow", function () {
                    preloader.remove();
                });
            }
        }
        , /* ======= toTop ======= */
        totopButton: function() {
			var self = this;

			/* Show totop button*/
			$(window).scroll(function(){
				var toTopOffset = self.toTop.offset().top;
				var toTopHidden = 1000;

				if (toTopOffset > toTopHidden) {
					self.toTop.addClass('totop-vissible');
				} else {
					self.toTop.removeClass('totop-vissible');
				}
			});

			/* totop button animation */
			if(self.toTop && self.toTop.length > 0){
				self.toTop.on('click',function (e){
					e.preventDefault();
					$( 'html, body').animate( {scrollTop: 0 }, 'slow' );
				});
			}
		}
    };
    var header = $(".start-style");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 10) {
            header.removeClass('start-style').addClass("scroll-on");
        }
        else {
            header.removeClass("scroll-on").addClass('start-style');
        }
    });
    // Sections Background Image
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    
    // Blog owlCarousel
    $('.blog-grid .owl-carousel').owlCarousel({
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
    
    // Team owlCarousel
    $('.team .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: false,
        autoplay: false,
        smartSpeed: 500,
        responsiveClass: true,
        responsive:{
            0:{
                items:1
            },
            700:{
                items:2
            },
            1000:{
                items:4
            }
        }
    });
    
    // Awards owlCarousel
    $('.awards .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
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
                items: 5
            }
        }
    });
    
    // Price owlCarousel
    $('.price .owl-carousel').owlCarousel({
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
    ARC.init();
})();

//  ======= Swiper slider 
var parallaxSlider;
var parallaxSliderOptions = {
    speed: 2000
    , autoplay: true
    , parallax: true
    , loop: true
    , pagination: {
        el: '.slider .parallax-slider .swiper-pagination'
        , clickable: true
    }
    , on: {
        init: function () {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
                $(swiper.slides[i]).find('.bg-img').attr({
                    'data-swiper-parallax': 0.75 * swiper.width
                });
            }
        }
        , resize: function () {
            this.update();
        }
    }
    , pagination: {
        el: '.slider .parallax-slider .swiper-pagination'
        , type: 'fraction'
    , }
    , navigation: {
        nextEl: '.slider .parallax-slider .next-ctrl'
        , prevEl: '.slider .parallax-slider .prev-ctrl'
    }
};
parallaxSlider = new Swiper('.slider .parallax-slider', parallaxSliderOptions);
