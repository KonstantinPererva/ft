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

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}

function smoothScroll(eID) {
    console.log(currentYPosition());

    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}

var links = document.querySelectorAll('.product-menu-link');

[].forEach.call(links, function (link) {
    var eID = link.getAttribute('id');

    link.addEventListener('click', function () {
        smoothScroll(eID);
    })
});