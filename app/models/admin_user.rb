# frozen_string_literal: true

class AdminUser < ApplicationRecord
  rolify

  DATABASE_TYPES = [
    ['PostgreSQL', 'postgresql'],
    ['MySQL', 'mysql2']
  ].freeze

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }

  include SensitiveData

  def active_for_authentication?
    super and self.active?
  end

  def inactive_message
    "Your account is not active. Please speak to an Administrator."
  end

  def twilio_setup_complete?
    !twilio_account_sid.blank? &&
      !twilio_auth_token.blank? &&
      !twilio_application_sid.blank? &&
      !twilio_caller_id.blank?
  end

  def permission?(action, table, database_id)
    ability = Ability.new(self)
    ability.can? self, action, table, database_id
  end

  def admin_abilities?
    role = roles.first
    role.administrator?
  end

  def editor_abilities?
    role = roles.first
    role.editor?
  end

  def export_abilities?
    role = roles.first
    role.export?
  end

  def role
    "admin"
  end

  def name
    first_name + ' ' + last_name
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

  def ignore_layout_modal?
    ignore_layout_modal
  end
end
