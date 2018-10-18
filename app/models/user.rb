# frozen_string_literal: true

class User < ClientRecord
  has_many :activities, as: :feedable
end
