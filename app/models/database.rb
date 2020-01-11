# frozen_string_literal: true

class Database < ApplicationRecord
  has_secure_password

  DATABASE_TYPES = [
    ['PostgreSQL', 'postgresql'],
    ['MySQL', 'mysql2']
  ].freeze
end