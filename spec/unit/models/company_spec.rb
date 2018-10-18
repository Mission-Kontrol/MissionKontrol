# frozen_string_literal: true

require 'rails_helper'

describe Company do
  let(:a_company) { described_class.new }

  it 'responds to #activities' do
    expect(a_company).to respond_to(:activities)
  end
end
