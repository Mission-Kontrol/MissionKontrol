# frozen_string_literal: true

FactoryBot.define do
  factory :role do
    name { 'Admin' }
    administrator { true }
    editor { true }
    export { false }

    trait :admin do
      name { 'Admin' }
    end

    trait :Sales do
      name { 'Sales' }
    end

    trait :team_lead do
      name { 'Team Lead' }
    end
  end
end
