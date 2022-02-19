(function () {
    "use strict";
    var karla = {
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.initSlider();
            this.navOverlay();
            this.totopButton();
            this.enablePopupGallery();
        }
        , cacheDom: function () {
            this.toTop = $('.totop');
            this._body = $('body');
            this.karlaHomepageSlider = $('.karla-slider');
            this.karlaInstaCarouselSlider = $('.insta-carousel-slider');
            this.karlaInstaSlider = $('.karla-insta-slider');
            this.karlaMenuTrigger = $('.karla-hamburger-trigger');
            this.karlaMainMenu = $('.karla-nav-overlay-main-nav');
            this.karlaOverlayMenuHolder = $('.karla-nav-overlay');
            this.karlaOverlayMenuClose = $('.karla-nav-overlay-close');
            this.karlaMenuLinks = $('.karla-nav-overlay-main-nav li a');
            this.karlaGalleryTabs = $('.karla-toolbar-item');
            this.karlaGalleryItem = $('.karla-gallery-item');
        }
        , bindEvents: function () {
            var self = this;
            this.karlaGalleryTabs.on('click', self.changeActiveTab);
            this.karlaGalleryTabs.on('click', self.addGalleryFilter);
            $(window).on('load', self.enablePreloader);
        }
        , /* popup gallery */
        enablePopupGallery: function () {
            $('.karla-popup-gallery').each(function () {
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
            var preloader = $('#karla-page-loading').delay(500);
            if (preloader.length > 0) {
                preloader.fadeOut("slow", function () {
                    preloader.remove();
                });
            }
        }
        , /* gallery tab */
        changeActiveTab: function () {
            $(this).closest('.karla-gallery-toolbar').find('.active').removeClass('active');
            $(this).addClass('active');
        }
        , /* gallery filter */
        addGalleryFilter: function () {
            var value = $(this).attr('data-filter');
            if (value === 'all') {
                karla.karlaGalleryItem.show('3000');
            }
            else {
                karla.karlaGalleryItem.not('.' + value).hide('3000');
                karla.karlaGalleryItem.filter('.' + value).show('3000');
            }
        }
        , /* slider */
        initSlider: function () {
            var self = this;
            /* homepage slider */
            self.karlaHomepageSlider.slick({
                infinite: true
                , arrows: false
                , autoplay: true
                , speed: 3000
                , slidesToShow: 3
                , slidesToScroll: 3
                , responsive: [
                    {
                        breakpoint: 768
                        , settings: {
                            slidesToShow: 1
                            , slidesToScroll: 1
                            , speed: 1000
                        }
			}
			]
            });
        }
        , /* navigation overlay*/
        navOverlay: function () {
            var self = this;
            if (self.karlaMainMenu.length > 0) {
                var closeMenu = function () {
                    self.karlaOverlayMenuHolder.removeClass('is-active');
                    self.karlaOverlayMenuHolder.addClass('karla-nav-overlay-closed');
                    self.karlaMenuTrigger.removeClass('is-active');
                    setTimeout(function () {
                        self._body.css('overflow', '');
                    }, 700);
                };
                var openMenu = function () {
                    self.karlaOverlayMenuHolder.addClass('is-active');
                    self.karlaOverlayMenuHolder.removeClass('karla-nav-overlay-closed');
                    self.karlaMenuTrigger.addClass('is-active');
                    self._body.css('overflow', 'hidden');
                };
                var toggleOpen = function () {
                    if (self.karlaOverlayMenuHolder.hasClass('is-active')) {
                        closeMenu();
                    }
                    else {
                        openMenu();
                    }
                };
                /* Open menu trigger */
                self.karlaMenuTrigger.on('click', function (e) {
                    e.preventDefault();
                    toggleOpen();
                });
                /* Close Button */
                self.karlaOverlayMenuClose.on('click', function (e) {
                    e.preventDefault();
                    toggleOpen();
                });
                /* Close menu if the menu links are clicked */
                self.karlaMenuLinks.on('click', function (e) {
                    self.karlaMainMenu.find('li .active').removeClass('active');
                    $(this).addClass('active');
                    toggleOpen();
                    // Get the link id
                    var $link = $(this)
                        , linkAttribute = $link.attr('href')
                        , sectionId = linkAttribute.substring(linkAttribute.indexOf('#'))
                        , $section = $(sectionId);
                    if ($section.length !== 0) {
                        e.preventDefault();
                    }
                    var positionToTop = $section.offset().top
                        , topOffset = $link.data('offset');
                    // Check if link has offset
                    if (topOffset) {
                        positionToTop = positionToTop + topOffset;
                    }
                    // Scroll to element
                    $('html, body').animate({
                        scrollTop: positionToTop
                    }, 'slow');
                });
            }
        }
        , /* ======= toTop ======= */
        totopButton: function () {
            var self = this;
            /* Show totop button*/
            $(window).scroll(function () {
                var toTopOffset = self.toTop.offset().top;
                var toTopHidden = 1000;
                if (toTopOffset > toTopHidden) {
                    self.toTop.addClass('totop-vissible');
                }
                else {
                    self.toTop.removeClass('totop-vissible');
                }
            });
            /* totop button animation */
            if (self.toTop && self.toTop.length > 0) {
                self.toTop.on('click', function (e) {
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                });
            }
        }
    };
    // Scroll
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
    // Clients owlCarousel
    $('.clients .owl-carousel').owlCarousel({
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
    // Testimonials owlCarousel
    $('.testimonials .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , mouseDrag: true
        , autoplay: false
        , dots: true
        , nav: false
        , navText: ["<i class='lnr ti-angle-left'></i>", "<i class='lnr ti-angle-right'></i>"]
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
        // Accordion
    $(".accordion").on("click", ".title", function () {
        $(this).next().slideDown();
        $(".accordion-info").not($(this).next()).slideUp();
    });
    $(".accordion").on("click", ".item", function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
    
    $(document).ready(function() {
        $('.popup-youtube, .popup-vimeo, .popup-gmaps, .popup-custom').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
      });
    
    karla.init();
})();