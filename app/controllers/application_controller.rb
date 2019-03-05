# frozen_string_literal: true

class InvalidClientDatabaseError < StandardError; end

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :load_view_builders
  rescue_from InvalidClientDatabaseError, :with => :handle_invalid_client_db_error

  private

  def load_view_builders
    @view_builders = ViewBuilder.where(status: 'active')
  end

  protected

  def after_sign_up_path_for(resource)
    new_layout_path
  end

  def handle_invalid_client_db_error
    @available_tables = []
    render '/tables/bad_connection'
  end
end
