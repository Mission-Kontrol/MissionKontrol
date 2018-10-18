# frozen_string_literal: true

class Activity < ApplicationRecord
  KINDS = %w[note meeting call].freeze
  FEEDABLE_TYPES = %w[User Company].freeze
  validates :content, presence: true
  validates :kind, presence: true, inclusion: { in: KINDS }
  validates :feedable_id, presence: true
  validates :feedable_type, presence: true, inclusion: { in: FEEDABLE_TYPES }
  belongs_to :feedable, polymorphic: true
end
