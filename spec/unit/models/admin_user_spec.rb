# frozen_string_literal: true

require 'rails_helper'

def db_credentials
  %w[
    admin_database_name
    admin_database_name=
    admin_database_username
    admin_database_username=
    admin_database_password
    admin_database_password=
    admin_database_host
    admin_database_host=
    admin_database_port
    admin_database_port=
    target_database_name
    target_database_name=
    target_database_username
    target_database_username=
    target_database_password
    target_database_password=
    target_database_host
    target_database_host=
    target_database_port
    target_database_port=
  ]
end

describe AdminUser do
  let(:an_admin_user) { described_class.new }

  db_credentials.each do |credential|
    it "responds to ##{credential}" do
      expect(an_admin_user).to respond_to(credential.to_sym)
    end
  end
end
