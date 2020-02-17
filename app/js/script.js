$(document).ready(function () {
    var swiper = new Swiper('.company-mission__slider', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
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
    $(".partners-button-next").on("click" , function() {
        partnersSlider.navigation.nextEl
    })
    	
});

$(document).mouseup(function(e) { 

});

$(document).on('keydown', function(e) {

});
