# frozen_string_literal: true

class ViewBuilder < ApplicationRecord
  validates :table_name, presence: true

  def table_headers
    table_attributes['visible_fields'].map { |_k, field| field }
  end
end
