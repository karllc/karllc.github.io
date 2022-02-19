(function () {
    "use strict";
    var FDA = {
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.initSlider();
            this.navOverlay();
            this.enableGridGallery();
            this.enablePopupGallery();
        }
        , cacheDom: function () {
            this._body = $('body');
            this.FdInstaCarouselSlider = $('.fd-insta-carousel-slider');
            this.FdInstaSlider = $('.fd-insta-slider');
            this.FdMenuTrigger = $('.fd-hamburger-trigger');
            this.FdMainMenu = $('.fd-nav-overlay-main-nav');
            this.FdOverlayMenuHolder = $('.fd-nav-overlay');
            this.FdOverlayMenuClose = $('.fd-nav-overlay-close');
            this.FdMenuLinks = $('.fd-nav-overlay-main-nav li a');
            this.FdGalleryTabs = $('.fd-toolbar-item');
            this.FdGalleryItem = $('.fd-gallery-item');
        }
        , bindEvents: function () {
            var self = this;
            this.FdGalleryTabs.on('click', self.changeActiveTab);
            this.FdGalleryTabs.on('click', self.addGalleryFilter);
            $(window).on('load', self.enablePreloader);
        }
        , /* popup gallery */
        enablePopupGallery: function () {
            $('.fd-popup-gallery').each(function () {
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
            var preloader = $('#fd-page-loading');
            if (preloader.length > 0) {
                preloader.fadeOut("slow", function () {
                    preloader.remove();
                });
            }
        }
        , /* gallery tab */
        changeActiveTab: function () {
            $(this).closest('.fd-gallery-toolbar').find('.active').removeClass('active');
            $(this).addClass('active');
        }
        , /* gallery filter */
        addGalleryFilter: function () {
            var value = $(this).attr('data-filter');
            if (value === 'all') {
                FDA.FdGalleryItem.show('3000');
            }
            else {
                FDA.FdGalleryItem.not('.' + value).hide('3000');
                FDA.FdGalleryItem.filter('.' + value).show('3000');
            }
        }
        , /* slider */
        initSlider: function () {
            var self = this;

            /* insta slider */
            self.FdInstaCarouselSlider.slick({
                infinite: true
                , slidesToShow: 1
                , slidesToScroll: 1
                , arrows: false
                , fade: true
                , autoplay: true
            });
            self.FdInstaSlider.slick({
                infinite: true
                , arrows: true
                , slidesToShow: 5
                , slidesToScroll: 1
                , responsive: [
                    {
                        breakpoint: 1200
                        , settings: {
                            slidesToShow: 4
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
            if (self.FdMainMenu.length > 0) {
                var closeMenu = function () {
                    self.FdOverlayMenuHolder.removeClass('is-active');
                    self.FdOverlayMenuHolder.addClass('fd-nav-overlay-closed');
                    self.FdMenuTrigger.removeClass('is-active');
                    setTimeout(function () {
                        self._body.css('overflow', '');
                    }, 700);
                };
                var openMenu = function () {
                    self.FdOverlayMenuHolder.addClass('is-active');
                    self.FdOverlayMenuHolder.removeClass('fd-nav-overlay-closed');
                    self.FdMenuTrigger.addClass('is-active');
                    self._body.css('overflow', 'hidden');
                };
                var toggleOpen = function () {
                    if (self.FdOverlayMenuHolder.hasClass('is-active')) {
                        closeMenu();
                    }
                    else {
                        openMenu();
                    }
                };
                /* Open menu trigger */
                self.FdMenuTrigger.on('click', function (e) {
                    e.preventDefault();
                    toggleOpen();
                });
                /* Close Button */
                self.FdOverlayMenuClose.on('click', function (e) {
                    e.preventDefault();
                    toggleOpen();
                });
                /* Close menu if the menu links are clicked */
                self.FdMenuLinks.on('click', function (e) {
                    self.FdMainMenu.find('li .active').removeClass('active');
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
                });
            }
        }
        , /* ======= grid gallery ======= */
        enableGridGallery: function () {
            $('.fd-grid-gallery').each(function (i, el) {
                var item = $(el).find('.fd-grid-item');
                $(el).masonry({
                    itemSelector: '.fd-grid-item'
                    , columnWidth: '.fd-grid-item'
                    , horizontalOrder: true
                });
            });
        }
        };
    FDA.init();
})();