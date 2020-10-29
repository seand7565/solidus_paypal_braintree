//= require solidus_paypal_braintree/constants
/**
 * Constructor for PayPal button object
 * @constructor
 * @param {object} element - The DOM element of your PayPal button
 */
SolidusPaypalBraintree.PaypalMessaging = function(paypalOptions) {
  this._paypalOptions = paypalOptions || {};

  this.locale = paypalOptions['locale'] || "en_US";
  delete paypalOptions['locale'];

  this._client = null;
  this._environment = this._paypalOptions.environment || 'sandbox';
  delete this._paypalOptions.environment;
};

/**
 * Creates the PayPal session using the provided options and enables the button
 *
 * @param {object} options - The options passed to tokenize when constructing
 *                           the PayPal instance
 *
 * See {@link https://braintree.github.io/braintree-web/3.9.0/PayPal.html#tokenize}
 */
SolidusPaypalBraintree.PaypalMessaging.prototype.initialize = function() {
  this._client = new SolidusPaypalBraintree.createClient({usePaypal: true});

  return this._client.initialize().then(this.initializeCallback.bind(this));
};

SolidusPaypalBraintree.PaypalMessaging.prototype.initializeCallback = function() {
  this._paymentMethodId = this._client.paymentMethodId;

  this._client.getPaypalInstance().loadPayPalSDK({
    currency: this._paypalOptions.currency,
    commit: true,
    components: "messages"
  })
};

