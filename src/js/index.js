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

// open dropdown block

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slide = function () {
        function Slide(node, opt) {
            _classCallCheck(this, Slide);

            this.opt = opt || {};
            this.option = Object.assign({
                btn: '[data-button]',
                box: '[data-box-dropdown]',
                indicator: '[data-indicator]',
                transition: 600,
                onOpen: null
            }, this.opt);
            this.node = node;
            this.btn = this.node.querySelector(this.option.btn);
            this.box = this.node.querySelector(this.option.box);
            this.indicator = this.node.querySelector(this.option.indicator);
            this.indicator.style.transition = this.option.transition + 'ms';
            this.heightBox = null;
            this.open = false;
        }

        _createClass(Slide, [{
            key: "down",
            value: function down() {
                var _this = this;

                function getSizeBoxes(elem) {
                    var elemWidth = elem.getBoundingClientRect().right - elem.getBoundingClientRect().left;
                    var elemHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;
                    return {
                        width: elemWidth,
                        height: elemHeight
                    };
                }

                var downBlock = new Promise(function (resolve, reject) {
                    _this.box.style.height = '';
                    _this.box.style.opacity = '0';
                    _this.box.style.display = 'block';
                    _this.heightBox = getSizeBoxes(_this.box).height;
                    _this.box.style.height = '0';
                    resolve();
                }).then(function () {
                    setTimeout(function () {
                        _this.box.style.transition = _this.option.transition + 'ms';
                        _this.box.style.opacity = '1';
                        _this.box.style.height = _this.heightBox + 'px';
                        _this.indicator.style.transition = _this.option.transition + 'ms';

                        _this.indicator.classList.add('open');

                        _this.open = true;
                    }, 0);
                });
            }
        }, {
            key: "up",
            value: function up() {
                var _this2 = this;

                var upBlock = new Promise(function (resolve, reject) {
                    _this2.box.style.height = '0';
                    _this2.box.style.opacity = '0';

                    _this2.indicator.classList.remove('open');

                    resolve();
                }).then(function () {
                    setTimeout(function () {
                        _this2.box.style.display = 'none';
                        _this2.open = false;
                    }, _this2.option.transition);
                });
            }
        }]);

        return Slide;
    }();

var slides = document.querySelectorAll('.product-characteristics-column');
[].forEach.call(slides, function (el) {
    var slide = new Slide(el, {
        transition: 400
    });

    slide.toggle = function () {
        return slide.open ? slide.up() : slide.down();
    };

    slide.btn.addEventListener('click', slide.toggle);
});

//animate scroll
var AnimateScroll = function (node, opt) {
    var self = this;

    self.opt = opt || {};
    self.option = Object.assign({
        indicator: '[data-indicator]',
        link: '[data-link="anchor"]',
        stepIndicator: 42,
        transition: 600
    }, self.opt);

    self.node = document.querySelector(node);
    self.indicator = self.node.querySelector(self.option.indicator);
    self.links = self.node.querySelectorAll(self.option.link);

    self.initActiveLink = function () {
        self.indicator.style.transition = 200 + 'ms';

        [].forEach.call(self.links, function (link, ind) {
            var idSection = link.getAttribute('href');
            var nextLink = link[ind + 1];
            var idNextSection, nextSectionPosition;

            if (nextLink) {
                idNextSection = nextLink.getAttribute('href');
                nextSectionPosition = $(idNextSection).offset().top;
            }

            var sectionPositionTop = $(idSection).offset().top;
            var scroll = $(document).scrollTop();

            if (sectionPositionTop <= scroll + 30 || nextSectionPosition >= scroll) {
                $(self.option.link).removeClass('active');
                link.classList.add('active');
                self.indicator.style.top = ind * self.option.stepIndicator + 'px';
            }
        });
    };

    [].forEach.call(self.links, function (link, ind) {
        if (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                self.indicator.style.transition = self.option.transition + 'ms';

                window.removeEventListener('scroll', self.initActiveLink);

                var idSection = this.getAttribute('href');
                $('html, body').animate( { scrollTop: $( idSection ).offset().top }, self.option.transition );
                $(self.option.link).removeClass('active');
                this.classList.add('active');
                self.indicator.style.top = ind * self.option.stepIndicator + 'px';

                setTimeout(function () {
                    window.addEventListener('scroll', self.initActiveLink);
                }, self.option.transition + 50);
            })
        }
    });

    self.initActiveLink();

    window.addEventListener('scroll', self.initActiveLink);
};

if (document.querySelectorAll('.product-menu').length) {
    var animateScroll = new AnimateScroll('.product-menu', {
        transition: 800
    });
}

//quantity + -
var Quantity = function(node) {
    var self = this;
    self.quantity = node;
    self.btnMinus = node.querySelector('.quantity-minus');
    self.btnPlus = node.querySelector('.quantity-plus');
    self.field = node.querySelector('.quantity-input');

    self.errorInput = function() {
      self.val = parseInt(self.field.value, 10);

      if (self.val <= 1 || isNaN(self.val) ) {
          self.field.value = 1;

          self.errorVisibility();
      }

      return self.val;
    };

    self.successVisibility = function() {
        node.style.boxShadow = '0 0 6px #67c8df';

        setTimeout(function () {
            node.style.boxShadow = '';
        }, 600);
    };

    self.errorVisibility = function() {
        node.style.boxShadow = '0 0 6px #ff0000';

        setTimeout(function () {
            node.style.boxShadow = '';
        }, 600);
    };

    self.addUnit = function () {
        self.val = parseInt(self.field.value, 10);
        self.field.value = ++self.val;

        self.successVisibility();
    };

    self.removeUnit = function () {
      self.errorInput();

      setTimeout(function () {
          if (self.val <= 1) { return }

          self.field.value = --self.val;

          self.successVisibility();
      },0);
    };

    self.changeField = function() {
      self.errorInput();
    };

    self.init = function() {
      self.btnPlus.addEventListener('click', self.addUnit);
      self.btnMinus.addEventListener('click', self.removeUnit);
      self.field.addEventListener('input', self.changeField);
    };

    self.init();
};

if (document.querySelectorAll('.quantity').length) {
    var quantityList = [].slice.call(document.querySelectorAll('.quantity'));

    quantityList.forEach(function (quantity) {
        new Quantity(quantity);
    });
}
