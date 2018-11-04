# frozen_string_literal: true

class ViewBuilder < ApplicationRecord
  validates :table_name, presence: true
end
