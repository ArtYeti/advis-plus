$(document).ready(function () {
    var swiper = new Swiper('.company-mission__slider', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true
    });
    var partnersSlider = new Swiper('.partners-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        breakpoints: {
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1200: {
                slidesPerView: 4,
            },            
        },
        navigation: {
            nextEl: '.partners-button-next',
            prevEl: '.partners-button-prev'
        },
        loop: true
    }); 
    var servicesSlider = new Swiper('.services-slider__slider', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.services-block-button-next',
            prevEl: '.services-block-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
          },
        loop: true
    });
    var objectSlider = new Swiper('.object-slider_slider', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.object-slider-button-next',
            prevEl: '.object-slider-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },        
    });    
    var sreconstructionSlider = new Swiper('.reconstruction__slider', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.reconstruction__slider-button-next',
            prevEl: '.reconstruction__slider-button-prev',
        },
        loop: true
    });  
    
    $(".partners-button-next").on("click" , function() {
        partnersSlider.navigation.nextEl
    });
    
    $(".tabs__link").on("click", function() {
        var id = $(this).attr("data-tab")
        console.log(id)
        $(".tabs__link").removeClass("tabs__link--active");
        $(this).addClass("tabs__link--active");
        $(this).closest(".tabs").find(".tabs-content").removeClass("tabs-content--active");
        $(this).closest(".tabs").find(".tabs-content#"+id+"").addClass("tabs-content--active");
        $(".contacts__map").removeClass("contacts__map--active");
        $(".contacts__map#"+id+"").addClass("contacts__map--active");
    });
    var maxHeight = 0;
    $(".service-item_strong").each(function(){
      if ( $(this).height() > maxHeight ) 
      {
        maxHeight = $(this).height();
      }
    });
     
    $(".service-item_strong").height(maxHeight);

    $(".open-menu").on("click" , function() {
        $("body").toggleClass("open-menu-active")
        $("header .nav").toggleClass("nav--active")
    });
    if(innerWidth < 992) {
        $("[data-content=nav__dropdown] .nav__link").on("click" , function(event) {
            event.preventDefault()
            $(this).closest(".nav__item").find(".nav-submenu").show()
        })
    }
});

$(document).mouseup(function(e) { 

});

$(document).on('keydown', function(e) {

});
