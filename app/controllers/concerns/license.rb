# frozen_string_literal: true

module License
  extend ActiveSupport::Concern

  private

  def license_verified?
    return false unless current_admin_user.license_key.present?

    return VerifyLicenseKeyService.activate(current_admin_user, 'trial') if current_admin_user.trial_license_key_not_activated?

    return VerifyLicenseKeyService.validate(current_admin_user, 'trial') if current_admin_user.trial_license_user?

    return VerifyLicenseKeyService.activate(current_admin_user, 'full') if current_admin_user.full_license_key_not_activated?

    return VerifyLicenseKeyService.validate(current_admin_user, 'full') if current_admin_user.full_license_user?
  end

  def fetch_license_cache(cache_key)
    Rails.cache.fetch(cache_key)
  end

  def cache_license(cache_key)
    Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key } if license_verified?
  end

  def license_valid?
    return false unless current_admin_user

    cache_key = "license-#{current_admin_user.license_key}"

    if fetch_license_cache(cache_key)
      true
    elsif license_verified?
      cache_license(cache_key)
      true
    else
      false
    end
  end
end
