# frozen_string_literal: true

class Activity < ApplicationRecord
  KINDS = %w[note meeting call].freeze
  validates :content, presence: true
  validates :kind, presence: true, inclusion: { in: KINDS }
  validates :user_id, presence: true

  class << self
    def find_all_by_user_id(user_id:)
      where(user_id: user_id).order(created_at: :desc)
    end
  end
end
