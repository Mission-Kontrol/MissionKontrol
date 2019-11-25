# frozen_string_literal: true

FactoryBot.define do
  factory :target_table_setting do
    name { 'users' }
    nested_table { 'attending_events' }
  end
end
