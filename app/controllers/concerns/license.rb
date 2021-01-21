# frozen_string_literal: true

module License
  extend ActiveSupport::Concern

  def verify_license!(license_key)
    true
    # VerifyLicenseKeyService.verify(license_key)
  end

  def activate_license(license_key)
    true
    # VerifyLicenseKeyService.activate(license_key)
  end

  def license_valid?
    return true
    # current_organisation = OrganisationSetting.last
    # return false unless current_organisation&.license_key_present?

    # license_key = current_organisation.license_key
    # cache_key = "license-#{license_key}"

    # if fetch_license_cache(cache_key)
    #   true
    # elsif verify_license!(license_key) || Rails.env.development?
    #   cache_license(cache_key)
    #   true
    # else
    #   false
    # end
  end

  private

  def fetch_license_cache(cache_key)
    Rails.cache.fetch(cache_key)
  end

  def cache_license(cache_key)
    Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key }
  end
end
