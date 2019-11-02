# frozen_string_literal: true

FactoryBot.define do
  factory :permission do
    subject_class { 'events' }
    action { 'view' }
  end
end
