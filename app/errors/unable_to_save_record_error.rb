# frozen_string_literal: true

class UnableToSaveRecordError < StandardError
  def initialize(msg = 'Something went wrong and we cannot save the record')
    super
  end
end
