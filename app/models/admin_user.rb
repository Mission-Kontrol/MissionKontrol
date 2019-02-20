# frozen_string_literal: true

class AdminUser < ApplicationRecord
  DATABASE_TYPES = [
    ['PostgreSQL', 'postgresql'],
    ['MySQL', 'mysql2']
  ].freeze

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  include SensitiveData

  def full_name
    "#{first_name} #{last_name}"
  end

  def admin_database_name
    SensitiveData.get_admin_database_credential(:database_name)
  end

  def admin_database_name=(name)
    SensitiveData.set_admin_database_credential(:database_name, name)
  end

  def admin_database_username
    SensitiveData.get_admin_database_credential(:database_username)
  end

  def admin_database_username=(username)
    SensitiveData.set_admin_database_credential(:database_username, username)
  end

  def admin_database_password
    SensitiveData.get_admin_database_credential(:database_password)
  end

  def admin_database_password=(password)
    SensitiveData.set_admin_database_credential(:database_password, password)
  end

  def admin_database_host
    SensitiveData.get_admin_database_credential(:database_host)
  end

  def admin_database_host=(host)
    SensitiveData.set_admin_database_credential(:database_host, host)
  end

  def admin_database_port
    SensitiveData.get_admin_database_credential(:database_port)
  end

  def admin_database_port=(port)
    SensitiveData.set_admin_database_credential(:database_port, port)
  end

  def admin_database_type
    SensitiveData.get_admin_database_credential(:database_type)
  end

  def admin_database_type=(type)
    SensitiveData.set_admin_database_credential(:database_type, type)
  end

  def target_database_name
    SensitiveData.get_target_database_credential(:database_name)
  end

  def target_database_name=(name)
    SensitiveData.set_target_database_credential(:database_name, name)
  end

  def target_database_username
    SensitiveData.get_target_database_credential(:database_username)
  end

  def target_database_username=(username)
    SensitiveData.set_target_database_credential(:database_username, username)
  end

  def target_database_password
    SensitiveData.get_target_database_credential(:database_password)
  end

  def target_database_password=(password)
    SensitiveData.set_target_database_credential(:database_password, password)
  end

  def target_database_host
    SensitiveData.get_target_database_credential(:database_host)
  end

  def target_database_host=(host)
    SensitiveData.set_target_database_credential(:database_host, host)
  end

  def target_database_port
    SensitiveData.get_target_database_credential(:database_port)
  end

  def target_database_port=(port)
    SensitiveData.set_target_database_credential(:database_port, port)
  end

  def target_database_type
    SensitiveData.get_target_database_credential(:database_type)
  end

  def target_database_type=(type)
    SensitiveData.set_target_database_credential(:database_type, type)
  end
end
