module License
  extend ActiveSupport::Concern
  
  private

  def activate_current_license
    return false unless current_admin_user

    return true if activate_full_license || activate_trial_license

    false
  end

  def validate_current_license
    return false unless current_admin_user

    return true if validate_full_license || validate_trial_license

    false
  end

  def activate_full_license
    activate_result = VerifyLicenseKeyService.activate_full(current_admin_user)

    if activate_result[:status] == 200
      current_admin_user.activation_id = activate_result[:data]['activation_id']
      true
    else
      false
    end
  end

  def activate_trial_license
    activate_result = VerifyLicenseKeyService.activate_trial(current_admin_user)

    if activate_result[:status] == 200
      current_admin_user.activation_id = activate_result[:data]['activation_id']
      true
    else
      false
    end
  end

  def validate_full_license
    validate_result = VerifyLicenseKeyService.validate_full(current_admin_user)

    if validate_result[:status] == 200
      current_admin_user.full_license = true
      true
    else
      false
    end
  end

  def validate_trial_license
    validate_result = VerifyLicenseKeyService.validate_trial(current_admin_user)
    validate_result[:status] == 200
  end

  def license_verified
    activate_current_license && validate_current_license
  end

  def fetch_license_cache(cache_key)
    Rails.cache.fetch(cache_key)
  end

  def license_cache=(cache_key)
    Rails.cache.fetch(cache_key, expires_in: 24.hours) { cache_key } if license_verified
  end

  def license_valid?
    return false unless current_admin_user

    cache_key = "license-#{current_admin_user.license_key}"
    license_cache = fetch_license_cache(cache_key)

    if license_cache
      true
    elsif license_verified
      license_cache = cache_key
      true
    else
      false
    end
  end
end
