# frozen_string_literal: true

class InvalidClientDatabaseError < StandardError; end

class ApplicationController < ActionController::Base
  include License
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  rescue_from InvalidClientDatabaseError,
              ActiveRecord::NoDatabaseError,
              PG::ConnectionBad, :with => :handle_invalid_client_db_error

  def check_license
    redirect_to license_path unless license_valid?
  end

  def referred_from_demo?
    request.host_with_port == 'demo.kuwinda.io'
  end

  protected

  def handle_invalid_client_db_error
    @available_tables = []
    @task_queues = []
    render '/tables/bad_connection'
  end

  def after_sign_in_path_for(resource)
    dashboard_path
  end

  def list_table_fields_with_type(table)
    Kuwinda::Presenter::ListTableFieldsWithType.new(ClientRecord, table).call
  end

  private

  def load_available_tables
    @available_tables = Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end

  def load_task_queues
    @task_queues = TaskQueue.all
  end

  def set_activities
    @activities = OpenStruct.new
    @activities.all = []
    @activities.calls = []
    @activities.meetings = []
    @activities.notes = []
  end

  def relatable_tables(table)
    Kuwinda::Presenter::ListRelatableTables.new(ClientRecord, table).call
  end
end
