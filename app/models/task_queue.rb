# frozen_string_literal: true

class TaskQueue < ApplicationRecord
  validates :name, :table, presence: true
  has_many :task_queue_outcomes

  OUTCOME_TIMEOUTS = [
    ['1 Day', '1'],
    ['5 Days', '5'],
    ['1 week', '7'],
    ['2 weeks', '14'],
    ['1 month', '30']
  ].freeze
end
