# frozen_string_literal: true

require 'rails_helper'

describe User do
  let(:a_user) { described_class.new }

  it 'responds to #activities' do
    expect(a_user).to respond_to(:activities)
  end
end
