var AnimateScroll = function (node, opt) {
    var self = this;

    self.opt = opt || {};
    self.option = Object.assign({
        indicator: '[data-indicator]',
        link: '[data-link="anchor"]',
        stepIndicator: 42,
        transition: 800
    }, self.opt);

    self.node = node;
    self.indicator = self.node.querySelector(self.option.indicator);
    self.indicator.style.transition = self.option.transition + 'ms';
    self.links = self.node.querySelectorAll(self.option.link);

    [].forEach.call(self.links, function (link, ind) {
        if (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var href = this.getAttribute('href');
                $('html, body').animate( { scrollTop: $( href ).offset().top }, self.option.transition );
                $(self.option.link).removeClass('active');
                this.classList.add('active');
                self.indicator.style.top = ind * self.option.stepIndicator + 'px';
            })
        }
    })
};

var newScroll = new AnimateScroll(document.querySelector('.product-menu'));
