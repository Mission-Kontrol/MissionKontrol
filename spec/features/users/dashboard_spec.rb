# frozen_string_literal: true

require 'rails_helper'

RSpec.feature 'User Dashboard Side Navigation', type: :feature do
  scenario 'navigating to users will redirect to users route' do
    given_i_am_on_the_dashboard_page
    when_i_click_the_users_link
    then_i_expect_to_be_redirected_to_the_users
  end
end

RSpec.feature 'User Dashboard Side Navigation', type: :feature do
  scenario 'navigating to companies will redirect to companies route' do
    given_i_am_on_the_dashboard_page
    when_i_click_the_companies_link
    then_i_expect_to_be_redirected_to_the_companies
  end
end

RSpec.feature 'User Dashboard Side Navigation', type: :feature do
  scenario 'navigating to reports  will redirect to reports route' do
    given_i_am_on_the_dashboard_page
    when_i_click_the_reports_link
    then_i_expect_to_be_redirected_to_the_reports
  end
end

def given_i_am_on_the_dashboard_page
  visit '/dashboard'
end

def when_i_click_the_users_link
  within('#side-menu') do
    click_link 'Users'
  end
end

def when_i_click_the_companies_link
  within('#side-menu') do
    click_link 'Companies'
  end
end

def when_i_click_the_reports_link
  within('#side-menu') do
    click_link 'Reports'
  end
end

def then_i_expect_to_be_redirected_to_the_users
  expect(page).to have_current_path(users_path)
end

def then_i_expect_to_be_redirected_to_the_companies
  expect(page).to have_current_path(companies_path)
end

def then_i_expect_to_be_redirected_to_the_reports
  expect(page).to have_current_path(reports_path)
end
