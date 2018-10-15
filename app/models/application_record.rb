# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  establish_connection Rails.env.to_sym
end
