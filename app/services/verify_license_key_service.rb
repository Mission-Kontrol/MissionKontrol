# frozen_string_literal: true

class VerifyLicenseKeyService
  class << self
    include HTTParty

    STATUS = { sold: '1', delivered: '2', active: '3', inactive: '4' }.freeze

    def verify(license_key)
      response = call("/#{license_key}")
      return true if response['data']['status'] == STATUS[:active]

      activate(license_key)
    end

    def activate(license_key)
      response = call("/activate/#{license_key}")
      response.code == 200
    end

    private

    def call(endpoint); end
  end
end
