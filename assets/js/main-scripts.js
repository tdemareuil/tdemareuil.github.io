(function($) {
    "use strict";
    var MIRO = {};

    /*====== Preloader ======*/
    //Preloader
    var preloader = $(".preloader");
    $(window).on("load", function() {
        var preloaderFadeOutTime = 500;

        function hidePreloader() {
            preloader.fadeOut(preloaderFadeOutTime);
        }

        hidePreloader();
    });

    /*====== Sidenav - Side Navigation Menu ======*/
    MIRO.Sidenav = function() {
        var header = $(".site-header");
        var sidenav = $(".site-sidenav");
        header.on("click", ".button-open-sidenav", function() {
            $(".site-sidenav").addClass("active");
        });
        sidenav.on("click", ".button-close-sidenav, .sidenav-close, .sidenav-menu a", function() {
            $(".site-sidenav").removeClass("active");
        });
    };

    /*====== Data Filters Setting ======*/
    MIRO.DataFilters = function() {
        var links = $(".data-filters-links");
        links.on("click", "li", function() {
            var links = $(".data-filters-links li");
            var items = $(".data-filters-items li");
            var filter = $(this).attr("data-filter");
            links.removeClass("active");
            $(this).addClass("active");
            if (filter == "all") {
                items.show(600);
            } else {
                items.hide();
                $(".data-filters-items li[data-filter=" + filter + "]").show(600);
            }
        });
    };

    /*====== Magnigic Popup Js  ======*/
    MIRO.Gallery = function() {
        var gallery = $(".portfolio-gallery");
        gallery.magnificPopup({
            type: "image",
            delegate: ".portfolio-zoom a",
            closeBtnInside: false,
            closeOnContentClick: true,
            gallery: {
                enabled: true
            }
        });
    };

    /*====== PagePiling ======*/
    MIRO.PageScrollEffect = function() {
        var pagepiling = $("#site-wrapper");
        pagepiling.pagepiling({
            menu: ".site-header .header-menu",
            direction: "vertical",
            verticalCentered: true,
            sectionsColor: [],
            anchors: ["home", "about", "resume", "services", "portfolio", "testimonials", "blog", "contact"],
            scrollingSpeed: 700,
            easing: "swing",
            loopBottom: false,
            loopTop: false,
            css3: true,
            navigation: {
                position: "right"
            },
            normalScrollElements: null,
            normalScrollElementTouchThreshold: 5,
            touchSensitivity: 5,
            keyboardScrolling: true,
            sectionSelector: ".section",
            animateAnchor: true,
            // events
            afterRender: function() {},
            afterLoad: function(anchorLink, index) {}
        });
    };

    /*====== Owl Carousel ======*/
    MIRO.Slider1 = function() {
        var slider = $(".carousel-blog-1");
        slider.owlCarousel({
            nav: true,
            loop: false,
            dots: true,
            items: 3,
            margin: 30,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
        });
    };

    MIRO.Slider2 = function() {
        var slider = $(".carousel-testimonials-1");
        slider.owlCarousel({
            nav: false,
            loop: true,
            dots: true,
            items: 1,
            responsiveClass: true
        });
    };

    MIRO.Slider3 = function() {
        var slider = $(".carousel-services-1");
        slider.owlCarousel({
            nav: false,
            loop: false,
            dots: true,
            items: 4,
            responsive: {
                1: {
                    items: 1
                },
                570: {
                    items: 2,
                    loop: true,
                    center: true,
                    margin: 30
                },
                768: {
                    items: 2,
                    margin: 30,
                    loop: true,
                    center: true
                },
                992: {
                    items: 2,
                    margin: 30,
                    center: true
                },
                1200: {
                    items: 4,
                    loop: true,
                    center: true,
                    margin: 30
                }
            }
        });
    };

    MIRO.SliderHero = function() {
        var slider = $(".carousel-hero");
        slider.owlCarousel({
            nav: true,
            dots: true,
            loop: true,
            autoplay: true,
            smartSpeed: 1500,
            autoplayTimeout: 7500,
            items: 1
        });
    };

    /*====== Particles one trigger ======*/
    MIRO.ParticlesOne = function() {
        if ($("#particles-js-one")[0]) {
            particlesJS("particles-js-one", {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 700
                        }
                    },
                    color: {
                        value: "#ffffff"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 5
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 0.1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 10,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    };

    MIRO.Typed = function() {
        if ($("#type")[0]) {
            var element = new Typed("#type", {
                strings: ["a Data Scientist", "an X-HEC Graduate", "Curious and Creative!"],
                typeSpeed: 100,
                backSpeed: 20,
                loop: true
            });
        }
    };

    MIRO.Typed1 = function() {
        if ($("#type1")[0]) {
            var element = new Typed("#type1", {
                strings: ["a Data Scientist", "an X-HEC Graduate", "Curious and Creative!"],
                typeSpeed: 100,
                backSpeed: 20,
                loop: true
            });
        }
    };

    /*====== Particles two trigger ======*/
    MIRO.ParticlesTwo = function() {
        if ($("#particles-js-two")[0]) {
            particlesJS("particles-js-two", {
                particles: {
                    number: {
                        value: 170,
                        density: {
                            enable: true,
                            value_area: 300
                        }
                    },
                    color: {
                        value: "#fff"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 5
                        },
                        image: {
                            src: "img/github.svg",
                            width: 100,
                            height: 100
                        }
                    },
                    opacity: {
                        value: 0.6,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.5,
                            sync: false
                        }
                    },
                    size: {
                        value: 5,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: false,
                        distance: 500,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 2
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: "bottom",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "bubble"
                        },
                        onclick: {
                            enable: true,
                            mode: "repulse"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 4,
                            duration: 0.3,
                            opacity: 1,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    };
    MIRO.ParticlesThree = function() {
        if ($("#particles-js-three")[0]) {
            particlesJS("particles-js-three", {
                particles: {
                    number: {
                        value: 63,
                        density: {
                            enable: true,
                            value_area: 631.3181133058181
                        }
                    },
                    color: {
                        value: "#ffffff"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 7
                        },
                        image: {
                            src: "img/github.svg",
                            width: 100,
                            height: 100
                        }
                    },
                    opacity: {
                        value: 0.6012795228245711,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 4,
                            size_min: 0.3,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: false,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 600
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "bubble"
                        },
                        onclick: {
                            enable: true,
                            mode: "repulse"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 250,
                            size: 0,
                            duration: 2,
                            opacity: 0,
                            speed: 3
                        },
                        repulse: {
                            distance: 400,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    };
    MIRO.ParticlesFour = function() {
        if ($("#particles-js-four")[0]) {
            particlesJS("particles-js-four", {
                particles: {
                    number: {
                        value: 63,
                        density: {
                            enable: true,
                            value_area: 631.3181133058181
                        }
                    },
                    color: {
                        value: "#ffffff"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 7
                        },
                        image: {
                            src: "img/github.svg",
                            width: 100,
                            height: 100
                        }
                    },
                    opacity: {
                        value: 0.6012795228245711,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 4,
                            size_min: 0.3,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: false,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 600
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "bubble"
                        },
                        onclick: {
                            enable: true,
                            mode: "repulse"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 250,
                            size: 0,
                            duration: 2,
                            opacity: 0,
                            speed: 3
                        },
                        repulse: {
                            distance: 400,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    };

    $(window).on("load", function() {
        MIRO.WebLoad();
    });

    $(document).ready(function() {
        MIRO.PageScrollEffect(), MIRO.Slider1(), MIRO.Slider2(), MIRO.Slider3(), MIRO.SliderHero(), MIRO.ParticlesOne(), MIRO.ParticlesTwo(), MIRO.ParticlesThree(), MIRO.ParticlesFour(), MIRO.Sidenav(), MIRO.Gallery(), MIRO.DataFilters(), MIRO.Typed(), MIRO.Typed1();
    });
})(jQuery);
