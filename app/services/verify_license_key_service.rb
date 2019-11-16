# frozen_string_literal: true

class VerifyLicenseKeyService
  class << self
    include HTTParty

    SKU = { full: '1', trial: '2' }.freeze
    STORE_CODE = 'Z0cm9LxK3jFtbX7'

    def verify(license_key, type)
      activation = activate(license_key, type)
      validation = validate(license_key, activation, type)

      if validation
        cache_key = "license-#{license_key}"
        Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key }
      end

      return license_key, activation if activation && validation

      [nil, nil]
    end

    def activate(license_key, type)
      response = call('license_key_activate', license_key, type: type)
      return response[:data]['activation_id'].to_s if response[:status] == 200

      nil
    end

    def validate(license_key, activation_id, type)
      return nil unless activation_id

      call('license_key_validate', license_key, activation_id: activation_id, type: type)
    end

    private

    def call(action, license_key, opts = {})
      base_url = 'https://www.kuwinda.io/wp-admin/admin-ajax.php'
      query = {
        store_code: STORE_CODE,
        action: action,
        sku: SKU[opts[:type].to_sym],
        license_key: license_key
      }.merge(opts.except(:type))

      response = HTTParty.post(base_url, query: query)

      message = response['message'] || response['errors']['license_key'].try(:first) || response['errors']['activation_id'].try(:first)
      { status: response['status'], message: message, data: response['data'] }
    end
  end
end
