# frozen_string_literal: true

FactoryBot.define do
  factory :role do
    name { 'Admin' }

    trait :sales do
      name { 'Sales' }
    end

    trait :team_lead do
      name { 'Team Lead' }
    end
  end
end
