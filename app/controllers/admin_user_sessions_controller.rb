# frozen_string_literal: true

class AdminUserSessionsController < Devise::SessionsController
  before_action :check_admin_user_exists, only: [:new]

  private

  def check_admin_user_exists
    redirect_path = OrganisationSetting.any? && AdminUser.any? ? nil : new_admin_user_registration_path

    redirect_to redirect_path if redirect_path.present?
  end
end
