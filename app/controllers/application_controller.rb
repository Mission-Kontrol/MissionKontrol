# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :load_view_builders,
                :load_available_tables

  private

  def load_view_builders
    @view_builders = ViewBuilder.where(status: 'active')
  end

  def load_available_tables
    @available_tables = Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  rescue Kuwinda::Gateway::InvalidClientDatabaseError => e
    @available_tables = []
  end

  protected

  def after_sign_up_path_for(resource)
    new_layout_path
  end
end
