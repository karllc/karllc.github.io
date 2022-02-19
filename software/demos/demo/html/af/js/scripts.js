(function ($) {
    "use strict";
    
    $(window).on('load', function () {
        $('body').addClass('loaded');
    });
    
    /* *** Header *** */
    $('#toggle').click(function () {
        $(this).toggleClass('active');
        $('#nbr-overlay').toggleClass('open');
        $('.nbr-header-section').toggleClass('nbr-menu-active');
    });
    
     // Menu  on click runction
    $(document).ready(function(){
        $(".nbr-hamburger-menu a").click(function(){
            $(".nbr-overlay").fadeToggle(200);
           $(this).toggleClass('nbr-overlay.open').toggleClass('nbr-overlay.close');
        });
    });
    $('.overlay').on('click', function(){
        $(".nbr-overlay").fadeToggle(200);   
        $(".nbr-hamburger-menu a").toggleClass('nbr-overlay.open').toggleClass('nbr-overlay.close');
        open = false;
    });

    /* *** Isotope Active *** */
    $('.nbr-portfolio-items').imagesLoaded(function () {
        
        // Add isotope on click function
        $('.nbr-portfolio-filter li').on('click', function () {
            $(".nbr-portfolio-filter li").removeClass("active");
            $(this).addClass("active");
            var selector = $(this).attr('data-filter');
            $(".nbr-portfolio-items").isotope({
                filter: selector
                , animationOptions: {
                    duration: 750
                    , easing: 'linear'
                    , queue: false
                , }
            });
            return false;
        });
        $(".nbr-portfolio-items").isotope({
            itemSelector: '.single-item'
            , layoutMode: 'masonry'
        , });
    });
    
    /* *** Testimonial Carousel *** */
    $('#testimonial-carousel').owlCarousel({
        loop: true
        , autoplay: true
        , smartSpeed: 500
        , items: 1
        , nav: false
    });
    
     /* *** Button *** */
    var buttons = document.querySelectorAll(".nbr-btn .nbr-btn2 .nbr-logo");
    for(var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      button.addEventListener("click", function() {
        if(!button.classList.contains("active"))
          button.classList.add("active");
        else
          button.classList.remove("active");
      });
    }
    
})(jQuery);