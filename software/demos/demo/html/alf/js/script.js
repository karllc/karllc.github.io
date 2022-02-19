(function ($) {
	"use strict";
	var template = {
		init: function () {
			this.cacheDom();
			this.bindEvents();
			this.navOverlay();
			this.enablesorting();
		},
		cacheDom: function(){
			this._menuTrigger = $('.alf-hamburger-trigger');
			this._overlayMenuHolder = $('.alf-nav-overlay');
			this._overlayMenuClose = $('.alf-button-nav-overlay-close');
			this.menuLinks = $('.alf-nav-overlay-main-nav li a');
			this._mainMenu = $('.alf-overlay-menu');
			this.pageWrapper = $('#alf-page-wrapper');
			this._body = $('body');

		},
		bindEvents: function(){
			var self = this;
			self.showMore();
		},
		navOverlay: function() {
			var self = this;
			if(self._mainMenu.length > 0) {
				var closeMenu = function() {
					self._overlayMenuHolder.removeClass('is-active');
					self._overlayMenuHolder.addClass('alf-nav-overlay-closed');
					self._menuTrigger.removeClass('is-active');
					setTimeout(function(){self._body.css('overflow','');}, 700);
				}
				var openMenu = function() {
					self._overlayMenuHolder.addClass('is-active');
					$('.menu').addClass('is-active');
					self._overlayMenuHolder.removeClass('alf-nav-overlay-closed');
					self._menuTrigger.addClass('is-active');
					self._body.css('overflow','hidden');
				}
				var toggleOpen = function(){
					if( self._overlayMenuHolder.hasClass('is-active') ){
						closeMenu();
					}
					else {
						openMenu();
					}
				};
				/* open menu trigger */
				self._menuTrigger.on('click', function(e){
				 	$(window).trigger('resize');
				 	toggleOpen();
				});
				/* Close Button */
				self._overlayMenuClose.on('click', function(e){
					toggleOpen();
				});
				/* Close menu if the menu links are clicked */
				self.menuLinks.on('click', function(e) {
					self._mainMenu.find('li .active').removeClass('active');
					$(this).addClass('active');
					toggleOpen();
				});
			}
		},
		showMore: function() {
			$(document).on( 'click', '.alf-more-trigger', function(event){
				event.preventDefault();
				if ($('.alf-show-more-container').hasClass('visible')) {
					$('.alf-show-more-container').toggleClass('animated');
					$('.alf-show-more-container').removeClass('visible');
				} else {
					$('.alf-show-more-container').addClass('visible');
					$('.alf-show-more-container').removeClass('animated');
					$('.alf-more-wrapper').addClass('hidden');
				}
			})

		},
		enablesorting: function() {
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
					    $('.shop-alf-more-trigger').hide();
					  }
				}
				$('.shop-alf-more-trigger').on('click', function (e) {
					  e.preventDefault();
						var next_items = 9;
					  showNextItems(next_items);
				});
			});
		},
	};
    
    /* Swiper slider */
     if(window.innerWidth < 1200) {
        new Swiper(".swiper-container",{
            direction: "horizontal",
            slidesPerView: 1,
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
            paginationClickable: !0,
            spaceBetween: 0,
            autoplay: 7000,
            loop: !0
        })
    } else {
        new Swiper(".swiper-container",{
            direction: "horizontal",
            slidesPerView: 1,
            parallax: !0,
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
            paginationClickable: !0,
            spaceBetween: 0,
            speed: 3000,
            parallax: !0,
            autoplay: 7000,
            loop: !0
        })
    }
    
    /* Button */
    var buttons = document.querySelectorAll(".alf-link .alf-more-trigger .alf-blog-item-overlay-more");
    for(var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      button.addEventListener("click", function() {
        if(!button.classList.contains("active"))
          button.classList.add("active");
        else
          button.classList.remove("active");
      });
    }
    
	template.init();
})(jQuery);
