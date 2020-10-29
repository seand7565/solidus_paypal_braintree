# frozen_string_literal: true

module SolidusPaypalBraintree
  module ProductsControllerDecorator
    def self.prepended(base)
      base.helper ::SolidusPaypalBraintree::BraintreeCheckoutHelper
    end

    ::Spree::ProductsController.prepend(self)
  end
end
