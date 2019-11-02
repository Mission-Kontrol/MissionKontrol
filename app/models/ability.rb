# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
  end

  def can?(user, action, subject_class)
    roles = user.roles.map do |role|
      role.permissions.where(action: action).any? do |permission|
        permission.subject_class == subject_class.to_s
      end
    end
    roles.any? true
  end
end
