import Swiper from './swiper';

function initCarousel() {
    var carouselGoods = new Swiper('.carousel-goods', {
        loop: true,
        loopAdditionalSlides: 3,
        speed: 600,
        navigation: {
            nextEl: '.more-goods-navigation .navigation-button-next',
            prevEl: '.more-goods-navigation .navigation-button-prev',
        },
        spaceBetween: 30,
        slidesPerView: 3,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    var carouselReview = new Swiper('.carousel-review', {
        loop: true,
        loopAdditionalSlides: 2,
        speed: 600,
        navigation: {
            nextEl: '.carousel-review-navigation .navigation-button-next',
            prevEl: '.carousel-review-navigation .navigation-button-prev',
        },
        spaceBetween: 30,
        slidesPerView: 1
    });
}

initCarousel();

function moveMenu() {
    var btnMenu = document.querySelector('.header-button-mob-menu');
    var menu = document.querySelector('.header-menu');
    var substrate = document.querySelector('.substrate-page');
    var transition = 200;
    menu.open = false;

    function openMenu() {
        menu.open = true;
        menu.style.display = 'block';
        substrate.style.display = 'block';

        setTimeout(function () {
            menu.classList.add('open');
            substrate.classList.add('open');
            btnMenu.classList.add('open');
        },0);
    }

    function closeMenu() {
        menu.open = false;
        menu.classList.remove('open');
        substrate.classList.remove('open');
        btnMenu.classList.remove('open');

        setTimeout(function () {
            menu.style.display = '';
            substrate.style.display = '';
        },transition);
    }

    function toggleOpenMenu() {
        if (menu.open) {
            closeMenu();

        } else {
            openMenu();
        }
    }

    btnMenu.addEventListener('click', toggleOpenMenu);
    substrate.addEventListener('click', closeMenu);
}

moveMenu();
