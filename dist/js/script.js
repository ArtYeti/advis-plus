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
        slidesPerView: 5,
        spaceBetween: 13,
        navigation: {
            nextEl: '.partners-button-next',
            prevEl: '.partners-button-prev',
        },
        loop: true
    }); 
    var servicesSlider = new Swiper('.services-slider__slider', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.services-block-button-next',
            prevEl: '.services-block-button-prev',
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
    })
    	
});

$(document).mouseup(function(e) { 

});

$(document).on('keydown', function(e) {

});
