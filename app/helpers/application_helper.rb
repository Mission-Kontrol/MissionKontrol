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
end
