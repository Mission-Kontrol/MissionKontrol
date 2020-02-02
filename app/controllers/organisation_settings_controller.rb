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

    return unless @organisation.update!(organisation_params)
  end

  private

  def organisation_params
    params.require(:organisation_setting).permit(:company_name, :license_key)
  end
end
