# frozen_string_literal: true

class InvalidClientDatabaseError < StandardError
  def initialize(msg = 'Client database is invalid')
    super
  end
end
