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

  def twilio_setup_complete?
    !twilio_account_sid.blank? &&
      !twilio_auth_token.blank? &&
      !twilio_application_sid.blank? &&
      !twilio_caller_id.blank?
  end

  def role
    "admin"
  end

  def trial_license_key_not_activated?
    !activation_id.present? && !full_license
  end

  def full_license_key_not_activated?
    !activation_id.present? && full_license
  end

  def trial_license_user?
    license_key.present? && activation_id.present? && !full_license
  end

  def full_license_user?
    license_key.present? && full_license && activation_id.present?
  end

  def twilio_auth_token
    SensitiveData.get_twilio_credential(:auth_token)
  end

  def twilio_auth_token=(auth_token)
    SensitiveData.set_twilio_credential(:auth_token, auth_token)
  end

  def twilio_account_sid
    SensitiveData.get_twilio_credential(:account_sid)
  end

  def twilio_account_sid=(account_sid)
    SensitiveData.set_twilio_credential(:account_sid, account_sid)
  end

  def twilio_application_sid
    SensitiveData.get_twilio_credential(:application_sid)
  end

  def twilio_application_sid=(application_sid)
    SensitiveData.set_twilio_credential(:application_sid, application_sid)
  end

  def twilio_caller_id
    SensitiveData.get_twilio_credential(:caller_id)
  end

  def twilio_caller_id=(caller_id)
    SensitiveData.set_twilio_credential(:caller_id, caller_id)
  end

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
