# frozen_string_literal: true

module Features
  module TableSessionHelpers
    def sign_in_admin_user_with_full_permissions(table)
      sign_in_and_set_up_tables(table)
      give_role_all_permissions(@user.roles.first, table)
      visit table_path(id: @database.id, table: 'attending_events')
      wait_for_ajax
    end

    def sign_in_admin_user_with_single_permissions(table, action)
      sign_in_and_set_up_tables(table)
      give_role_single_permission(@user.roles.first, 'attending_events', action)
      visit table_path(id: @database.id, table: 'attending_events')
      wait_for_ajax
    end

    def sign_in_and_set_up_tables(table)
      sign_in_as_admin_with_license
      setup_tables_and_roles(table)
      create(:target_table_setting, name: @table, database_id: @database.id)
    end

    def sign_in_admin_user_with_complete_table_settings(table)
      sign_in_as_admin_with_license
      setup_tables_and_roles(table)
      editable_fields = {
        id: { editable: false, reference: '' },
        user_id: { editable: true, reference: '', mandatory: true },
        transaction_id: { editable: true, reference: '', mandatory: false },
        created_at: { editable: false, reference: '' },
        updated_at: { editable: false, reference: '' }
      }
      create(:target_table_setting, name: @table, database_id: @database.id, nested_table: nil, editable_fields: editable_fields)
      give_role_all_permissions(@user.roles.first, table)
      visit table_path(id: @database.id, table: table)
      wait_for_ajax
    end
  end
end

RSpec.configure do |config|
  config.include Features::TableSessionHelpers, type: :feature
end
