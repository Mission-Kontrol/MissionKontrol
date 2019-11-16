# frozen_string_literal: true

class RolesController < ApplicationController
  include UserAbilities

  layout 'dashboard'

  before_action :check_user_admin_abilities

  def edit
    @role = Role.find_by(name: role_params[:name])
  end

  def update
    @role = Role.find(role_params[:id])
    if role_params[:setting]
      setting_name = role_params[:setting]
      new_setting = @role.setting(setting_name)
      @role.update_attribute(setting_name.to_sym, new_setting)
    elsif role_params[:limit]
      @role.update_attribute(:export_limit, role_params[:limit])
    end

    @role.save!
  end

  private

  def role_params
    params.permit(:id, :setting, :name, :limit)
  end
end
