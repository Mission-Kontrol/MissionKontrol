# frozen_string_literal: true

class VerifyLicenseKeyService
  class << self
    include HTTParty

    def activate(user)
      call('license_key_activate', user)
    end

    def activate_full(user)
      call('license_key_activate', user, sku: 1)
    end

    def activate_trial(user)
      call('license_key_activate', user)
    end

    def validate(user)
      call('license_key_validate', user, activation_id: user.activation_id)
    end

    def validate_full(user)
      call('license_key_validate', user, activation_id: user.activation_id, sku: 1)
    end

    def validate_trial(user)
      call('license_key_validate', user, activation_id: user.activation_id)
    end

    private

    def call(action, user, opts = {})
      base_url = 'https://www.kuwinda.io/wp-admin/admin-ajax.php'
      query = {
        store_code: 'Z0cm9LxK3jFtbX7',
        action: action,
        sku: '2',
        license_key: user.license_key
      }.merge(opts)

      response = HTTParty.post(base_url, query: query)
      message = response['message'] || response['errors']['license_key'].try(:first) || response['errors']['activation_id'].try(:first)
      { status: response['status'], message: message, data: response['data'] }
    end
  end
end
