# frozen_string_literal: true

FactoryBot.define do
  factory :task_queue do
    name { 'Task Queue' }
    table { FFaker::Name.name }
  end
end
