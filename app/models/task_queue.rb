# frozen_string_literal: true

class TaskQueue < ApplicationRecord
  validates :name, :table, presence: true
  has_many :task_queue_outcomes

  def success_outcome_enabled?
    success_database_update['enabled'] ? true : false
  end

  def failure_outcome_enabled?
    failure_database_update['enabled'] ? true : false
  end
end
