# frozen_string_literal: true

require 'rails_helper'

describe Activity do
  let(:an_activity) { described_class.new }

  it 'responds to feedable_id' do
    expect(an_activity).to respond_to(:feedable_id)
  end

  it 'responds to feedable_type' do
    expect(an_activity).to respond_to(:feedable_type)
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

  Activity::KINDS.each do |kind|
    it "is valid with a known activity kind - #{kind}" do
      activity = build(:activity, :user)

      activity.kind = kind

      expect(activity).to be_valid
    end
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

  it 'is invalid without a feedable_id' do
    activity = build(:activity)

    activity.feedable_id = nil

    expect(activity).to_not be_valid
    expect(activity.errors.keys).to include(:feedable_id)
  end

  it 'is invalid without a feedable_type' do
    activity = build(:activity)

    activity.feedable_type = nil

    expect(activity).to_not be_valid
    expect(activity.errors.keys).to include(:feedable_type)
  end

  it 'is invalid without a correct feedable type' do
    activity = build(:activity)

    activity.feedable_type = 'incorrect_feedable_type'
    activity.valid?
    errors = activity.errors.full_messages

    expect(activity).to_not be_valid
    expect(activity.errors.keys).to include(:feedable_type)
    expect(errors).to include('Feedable type is not included in the list')
  end

  #
  # TODO: this needs a user or company record to exist, I am trying to stay away
  # from creating or modifying records on the target DB as we don't own it and
  # I feel it may be the wrong way to go about testing this usecase, discuss
  # with team and come back to this
  Activity::FEEDABLE_TYPES.each do |type|
    xit "is valid with a known feedable_type - #{type}" do
      activity = build(:activity)

      activity.feedable_id = 1
      activity.feedable_type = type

      expect(activity).to be_valid
    end
  end
end
