# frozen_string_literal: true

class NotAuthorizedError < StandardError
  def initialize(msg="Not authorized to perform this action")
    super
  end
end