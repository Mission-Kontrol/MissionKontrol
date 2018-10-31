# frozen_string_literal: true

require 'rails_helper'

def admin_db_credentials_getters
  %w[
    admin_database_name
    admin_database_username
    admin_database_password
    admin_database_host
    admin_database_port
  ]
end

def admin_db_credentials_setters
  %w[
    admin_database_name=
    admin_database_username=
    admin_database_password=
    admin_database_host=
    admin_database_port=
  ]
end

def target_db_credentials_getters
  %w[
    target_database_name
    target_database_username
    target_database_password
    target_database_host
    target_database_port
  ]
end

def target_db_credentials_setters
  %w[
    target_database_name=
    target_database_username=
    target_database_password=
    target_database_host=
    target_database_port=
  ]
end

describe AdminUser do
  let(:an_admin_user) { described_class.new }

  admin_db_credentials_getters.each do |credential|
    it "responds to ##{credential}" do
      expect(an_admin_user).to respond_to(credential.to_sym)
    end
  end

  admin_db_credentials_setters.each do |credential|
    it "responds to ##{credential}" do
      expect(an_admin_user).to respond_to(credential.to_sym)
    end
  end

  target_db_credentials_getters.each do |credential|
    it "responds to ##{credential}" do
      expect(an_admin_user).to respond_to(credential.to_sym)
    end
  end

  target_db_credentials_setters.each do |credential|
    it "responds to ##{credential}" do
      expect(an_admin_user).to respond_to(credential.to_sym)
    end
  end
end
