# frozen_string_literal: true

class WorkListOutcome
  attr_accessor :title,
                :detail

  def initialize(args = {})
    self.title = args['title'] || ''
    self.detail = args['detail'] || ''
  end

  def to_hash
    hash = {}
    hash['title'] = title
    hash['detail'] = detail
    hash
  end
end
