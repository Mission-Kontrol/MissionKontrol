# frozen_string_literal: true

require 'rails_helper'

RSpec.feature 'Build new view for a table', type: :feature do
  scenario 'viewing available fields for a table' do
    given_i_am_on_the_new_view_builder_page
    when_i_select_the_users_table
    then_i_expect_to_see_available_fields
  end
end

def given_i_am_on_the_new_view_builder_page
  visit '/view_builder/new'
end

def when_i_select_the_users_table
  select('Users', from: 'Select table')
end

def then_i_expect_to_see_available_fields
  expect(page).to have_content('Email')
end
