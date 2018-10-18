# frozen_string_literal: true

class Company < ClientRecord
  has_many :activities, as: :feedable
end
