(function () {
    "use strict";
    var LFA = {
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.initSlider();
            this.navOverlay();
            this.totopButton();
            this.stickyHeader();
            this.enableGridGallery();
            this.enablePopupGallery();
        }
        , cacheDom: function () {
            this.toTop = $('.totop');
            this._body = $('body');
            this.LfaHomepageSlider = $('.Lfa-slider');
            this.LfaInstaCarouselSlider = $('.insta-carousel-slider');
            this.LfaInstaSlider = $('.Lfa-insta-slider');
            this.LfaMenuTrigger = $('.Lfa-hamburger-trigger');
            this.LfaMainMenu = $('.Lfa-nav-overlay-main-nav');
            this.LfaOverlayMenuHolder = $('.Lfa-nav-overlay');
            this.LfaOverlayMenuClose = $('.Lfa-nav-overlay-close');
            this.LfaMenuLinks = $('.Lfa-nav-overlay-main-nav li a');
            this.LfaGalleryTabs = $('.Lfa-toolbar-item');
            this.LfaGalleryItem = $('.Lfa-gallery-item');
        }
        , bindEvents: function () {
            var self = this;
            this.LfaGalleryTabs.on('click', self.changeActiveTab);
            this.LfaGalleryTabs.on('click', self.addGalleryFilter);
            $(window).on('load', self.enablePreloader);
        }
        , /* popup gallery */
        enablePopupGallery: function () {
            $('.Lfa-popup-gallery').each(function () {
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
            var preloader = $('#Lfa-page-loading');
            if (preloader.length > 0) {
                preloader.fadeOut("slow", function () {
                    preloader.remove();
                });
            }
        }
        , /* gallery tab */
        changeActiveTab: function () {
            $(this).closest('.Lfa-gallery-toolbar').find('.active').removeClass('active');
            $(this).addClass('active');
        }
        , /* gallery filter */
        addGalleryFilter: function () {
            var value = $(this).attr('data-filter');
            if (value === 'all') {
                LFA.LfaGalleryItem.show('3000');
            }
            else {
                LFA.LfaGalleryItem.not('.' + value).hide('3000');
                LFA.LfaGalleryItem.filter('.' + value).show('3000');
            }
        }
        , /* slider */
        initSlider: function () {
            var self = this;
            /* homepage slider */
            self.LfaHomepageSlider.slick({
                infinite: true
                , arrows: true
                , slidesToShow: 3
                , slidesToScroll: 3
                , responsive: [
                    {
                        breakpoint: 768
                        , settings: {
                            slidesToShow: 1
                            , slidesToScroll: 1
                        }
			}
			]
            });
            /* insta slider */
            self.LfaInstaCarouselSlider.slick({
                infinite: true
                , slidesToShow: 1
                , slidesToScroll: 1
                , arrows: false
                , fade: true
                , autoplay: true
            });
            self.LfaInstaSlider.slick({
                infinite: true
                , arrows: true
                , slidesToShow: 4
                , slidesToScroll: 2
                , responsive: [
                    {
                        breakpoint: 1200
                        , settings: {
                            slidesToShow: 3
                            , slidesToScroll: 1
                        }
			}
                    , {
                        breakpoint: 768
                        , settings: {
                            slidesToShow: 2
                            , slidesToScroll: 1
                        }
			}
                    , {
                        breakpoint: 480
                        , settings: {
                            slidesToShow: 1
                            , slidesToScroll: 1
                        }
			}
			]
            });
        }
        , /* navigation overlay*/
        navOverlay: function () {
            var self = this;
            if (self.LfaMainMenu.length > 0) {
                var closeMenu = function () {
                    self.LfaOverlayMenuHolder.removeClass('is-active');
                    self.LfaOverlayMenuHolder.addClass('Lfa-nav-overlay-closed');
                    self.LfaMenuTrigger.removeClass('is-active');
                    setTimeout(function () {
                        self._body.css('overflow', '');
                    }, 700);
                };
                var openMenu = function () {
                    self.LfaOverlayMenuHolder.addClass('is-active');
                    self.LfaOverlayMenuHolder.removeClass('Lfa-nav-overlay-closed');
                    self.LfaMenuTrigger.addClass('is-active');
                    self._body.css('overflow', 'hidden');
                };
                var toggleOpen = function () {
                    if (self.LfaOverlayMenuHolder.hasClass('is-active')) {
                        closeMenu();
                    }
                    else {
                        openMenu();
                    }
                };
                /* Open menu trigger */
                self.LfaMenuTrigger.on('click', function (e) {
                    e.preventDefault();
                    toggleOpen();
                });
                /* Close Button */
                self.LfaOverlayMenuClose.on('click', function (e) {
                    e.preventDefault();
                    toggleOpen();
                });
                /* Close menu if the menu links are clicked */
                self.LfaMenuLinks.on('click', function (e) {
                    self.LfaMainMenu.find('li .active').removeClass('active');
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
        
        , /* ======= sticky header ======= */
        stickyHeader: function () {
            var $el = $(".Lfa-sticky-header")
                , headerHeight = $el.find('.Lfa-navbar-container').outerHeight();
            $(window).on('scroll', function (event) {
                if ($(window).scrollTop() > headerHeight) {
                    $el.removeClass('header--not-sticked');
                    $el.addClass('header--is-sticked');
                }
                else {
                    $el.removeClass('header--is-sticked');
                    $el.addClass('header--not-sticked');
                }
            });
        }
        , /* ======= grid gallery ======= */
        enableGridGallery: function () {
            $('.Lfa-grid-gallery').each(function (i, el) {
                var item = $(el).find('.Lfa-grid-item');
                $(el).masonry({
                    itemSelector: '.Lfa-grid-item'
                    , columnWidth: '.Lfa-grid-item'
                    , horizontalOrder: true
                });
            });
        }
    };
    LFA.init();
})();