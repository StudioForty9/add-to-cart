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
ajaxAddToCartCore = Class.create({
    ev: null,
    clickedSubmit: null,

    initialize: function(selector, container) {
        this.selector = selector;
        if (typeof container != 'undefined') {
            this.container = container;
        } else {
            this.container = document;
        }
        this.bindEvents();
    },

    bindEvents: function() {
        this.container.select(this.selector).invoke('observe', 'click', this.onSubmit.bind(this));
    },

    onSubmit: function(e, dummy, overrideForm) {
        e.preventDefault();

        this.ev = e;
        this.clickedSubmit = e.element();

        var eventData = {
            allowAjax: true,  // Allow the event to stop the Ajax submit (e.g. because of a validation fail)
            buttonClicked: this.clickedSubmit
        };

        Event.fire(document, 'addToCart:preAjax', eventData);

        if (!eventData.allowAjax){
            e.preventDefault();
            return false;
        }

        this.clickedSubmit.addClassName('loading');

        if (typeof overrideForm == 'undefined') {
            this.form = e.target.up('form');
        } else {
            this.form = overrideForm;
        }

        // The event target might override the URL to submit the request to.
        // DYOC does this for quickshop for example.
        var overrideSubmitUrl = e.target.readAttribute('data-submiturl');
        if (overrideSubmitUrl != null) {
            this.form.writeAttribute('action', overrideSubmitUrl);
        }

        document.fire('addToCart:ajaxBegin');

        this.form.request({
            onComplete: function(response) {
                document.fire('addToCart:ajaxFinished');
                this.clickedSubmit.removeClassName('loading');
                try {
                    var response = JSON.parse(response.responseText);
                    if (response.success != 'true') {
                        this.form.submit()
                    } else {
                        document.fire('addToCart:addComplete', response);
                        return false;
                    }
                } catch (e) {
                    this.form.submit()
                }
            }.bind(this)
        });
    }
});
