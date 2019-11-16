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

    return render :update_error if last_admin_ability_role?

    if role_params[:setting]
      update_setting
    elsif role_params[:limit]
      update_export_limit
    end

    @role.save!
  end

  private

  def role_params
    params.permit(:id, :setting, :name, :limit)
  end

  def last_admin_ability_role?
    return false if role_params[:setting] != 'administrator'

    roles_with_admin = Role.where(administrator: true)
    roles_with_admin.count <= 1 || (roles_with_admin.count == 1 && roles_with_admin.include?(@role))
  end

  def update_setting
    setting_name = role_params[:setting]
    new_setting = @role.setting(setting_name)
    @role.update_attribute(setting_name.to_sym, new_setting)
  end

  def update_export_limit
    @role.update_attribute(:export_limit, role_params[:limit])
  end
end
