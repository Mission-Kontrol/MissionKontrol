# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :load_view_builders,
                :load_target_db_tables

  private

  def load_view_builders
    @view_builders = ViewBuilder.where(status: 'active')
  end

  def load_target_db_tables
    @target_db_tables ||= Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end

  protected

  def after_sign_in_path_for(resource)
    new_layout_path
  end
end
