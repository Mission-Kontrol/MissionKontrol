# frozen_string_literal: true

FactoryBot.define do
  factory :activity do
    content 'met with a user today'
    kind 'meeting'
  end
end
