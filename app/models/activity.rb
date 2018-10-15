# frozen_string_literal: true

class Activity < ApplicationRecord
  validates :content, presence: true
  
  class << self

    def find_all_by_user_id(user_id:)
      self.where(user_id: user_id)
    end

  end
end
