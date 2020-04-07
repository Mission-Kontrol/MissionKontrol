# frozen_string_literal: true

class OrganisationSettingsController < ApplicationController
  include UserAbilities

  layout 'standard'

  before_action :check_user_admin_abilities, only: %i[edit]

  def edit
    @organisation = OrganisationSetting.find params[:id]
  end

  def update
    @organisation = OrganisationSetting.find params[:id]
    unchanged_key = organisation_params[:license_key] == @organisation.license_key

    unless unchanged_key
      valid_license = activate_license(organisation_params[:license_key])
      @invalid_key = !valid_license
    end

    @result = @organisation.update!(organisation_params) if valid_license || unchanged_key
  end

  private

  def organisation_params
    params.require(:organisation_setting).permit(:company_name, :license_key)
  end
end
