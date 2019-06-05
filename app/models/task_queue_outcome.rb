# frozen_string_literal: true

class TaskQueueOutcome < ApplicationRecord
  validates :outcome,
            :task_queue_id,
            :task_queue_item_table,
            :task_queue_item_primary_key,
            :task_queue_item_reappear_at, presence: true

  OUTCOMES = %w[
    success
    failure
  ].freeze
end
