# frozen_string_literal: true

module ApplicationHelper
  def active_controller?(controller_name, class_name = nil)
    return nil unless params[:controller] == controller_name
    class_name.nil? ? 'active' : class_name
  end

  def active_action?(action_name)
    params[:action] == action_name ? 'active' : nil
  end

  def available_tables
    Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end
end
