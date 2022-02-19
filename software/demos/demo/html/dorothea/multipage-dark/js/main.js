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
    
    // Preloader 
    $("#preloader").fadeOut(800);
    $(".preloader-bg").delay(600).fadeOut(800);
    
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
    
    /* *** Menu Navigation *** */
    var OnePageNav = function () {
        var navToggler = $('.ann-js-dorothea-nav-toggle');
        $(".smoothscroll[href^='#'], #ann-navbar ul li a[href^='#']").on('click', function (e) {
            e.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, 'easeInOutExpo', function () {
                window.location.hash = hash;
            });
        });
        $("#ann-navbar ul li a[href^='#']").on('click', function (e) {
            if (navToggler.is(':visible')) {
                navToggler.click();
            }
        });
    };
    OnePageNav();
    $(window).scroll(function () {
        var $this = $(this)
            , st = $this.scrollTop()
            , navbar = $('.dorothea-header');
        if (st > 150) {
            if (!navbar.hasClass('scrolled')) {
                navbar.addClass('scrolled');
            }
        }
        if (st < 150) {
            if (navbar.hasClass('scrolled')) {
                navbar.removeClass('scrolled sleep');
            }
        }
        if (st > 350) {
            if (!navbar.hasClass('awake')) {
                navbar.addClass('awake');
            }
        }
        if (st < 350) {
            if (navbar.hasClass('awake')) {
                navbar.removeClass('awake');
                navbar.addClass('sleep');
            }
        }
    });
    $('.ann-js-dorothea-nav-toggle').on('click', function (e) {
        var $this = $(this);
        e.preventDefault();
        if ($('body').hasClass('menu-open')) {
            $this.removeClass('active');
            $('.dorothea-menu .dorothea-menu-inner > ul > li').each(function (i) {
                var that = $(this);
                setTimeout(function () {
                    that.removeClass('is-show');
                }, i * 100);
            });
            setTimeout(function () {
                $('.dorothea-menu').removeClass('dorothea-menu-show');
            }, 800);
            $('body').removeClass('menu-open');
        }
        else {
            $('.dorothea-menu').addClass('dorothea-menu-show');
            $this.addClass('active');
            $('body').addClass('menu-open');
            setTimeout(function () {
                $('.dorothea-menu .dorothea-menu-inner > ul > li').each(function (i) {
                    var that = $(this);
                    setTimeout(function () {
                        that.addClass('is-show');
                    }, i * 100);
                });
            }, 500);
        }
    });
    $('nav .dropdown').hover(function () {
        var $this = $(this);
        $this.addClass('show');
        $this.find('> a').attr('aria-expanded', true);
        $this.find('.dropdown-menu').addClass('show');
    }, function () {
        var $this = $(this);
        $this.removeClass('show');
        $this.find('> a').attr('aria-expanded', false);
        $this.find('.dropdown-menu').removeClass('show');
    });
    $('#dropdown04').on('show.bs.dropdown', function () {
        console.log('show');
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
    var sliderMain = function () {
        $('.flexslider').flexslider({
            animation: "fade"
            , slideshowSpeed: 5000
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
    // Document on load.
    $(function () {
        fullHeight();
        contentWayPoint();
        sliderMain();
    });
    // Show more
    $(function() {
			$(document).on( 'click', '.dorothea-more-trigger', function(event){
				event.preventDefault();
				if ($('.dorothea-show-more-container').hasClass('visible')) {
					$('.dorothea-show-more-container').toggleClass('animated');
					$('.dorothea-show-more-container').removeClass('visible');
				} else {
					$('.dorothea-show-more-container').addClass('visible');
					$('.dorothea-show-more-container').removeClass('animated');
					$('.dorothea-more-wrapper').addClass('hidden');
				}
			})

		});
    $(function() {
      var self = this;
			var $grid = $('.grid');

			$grid.each(function(){
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
					    $('.shop-dorothea-more-trigger').hide();
					  }
				}
				$('.shop-dorothea-more-trigger').on('click', function (e) {
					  e.preventDefault();
						var next_items = 9;
					  showNextItems(next_items);
				});
			});
		});
    // Progress-wrap
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
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    })
}());

// Accordion Box
  if ($(".faqs-box").length) {
    $(".faqs-box").on("click", ".acc-btn", function () {
      var outerBox = $(this).parents(".faqs-box");
      var target = $(this).parents(".accordion");

      if ($(this).next(".acc-content").is(":visible")) {
        //return false;
        $(this).removeClass("active");
        $(this).next(".acc-content").slideUp(300);
        $(outerBox).children(".accordion").removeClass("active-block");
      } else {
        $(outerBox).find(".accordion .acc-btn").removeClass("active");
        $(this).addClass("active");
        $(outerBox).children(".accordion").removeClass("active-block");
        $(outerBox).find(".accordion").children(".acc-content").slideUp(300);
        target.addClass("active-block");
        $(this).next(".acc-content").slideDown(300);
      }
    });
  }
