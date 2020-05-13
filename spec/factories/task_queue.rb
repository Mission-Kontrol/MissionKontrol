# frozen_string_literal: true

FactoryBot.define do
  factory :task_queue do
    name { 'Task Queue Test' }
    table { FFaker::Name.name }
    database_id { 1 }
    details { 'Task Queue Details' }
    query_builder_rules { 'Query Builder Rules' }
    query_builder_sql { 'Query Builder SQL' }
    raw_sql { 'Raw SQL' }
    draggable_fields { [] }
    success_outcome_title { 'Customer has cookies' }
    success_outcome_timeout { 1 }
    failure_outcome_title { 'Customer does not have cookies' }
    failure_outcome_timeout { 30 }
  end
end
