# frozen_string_literal: true

require 'rails_helper'

describe AdminUser do
  let(:an_admin_user) {described_class.new }

  it "responds to #get_admin_database_name" do
    expect(an_admin_user).to respond_to(:get_admin_database_name)
  end
end
