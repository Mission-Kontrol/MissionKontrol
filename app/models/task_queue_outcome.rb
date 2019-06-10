# frozen_string_literal: true

class TaskQueueOutcome < ApplicationRecord
  OUTCOMES = %w[
    success
    failure
  ].freeze

  validates :outcome, inclusion: { in: OUTCOMES }
  validates :outcome,
            :task_queue_id,
            :task_queue_item_table,
            :task_queue_item_primary_key,
            :task_queue_item_reappear_at, presence: true
end
