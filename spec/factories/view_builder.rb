# frozen_string_literal: true

FactoryBot.define do
  factory :view_builder do
    view_name { 'View name' }
    table_name { 'Events' }
    status { 'active' }
    table_attributes {
      {
        'visible_fields' => {
          '1' => 'area',
          '2' => 'level',
          '3' => 'plan',
          '4' => 'space'
        },
        'default_rows' => '10'
      }
    }
  end
end
