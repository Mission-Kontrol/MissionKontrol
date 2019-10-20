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
end
