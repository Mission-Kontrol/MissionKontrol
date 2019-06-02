# frozen_string_literal: true

class VerifyLicenseKeyService
  class << self
    include HTTParty

    SKU = { full: '1', trial: '2' }
    STORE_CODE = 'Z0cm9LxK3jFtbX7'

    def activate(user, type)
      response  = call('license_key_activate', user, type: type)

      if response[:status] == 200
        user.update_attribute(:activation_id, response[:data]['activation_id'])
        true
      elsif response[:status] == 500 && type == 'trial'
        activate_full_license(user)
      else
        false
      end
    end

    def validate(user, type)
      if user.activation_id.nil?
        activate(user, type)
        user.reload
      end

      response = call('license_key_validate', user, activation_id: user.activation_id, type: type)

      if response[:status] == 200
        cache_key = "license-#{user.license_key}"
        Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key }
        true
      else
        false
      end
    end

    private

    def call(action, user, opts = {})
      base_url = 'https://www.kuwinda.io/wp-admin/admin-ajax.php'
      query = {
        store_code: STORE_CODE,
        action: action,
        sku: SKU[opts[:type].to_sym],
        license_key: user.license_key
      }.merge(opts.except(:type))

      response = HTTParty.post(base_url, query: query)

      message = response['message'] || response['errors']['license_key'].try(:first) || response['errors']['activation_id'].try(:first)
      { status: response['status'], message: message, data: response['data'] }
    end

    def activate_full_license(user)
      response = call('license_key_activate', user, type: 'full')

      if response[:status] == 200
        user.update_attributes(
          activation_id: response[:data]['activation_id'],
          full_license: true
        )
        true
      else
        false
      end
    end
  end
end
