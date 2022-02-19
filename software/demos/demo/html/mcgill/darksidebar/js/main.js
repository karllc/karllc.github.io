(function () {
    'use strict';
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        }
        , BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        }
        , iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }
        , Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        }
        , Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        }
        , any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    // Full Height
    var fullHeight = function () {
        if (!isMobile.any()) {
            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function () {
                $('.js-fullheight').css('height', $(window).height());
            });
        }
    };
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
    // Burger Menu 
    var burgerMenu = function () {
        $('.js-mcgill-nav-toggle').on('click', function (event) {
            event.preventDefault();
            var $this = $(this);
            if ($('body').hasClass('offcanvas')) {
                $this.removeClass('active');
                $('body').removeClass('offcanvas');
            }
            else {
                $this.addClass('active');
                $('body').addClass('offcanvas');
            }
        });
    };
    // outside of offcanvass
    var mobileMenuOutsideOn = function () {
        $(document).on(function (e) {
            var container = $("#mcgill-aside, .js-mcgill-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvas')) {
                    $('body').removeClass('offcanvas');
                    $('.js-mcgill-nav-toggle').removeClass('active');
                }
            }
        });
        $(window).scroll(function () {
            if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('.js-mcgill-nav-toggle').removeClass('active');
            }
        });
    };
    // Sub Menu 
    $('#mcgill-main-menu li.mcgill-sub>a').on('click', function () {
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp();
        }
        else {
            element.addClass('open');
            element.children('ul').slideDown();
            element.siblings('li').children('ul').slideUp();
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp();
        }
    });
    $('#mcgill-main-menu>ul>li.mcgill-sub>a').append('<span class="holder"></span>');
    // Slider
    var sliderMain = function () {
        $('#mcgill-hero .flexslider').flexslider({
            animation: "fade"
            , slideshowSpeed: 7000
            , directionNav: true
            , start: function () {
                setTimeout(function () {
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            }
            , before: function () {
                setTimeout(function () {
                    $('.slider-text').removeClass('animated fadeInUp');
                    $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
                }, 500);
            }
        });
    };
    // Sticky 
    var stickyFunction = function () {
        var h = $('.image-content').outerHeight();
        if ($(window).width() <= 992) {
            $("#sticky_item").trigger("sticky_kit:detach");
        }
        else {
            $('.sticky-parent').removeClass('stick-detach');
            $("#sticky_item").trigger("sticky_kit:detach");
            $("#sticky_item").trigger("sticky_kit:unstick");
        }
        $(window).resize(function () {
            var h = $('.image-content').outerHeight();
            $('.sticky-parent').css('height', h);
            if ($(window).width() <= 992) {
                $("#sticky_item").trigger("sticky_kit:detach");
            }
            else {
                $('.sticky-parent').removeClass('stick-detach');
                $("#sticky_item").trigger("sticky_kit:detach");
                $("#sticky_item").trigger("sticky_kit:unstick");
                $("#sticky_item").stick_in_parent();
            }
        });
        $('.sticky-parent').css('height', h);
        $("#sticky_item").stick_in_parent();
    };
    // Document on load.
    $(function () {
        fullHeight();
        contentWayPoint();
        burgerMenu();
        mobileMenuOutsideOn();
        sliderMain();
        stickyFunction();
    });
    // Sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    // Testimonials owlCarousel
    $('.testimonials .owl-carousel').owlCarousel({
        loop:true,
        margin: 30,
        mouseDrag:true,
        autoplay:false,
        dots: false,
        nav: true,
        navText: ["<span class='lnr fa fa-angle-left'></span>","<span class='lnr fa fa-angle-right'></span>"],
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
                items:5
            }
        }
    });
    // Team owlCarousel
    $('.team .owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: false,
        dots: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                autoplay:true,
            },
            600:{
                items:2,
                autoplay:true,
            },
            1000:{
                items:3,
                autoplay:false,
            }
        }
    });
     // Accordion
    $(".accordion").on("click",".title", function () {
        $(this).next().slideDown();
        $(".accordion-info").not($(this).next()).slideUp();

    });
    $(".accordion").on("click",".item", function () {
        $(this).addClass("active").siblings().removeClass("active");

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
    // event binding 
    var buttons = document.querySelectorAll(".btn .btn-contact .ul1 .tags .accordion");
    for(var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      button.addEventListener("on", function() {
        if(!button.classList.contains("active"))
          button.classList.add("active");
        else
          button.classList.remove("active");
      });
    }

}());