# frozen_string_literal: true

FactoryBot.define do
  factory :activity do
    content { 'met with a user today' }
    kind { 'meeting' }

    trait :user do
      feedable_id { 1 }
      feedable_type { 'users' }
    end
  end
end
