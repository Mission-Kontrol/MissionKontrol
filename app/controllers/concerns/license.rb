# frozen_string_literal: true

module License
  extend ActiveSupport::Concern

  private

  def verify_license!(license_key, type)
    license_key, activation_id = VerifyLicenseKeyService.verify(license_key, type)
    [license_key, activation_id]
  end

  def fetch_license_cache(cache_key)
    Rails.cache.fetch(cache_key)
  end

  def cache_license(cache_key)
    Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key }
  end

  def license_valid?
    return false unless current_admin_user

    cache_key = "license-#{current_admin_user.license_key}"
    license_key, activation_id = verify_license!(current_admin_user.license_key, 'trial')
    full_license_key, full_activation_id = verify_license!(current_admin_user.license_key, 'full') unless license_key && activation_id

    if fetch_license_cache(cache_key)
      true
    elsif license_key && activation_id
      cache_license(cache_key)
      true
    elsif full_license_key && full_activation_id
      cache_license(cache_key)
      true
    else
      false
    end
  end
end
