# frozen_string_literal: true

class Role < ApplicationRecord
  # has_and_belongs_to_many :admin_users, join_table: :admin_users_roles
  has_and_belongs_to_many :permissions, join_table: :roles_permissions
  has_many :admin_users

  belongs_to :resource,
             polymorphic: true,
             optional: true

  validates :resource_type,
            inclusion: { in: Rolify.resource_types },
            allow_nil: true

  scopify

  def setting(setting_name)
    case setting_name
    when 'administrator'
      administrator? ? false : true
    when 'editor'
      editor? ? false : true
    when 'export'
      export? ? false : true
    end
  end
end
