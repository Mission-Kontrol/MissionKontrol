# frozen_string_literal: true

module UserAbilities
  extend ActiveSupport::Concern

  private

  def check_user_admin_abilities
    redirect_to(root_path) unless current_admin_user.admin_abilities?
  end

  def check_user_editor_abilities
    redirect_to(root_path) unless current_admin_user.editor_abilities? || current_admin_user.admin_abilities?
  end
end
