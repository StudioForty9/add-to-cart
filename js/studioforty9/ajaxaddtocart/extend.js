/**
 * Studioforty9_AjaxAddToCart
 *
 * @category  Studioforty9
 * @package   Studioforty9_AjaxAddToCart
 * @author    StudioForty9 <info@studioforty9.com>
 * @copyright 2016 StudioForty9 (http://www.studioforty9.com)
 * @license   https://github.com/studioforty9/add-to-cart/blob/master/LICENCE BSD
 * @version   0.0.1
 * @link      https://github.com/studioforty9/add-to-cart
 */
addToCartExtend = Class.create({
    settings: {
        loadingElementId: 'ajax-loading',
        loadingElementClass: 'please-wait',
        loadingImageUrl: '/skin/frontend/rwd/default/images/ajax-loader.gif',
        messageContainer: '#product_addtocart_form .add-to-cart',
        messageElementId: 'ajaxaddtocart-message',
        miniCartElementId: 'header-cart',
        miniCartCountElement: '.header-minicart .count',
        miniCartToggleClass: 'skip-active',
        miniCartLinkElement: '.header-minicart a.skip-cart'
    },
    timeout: null,
    initialize: function(options) {
        if (options) {
            this.settings = Object.extend(options, this.settings);
        }

        // Ajax "Loading" indicator
        document.observe('addToCart:ajaxBegin', this.beginLoading.bind(this));
        document.observe('addToCart:ajaxFinished', this.endLoading.bind(this));

        // Update header on success
        document.observe('addToCart:addComplete', this.personalize.bind(this));

        // Standard Magento form validation before Ajax request is submitted.
        document.observe('addToCart:preAjax', this.magentoValidation.bind(this));

    },

    createLoadingIndicator: function() {
        return new Element('div', {
            'class': this.settings.loadingElementClass,
            id: this.settings.loadingElementId
        }).insert(new Element('img', {
            'src': this.settings.loadingImageUrl
        }));
    },

    beginLoading: function(e) {
        var loader = $(this.settings.loadingElementId);
        var message = $(this.settings.messageElementId);
        var container = $$(this.settings.messageContainer).first();

        if (!loader) {
            container.insert(this.createLoadingIndicator());
            loader = $(this.settings.loadingElementId);
        }

        if (message) {
            message.remove();
        }

        loader.show();
        this.hideMiniCart();
    },

    endLoading: function(e) {
        var loader = $(this.settings.loadingElementId);
        if (loader) {
            loader.hide();
        }
        this.showMiniCart();
    },

    showMiniCart: function() {
        var miniCartLink = $$(this.settings.miniCartLinkElement).first();
        var miniCart = $(this.settings.miniCartElementId);

        miniCartLink.addClassName(this.settings.miniCartToggleClass);
        miniCart.addClassName(this.settings.miniCartToggleClass);

        return miniCart;
    },

    hideMiniCart: function() {
        var miniCartLink = $$(this.settings.miniCartLinkElement).first();
        var miniCart = $(this.settings.miniCartElementId);

        miniCartLink.removeClassName(this.settings.miniCartToggleClass);
        miniCart.removeClassName(this.settings.miniCartToggleClass);

        return miniCart;
    },

    personalize: function(e) {
        var messageContainer = $$(this.settings.messageContainer).first();
        var miniCount = $$(this.settings.miniCartCountElement).first();
        var miniCart = $(this.settings.miniCartElementId);

        // Update the count in the header
        miniCount.update(e.memo.cartCount);

        // Set a timeout to hide the mini cart
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout((function() {
            this.hideMiniCart();
        }).bind(this), 4000);

        // Add a message to the page and update the mini cart
        if (e.memo.success == 'true') {
            messageContainer.insert(e.memo.html.result);
            miniCart.update().insert(e.memo.html.minicart);
        }

        // fire the cookie personalisation event
        Event.fire(document, 'personalisationcookie:render');
    },

    magentoValidation: function(e) {
        // If Magento form validation fails, prevent the form submission.
        if (typeof productAddToCartForm != 'undefined') {
            if (!productAddToCartForm.validator.validate()) {
                e.memo.allowAjax = false;
            }
        }
    }
});
document.observe('dom:loaded', function() {
    var ajaxExtend = new addToCartExtend();
});
