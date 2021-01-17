# frozen_string_literal: true

module ApplicationHelper
  def active_controller?(controller_name, class_name = nil)
    return nil unless params[:controller] == controller_name
    class_name.nil? ? 'active' : class_name
  end

  def active_action?(action_name)
    params[:action] == action_name ? 'active' : nil
  end

  def is_phone_number?(phone_number)
    number_to_phone(phone_number, raise: true)
  rescue
    false
  end

  def demo_app
    request.host_with_port == 'demo.kuwinda.io' && Rails.env.production?
  end

  def get_available_tables(database)
    database_connection = Kuwinda::UseCase::DatabaseConnection.new(database).execute
    Kuwinda::Presenter::ListAvailableTables.new(database_connection).call
  end

  def tables_with_view_permission(database)
    get_available_tables(database).select { |table| current_admin_user.permission?(:view, table, database.id) }
  end

  def current_database_view_id
    if (active_controller?('tables') && active_action?('show')) == "active"
      request.original_fullpath.split("/")&.last.split("?").first&.to_i
    end
  end
end
