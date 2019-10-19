# frozen_string_literal: true

class OrganisationSetting < ApplicationRecord
  def license_key_present?
    license_key.present?
  end
end
