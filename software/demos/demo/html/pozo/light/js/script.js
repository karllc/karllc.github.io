(function ($) {
    "use strict";
    // Scroll
    var header = $(".start-style");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 10) {
            header.removeClass('start-style').addClass("scroll-on");
        } else {
            header.removeClass("scroll-on").addClass('start-style');
        }
    });
    //Animation
    $(document).ready(function () {
        $('body.hero-anime').removeClass('hero-anime');
    });
    //Menu On Hover
    $('body').on('mouseenter mouseleave', '.nav-item', function (e) {
        if ($(window).width() > 750) {
            var _d = $(e.target).closest('.nav-item');
            _d.addClass('show');
            setTimeout(function () {
                _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');
            }, 1);
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
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            } else {
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
        cacheDom: function () {
            this.pageWrapper = $('#pozo-page-wrapper');
            this._body = $('body');
        },
        bindEvents: function () {
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
            speed: 3000,
            parallax: !0,
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
    // Preloader 
    $(function () {
        var preloader = $('#Lfa-page-loading');
        if (preloader.length > 0) {
            preloader.fadeOut("slow", function () {
                preloader.remove();
            });
        }
    });
    // Show more
    $(function () {
        $(document).on('click', '.pozo-more-trigger', function (event) {
            event.preventDefault();
            if ($('.pozo-show-more-container').hasClass('visible')) {
                $('.pozo-show-more-container').toggleClass('animated');
                $('.pozo-show-more-container').removeClass('visible');
            } else {
                $('.pozo-show-more-container').addClass('visible');
                $('.pozo-show-more-container').removeClass('animated');
                $('.pozo-more-wrapper').addClass('hidden');
            }
        })
    });
    $(function () {
        var self = this;
        var $grid = $('.grid');
        $grid.each(function () {
            var $el = $(this);
            var initial_items = 9;

            function showNextItems(pagination) {
                var itemsMax = $('.visible_item').length;
                var itemsCount = 0;
                $('.visible_item').each(function () {
                    if (itemsCount < pagination) {
                        $(this).removeClass('visible_item');
                        itemsCount++;
                    }
                });
                if (itemsCount >= itemsMax) {
                    $('.shop-pozo-more-trigger').hide();
                }
            }
            $('.shop-pozo-more-trigger').on('click', function (e) {
                e.preventDefault();
                var next_items = 9;
                showNextItems(next_items);
            });
        });
    });
})(jQuery);