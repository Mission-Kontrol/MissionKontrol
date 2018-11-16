# frozen_string_literal: true

class WorkListOutcome
  attr_accessor :title, :detail
  
  def initialize(args={})
    self.title = args['title']
    self.detail = args['detail']
  end
end
