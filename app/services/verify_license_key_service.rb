# frozen_string_literal: true

class VerifyLicenseKeyService
  class << self
    include HTTParty

    SKU = { full: '1', trial: '2' }.freeze
    STORE_CODE = 'Z0cm9LxK3jFtbX7'

    # def activate(user, type)
    #   response = call('license_key_activate', user, type: type)
    #
    #   if response[:status] == 200
    #     user.update_attribute(:activation_id, response[:data]['activation_id'])
    #     true
    #   elsif response[:status] == 500 && type == 'trial'
    #     activate_full_license(user)
    #   else
    #     false
    #   end
    # end
    #
    # def validate(user, type)
    #   if user.activation_id.nil?
    #     activate(user, type)
    #     user.reload
    #   end
    #
    #   response = call('license_key_validate', user, activation_id: user.activation_id, type: type)
    #
    #   if response[:status] == 200
    #     cache_key = "license-#{user.license_key}"
    #     Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key }
    #     true
    #   else
    #     false
    #   end
    # end

    def verify(license_key, type)
      activation = activate(license_key, type)
      validation = validate(license_key, activation, type)
      return license_key, activation if activation && validation

      return nil, nil
    end

    def activate(license_key, type)
      response = call('license_key_activate', license_key, type: type)
      return response[:data]['activation_id'] if response[:status] == 200

      nil
    end

    # def validate(user, type)
    #   if user.activation_id.nil?
    #     activate(user, type)
    #     user.reload
    #   end
    #
    #   response = call('license_key_validate', user, activation_id: user.activation_id, type: type)
    #
    #   if response[:status] == 200
    #     cache_key = "license-#{user.license_key}"
    #     Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key }
    #     true
    #   else
    #     false
    #   end
    # end

    def validate(license_key, activation_id, type)
      return nil unless activation_id

      response = call('license_key_validate', license_key, activation_id: activation_id, type: type)

      if response[:status] == 200
        # cache_key = "license-#{user.license_key}"
        # Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key }
        response
      else
        nil
      end
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

    #
    # def call(action, user, opts = {})
    #   base_url = 'https://www.kuwinda.io/wp-admin/admin-ajax.php'
    #   query = {
    #     store_code: STORE_CODE,
    #     action: action,
    #     sku: SKU[opts[:type].to_sym],
    #     license_key: user.license_key
    #   }.merge(opts.except(:type))
    #
    #   response = HTTParty.post(base_url, query: query)
    #
    #   message = response['message'] || response['errors']['license_key'].try(:first) || response['errors']['activation_id'].try(:first)
    #   { status: response['status'], message: message, data: response['data'] }
    # end

    # def activate_full_license(user)
    #   response = call('license_key_activate', user, type: 'full')
    #
    #   if response[:status] == 200
    #     user.update_attributes(
    #       activation_id: response[:data]['activation_id'],
    #       full_license: true
    #     )
    #     true
    #   else
    #     false
    #   end
    # end
  end
end
