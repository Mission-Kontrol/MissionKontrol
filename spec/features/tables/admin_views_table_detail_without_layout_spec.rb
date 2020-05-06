# frozen_string_literal: true

feature 'Admin views a table without a layout', type: :feature do
  before do
    delete_layout_for_users
  end

  xscenario 'navigating to a table item without a layout will redirect to the layout builder' do
    sign_in_as_admin
    then_click_the_users_link
    when_i_click_the_first_user
    then_i_expect_to_be_redirected_to_the_layout_builder
  end
end

def delete_layout_for_users
  ViewBuilder.where(table_name: 'users').delete_all
end

def then_click_the_users_link
  within('#side-menu') do
    click_link 'users'
  end
end

def when_i_click_the_first_user
  within('.table') do
    # page.find(:css, ".clickable-row").click()
    # first('tbody > tr').click
    find('tr[data-href="/tables/users/3?table=users"]').click
    # page.find(:xpath, "//table/tbody/tr").first.click
  end
end

def then_i_expect_to_be_redirected_to_the_layout_builder
  expect(page).to have_current_path(new_layout_path)
end
