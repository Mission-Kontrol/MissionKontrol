# frozen_string_literal: true

class Activity < ApplicationRecord
  validates :content, presence: true
  validates :kind, presence: true
  validates :user_id, presence: true

  class << self
    def find_all_by_user_id(user_id:)
      where(user_id: user_id).order(created_at: :desc)
    end
  end
end
