# frozen_string_literal: true

class SqlDatabaseError < StandardError
  def initialize(msg = 'Something went wrong with the SQL query.')
    super
  end
end
