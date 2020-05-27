# frozen_string_literal: true

class TaskQueue < ApplicationRecord
  validates :name, :table, presence: true
  has_many :task_queue_outcomes

  OUTCOME_TIMEOUTS = [
    ['Hours', 'hours'],
    ['Days', 'days']
  ].freeze
end
