(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        // Script for OffCanvas Menu Activation
        $(document).ready(function () {
            $('.bars').on('click', function () {
                $('.offcanva, .overlay').addClass('active');
            })

            $('.cross').on('click', function () {
                $('.offcanva, .overlay').removeClass('active');
            })

            $('.overlay').on('click', function () {
                $('.offcanva, .overlay').removeClass('active');
            })
        })
        $(document).ready(function () {
            $('select').niceSelect();
        });


        $(".reating-slider").owlCarousel({
            items: 4,
            nav: false,
            dot: true,
            loop: true,
            margin: 0,
            autoplay: false,
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,

                },
                768: {
                    items: 2,

                },
                992: {
                    items: 3,

                },
                1200: {
                    items: 4,

                }
            }


        });

        $(".happy-slider").owlCarousel({
            items: 4,
            nav: false,
            dot: true,
            loop: true,
            margin: 0,
            autoplay: false,
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,

                },
                768: {
                    items: 3,

                },
                1000: {
                    items: 4,

                }
            }


        });

        $(".auto-slider").owlCarousel({
            items: 4,
            nav: false,
            dot: true,
            loop: true,
            margin: 30,
            autoplay: false,
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,

                },
                768: {
                    items: 3,

                },
                1000: {
                    items: 4,

                }
            }


        });

        $(".cars-slider").owlCarousel({
            items: 4,
            nav: false,
            dot: true,
            loop: true,
            margin: 30,
            autoplay: false,
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,

                },
                768: {
                    items: 2,

                },
                1000: {
                    items: 4,

                }
            }


        });

        $(".car-info-explof-slider").owlCarousel({
            items: 2,
            nav: false,
            dot: false,
            loop: true,
            margin: 15,
            stagePadding: 40,
            autoplay: false,
            autoplayTimeout: 3000,
            smartSpeed: 1000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2,

                },
                768: {
                    items: 2,

                },
                1000: {
                    items: 4,

                }
            }


        });




    });


    jQuery(window).load(function () {

   
        

        $('.partner__active').slick({
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 4,
            dots: true,
            prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
            nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
            responsive: [{
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });

   


    });




}(jQuery));