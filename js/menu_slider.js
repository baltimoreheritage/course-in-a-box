(function($) {
    var template = '<div class="p2pu-panel-wrap" style="display: none">' +
        '<div class="panel-contents clearfix">' +
        '<div class="connect">' +
        '&nbsp;' +
        '</div>' +
        '<div class="connect">' +
        '<div class="connect-inner">' +
        '<h4>About</h4>' +
        '<ul class="unstyled list-unstyled">' +
        '<li>' +
        '<hr>' +
        '<a href="http://baltimoreheritage.org/about">Baltimore Heritage</a></li>' +
        '<li>' +
        '<hr>' +
        '<a href="http://baltimoreheritage.org/blog">Our Staff</a></li>' +
        '<li>' +
        '<hr>' +
        '<a href="http://baltimoreheritage.org/contact">Contact Us</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<div class="connect">' +
        '<div class="connect-inner">' +
        '<h4>Explore</h4>' +
        '<ul class="unstyled list-unstyled">' +
        '<li>' +
        '<hr>' +
        '<a href="http://explore.baltimoreheritage.org/items/browse">Stories</a></li>' +
        '<li>' +
        '<hr>' +
        '<a href="http://explore.baltimoreheritage.org/tours/browse/">Tours</a></li>' +
        '<li>' +
        '<hr>' +
        '<a href="https://collection.baltimoreheritage.org/">Collections</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<div class="connect">' +
        '<div class="connect-inner">' +
        '<h4>Support</h4>' +
        '<ul class="unstyled list-unstyled">' +
        '<li>' +
        '<hr>' +
        '<a href="http://baltimoreheritage.org/volunteer">Volunteer</a></li>' +
        '<li>' +
        '<hr>' +
        '<a href="http://baltimoreheritage.org/support/membership/">Membership</a></li>' +
        '<li>' +
        '<hr>' +
        '<a href="http://www.facebook.com/baltimoreheritage" target="_blank"><i class="icon-facebook-sign"></i></a>' +
        '<a href="http://twitter.com/bmoreheritage" target="_blank"><i class="icon-twitter-sign"></i></a>' +
        '<a href="http://baltimoreheritage.org/contact/" target="_blank"><i class="icon-envelope"></i></a>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="p2pu-color-divider-wrap">' +
        '<div class="p2pu-color-divider"></div>' +
        '</div>' +
        '</div>';

    var Slider = function(element, options) {
        this.element =
        this.options =
        this.trigger = null;

        this.init(element, options);
    };

    Slider.DEFAULTS = {
        panel: '.p2pu-panel-wrap',
        navbarContainer : '.navbar',
        template: template,
        trigger: 'click',
        icon: '.p2pu-tab-icon',
        iconUp: 'icon-chevron-sign-down',
        iconDown: 'icon-chevron-sign-up',
        includeCSS: true
    };

    Slider.prototype.getDefaults = function () {
        return Slider.DEFAULTS
    };

    Slider.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), options);

        return options;
    };

    Slider.prototype.init = function (element, options) {
        this.element = $(element);
        this.options  = this.getOptions(options);

        // append panel in the DOM
        $(this.options.navbarContainer).prepend(this.options.template);

        // Include CSS
        if (this.options.includeCSS){
            this.addCss();
        }

        var trigger = this.options.trigger;

        if (trigger == 'click') {
            this.element.on('click', null, this.options.panel, $.proxy(this.toggle, this))
        }

    };

    Slider.prototype.toggle = function (e) {
        e.preventDefault();
        var panel = $(this.options.panel);
        panel.slideToggle('fast', $.proxy(this.callDelegated, this, panel));

    };

    Slider.prototype.callDelegated = function(panel) {
        var icon = $(this.options.icon);
        panel.is(':visible')?
            this.switchIcon(icon, this.options.iconUp, this.options.iconDown):
            this.switchIcon(icon, this.options.iconDown, this.options.iconUp);
    };

    Slider.prototype.switchIcon = function(icon, aremoveIcon, addIcon){
        icon.removeClass(aremoveIcon).addClass(addIcon);
    };

    Slider.prototype.addCss = function(){
        var css_link = $("<link>", {
            rel: "stylesheet",
            type: "text/css",
            href: "/css/panel.css"
        });
        css_link.appendTo('head');
    };

    $.fn.p2puSlider = function(options) {

        return this.each( function() {
            var $this = $(this);

            new Slider($this, options);
        });

    };


}(jQuery));
