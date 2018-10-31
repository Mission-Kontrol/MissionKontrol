# frozen_string_literal: true

require 'rails_helper'

describe Activity do
  let(:an_activity) { described_class.new }

  it 'responds to user_id' do
    expect(an_activity).to respond_to(:user_id)
  end

  it 'responds to content' do
    expect(an_activity).to respond_to(:content)
  end

  it 'responds to created_at' do
    expect(an_activity).to respond_to(:created_at)
  end

  it 'responds to updated_at' do
    expect(an_activity).to respond_to(:updated_at)
  end

  it 'responds to kind' do
    expect(an_activity).to respond_to(:kind)
  end

  it 'is invalid without some content' do
    activity = build(:activity)

    activity.content = nil

    expect(activity).to_not be_valid
    expect(activity.errors.keys).to include(:content)
  end

  it 'is invalid without an activity kind' do
    activity = build(:activity)

    activity.kind = nil

    expect(activity).to_not be_valid
    expect(activity.errors.keys).to include(:kind)
  end

  it 'is invalid without a correct activity kind' do
    activity = build(:activity)

    activity.kind = 'incorrectactivity'
    activity.valid?
    errors = activity.errors.full_messages

    expect(activity).to_not be_valid
    expect(activity.errors.keys).to include(:kind)
    expect(errors).to include('Kind is not included in the list')
  end

  it 'is invalid without a user_id' do
    activity = build(:activity)

    activity.user_id = nil

    expect(activity).to_not be_valid
    expect(activity.errors.keys).to include(:user_id)
  end

  describe '.find_all_by_user_id' do
    it 'finds all activities for a given user by their user id' do
      create_list(:activity, 5, user_id: 1)
      create(:activity, user_id: 2)
      create(:activity, user_id: 3)

      actual = described_class.find_all_by_user_id(user_id: 1)
      expected = [1]

      expect(actual.map(&:user_id).uniq).to eq(expected)
    end
  end
end
