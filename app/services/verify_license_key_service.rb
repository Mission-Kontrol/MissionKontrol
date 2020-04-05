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

    private

    def activate(license_key)
      response = call("/activate/#{license_key}")
      response.code == 200
    end

    def call(endpoint)
      base_url = 'https://www.missionkontrol.io/wp-json/lmfwc/v2/licenses'
      query = {
        consumer_key: 'ck_f7ee148e0937dc5c183e14703f5afc36da2080e7',
        consumer_secret: 'cs_1cb993c7f8c0e53cb3ad4cf83eb8af79e340436b'
      }

      HTTParty.get(base_url + endpoint, query: query)
    end
  end
end
