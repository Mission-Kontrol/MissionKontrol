# frozen_string_literal: true

require 'rails_helper'

describe 'Build new view for a table', type: :feature do
  context 'selecting table' do
    it 'shows available fields for the table', js: true do
      given_i_am_on_the_new_view_builder_page
      when_i_select_the_users_table
      wait_for_ajax
      expect(page).to have_content('email')
    end
  end

  context 'configuring the fields page' do
    before do
      given_i_have_selected_a_table_and_fields
    end

    it 'returns the selected fields in a table', js: true do
      expect(page).to have_selector(:id, 'tableOrderConfiguration')
    end

    it 'returns a dropdown to modify default rows', js: true do
      expect(page).to have_selector(:id, 'defaultRows')
    end

    context 'modifying the fields positions' do

    end
  end
end

def given_i_am_on_the_new_view_builder_page
  visit '/view_builder/new'
end

def when_i_select_the_users_table
  select('Users', from: 'Select table')
end

def given_i_have_selected_a_table_and_fields
  given_i_am_on_the_new_view_builder_page
  when_i_select_the_users_table
  wait_for_ajax
  select('email', from: '_helper1')
  select('user', from: '_helper1')
  select('name', from: '_helper1')
  click_button 'Next'
  wait_for_ajax
end
