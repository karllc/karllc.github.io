(function () {
    "use strict";
    var EE = {
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.navOverlay();
            this.stickyHeader();
            this.enableGridGallery();
            this.enablePopupGallery();
        },
        cacheDom: function () {
            this._body = $('body');
            this.eeMenuTrigger = $('.ee-hamburger-trigger');
            this.eeMainMenu = $('.ee-nav-overlay-main-nav');
            this.eeOverlayMenuHolder = $('.ee-nav-overlay');
            this.eeOverlayMenuClose = $('.ee-nav-overlay-close');
            this.eeMenuLinks = $('.ee-nav-overlay-main-nav li a');
            this.eeGalleryTabs = $('.ee-toolbar-item');
            this.eeGalleryItem = $('.ee-gallery-item');
        },
        bindEvents: function () {
            var self = this;
            this.eeGalleryTabs.on('click', self.changeActiveTab);
            this.eeGalleryTabs.on('click', self.addGalleryFilter);
        },
        /* ======= popup gallery ======= */
        enablePopupGallery: function () {
            $('.ee-popup-gallery').each(function () {
                $(this).magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            });
        },
        /* ======= gallery tab ======= */
        changeActiveTab: function () {
            $(this).closest('.ee-gallery-toolbar').find('.active').removeClass('active');
            $(this).addClass('active');
        },
        /* ======= gallery filter ======= */
        addGalleryFilter: function () {
            var value = $(this).attr('data-filter');
            if (value === 'all') {
                EE.eeGalleryItem.show('3000');
            } else {
                EE.eeGalleryItem.not('.' + value).hide('3000');
                EE.eeGalleryItem.filter('.' + value).show('3000');
            }
        },
        /* ======= navigation overlay ======= */
        navOverlay: function () {
            var self = this;
            if (self.eeMainMenu.length > 0) {
                var closeMenu = function () {
                    self.eeOverlayMenuHolder.removeClass('is-active');
                    self.eeOverlayMenuHolder.addClass('ee-nav-overlay-closed');
                    self.eeMenuTrigger.removeClass('is-active');
                    setTimeout(function () {
                        self._body.css('overflow', '');
                    }, 700);
                };
                var openMenu = function () {
                    self.eeOverlayMenuHolder.addClass('is-active');
                    self.eeOverlayMenuHolder.removeClass('ee-nav-overlay-closed');
                    self.eeMenuTrigger.addClass('is-active');
                    self._body.css('overflow', 'hidden');
                };
                var toggleOpen = function () {
                    if (self.eeOverlayMenuHolder.hasClass('is-active')) {
                        closeMenu();
                    } else {
                        openMenu();
                    }
                };
                /* Open menu trigger */
                self.eeMenuTrigger.on('click', function (e) {
                    e.preventDefault();
                    toggleOpen();
                });
                /* Close Button */
                self.eeOverlayMenuClose.on('click', function (e) {
                    e.preventDefault();
                    toggleOpen();
                });
                /* Close menu if the menu links are clicked */
                self.eeMenuLinks.on('click', function (e) {
                    self.eeMainMenu.find('li .active').removeClass('active');
                    $(this).addClass('active');
                    toggleOpen();
                    // Get the link id
                    var $link = $(this),
                        linkAttribute = $link.attr('href'),
                        sectionId = linkAttribute.substring(linkAttribute.indexOf('#')),
                        $section = $(sectionId);
                    if ($section.length !== 0) {
                        e.preventDefault();
                    }
                    var positionToTop = $section.offset().top,
                        topOffset = $link.data('offset');
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
        },
        /* ======= sticky header ======= */
        stickyHeader: function () {
            var $el = $(".ee-sticky-header"),
                headerHeight = $el.find('.ee-navbar-container').outerHeight();
            $(window).on('scroll', function (event) {
                if ($(window).scrollTop() > headerHeight) {
                    $el.removeClass('ee-header-not-sticked');
                    $el.addClass('ee-header-is-sticked');
                } else {
                    $el.removeClass('ee-header-is-sticked');
                    $el.addClass('ee-header-not-sticked');
                }
            });
        },
        /* ======= grid gallery ======= */
        enableGridGallery: function () {
            $('.ee-grid-gallery').each(function (i, el) {
                var item = $(el).find('.ee-grid-item');
                $(el).masonry({
                    itemSelector: '.ee-grid-item',
                    columnWidth: '.ee-grid-item',
                    horizontalOrder: true
                });
            });
        }
    };
    $(".burgermenu").click(function () {
        $(".burger").toggleClass('burger-active');
        $('.nav').toggleClass('nav-active');
    });
    
    /* burger menu background hover color */
    // home grey
    $(".ee-nav-list-home").mouseover(function () {
        $('.ee-block-nav').addClass('grey');
    });
    $(".ee-nav-list-home").mouseleave(function () {
        $('.ee-block-nav').removeClass('grey');
    });
    // about khaki 
    $(".ee-nav-list-about").mouseover(function () {
        $('.ee-block-nav').addClass('khaki');
    });
    $(".ee-nav-list-about").mouseleave(function () {
        $('.ee-block-nav').removeClass('khaki');
    });
    // portfolio green
    $(".ee-nav-list-portfolio").mouseover(function () {
        $('.ee-block-nav').addClass('green');
    });
    $(".ee-nav-list-portfolio").mouseleave(function () {
        $('.ee-block-nav').removeClass('green');
    });
    // blog pink 
    $(".ee-nav-list-blog").mouseover(function () {
        $('.ee-block-nav').addClass('pink');
    });
    $(".ee-nav-list-blog").mouseleave(function () {
        $('.ee-block-nav').removeClass('pink');
    });
    // contact blue
    $(".ee-nav-list-contact").mouseover(function () {
        $('.ee-block-nav').addClass('blue');
    });
    $(".ee-nav-list-contact").mouseleave(function () {
        $('.ee-block-nav').removeClass('blue');
    });
    
    EE.init();
    
    jQuery(document).ready(function () {
        AOS.init({
            duration: 50,
        })
    })
    
})();
