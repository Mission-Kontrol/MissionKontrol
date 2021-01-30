# frozen_string_literal: true

class Database < ApplicationRecord
  include DatabaseActions
  before_save :encrypt_database_password

  DATABASE_TYPES = [
    ['PostgreSQL', 'postgresql'],
    ['MySQL', 'mysql2']
  ].freeze

  private

  def encrypt_database_password
    crypt = ActiveSupport::MessageEncryptor.new(Rails.application.secrets.secret_key_base[0..31])
    password = self.password
    crypt.decrypt_and_verify(password)
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    encrypted_data = crypt.encrypt_and_sign(password)
    self.password = encrypted_data
  end
end
