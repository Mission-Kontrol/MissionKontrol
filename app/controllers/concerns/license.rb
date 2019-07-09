# frozen_string_literal: true

module License
  extend ActiveSupport::Concern

  private

  def verify_license!(license_key, type)
    license_key, activation_id = VerifyLicenseKeyService.verify(license_key, type)
    [license_key, activation_id]
  end

  def validate_trial_license
    VerifyLicenseKeyService.validate(current_admin_user.license_key, current_admin_user.activation_id, 'trial')
  end

  def validate_full_license
    VerifyLicenseKeyService.validate(current_admin_user.license_key, current_admin_user.activation_id, 'full')
  end

  def fetch_license_cache(cache_key)
    Rails.cache.fetch(cache_key)
  end

  def cache_license(cache_key)
    Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key }
  end

  def license_valid?
    return false unless current_admin_user && !current_admin_user.license_key.blank?

    cache_key = "license-#{current_admin_user.license_key}"

    if fetch_license_cache(cache_key)
      true
    elsif validate_trial_license || validate_full_license
      cache_license(cache_key)
      true
    else
      false
    end
  end
end
