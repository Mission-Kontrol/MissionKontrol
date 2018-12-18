# frozen_string_literal: true

class Activity < ApplicationRecord
  KINDS = %w[note meeting call].freeze
  FEEDABLE_TYPES = ClientRecord.connection.tables

  validates :content, presence: true
  validates :kind, presence: true, inclusion: { in: KINDS }
  validates :feedable_id, presence: true
  validates :feedable_type, presence: true, inclusion: { in: FEEDABLE_TYPES }
end
