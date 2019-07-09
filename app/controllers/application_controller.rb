# frozen_string_literal: true

class InvalidClientDatabaseError < StandardError; end

class ApplicationController < ActionController::Base
  include License
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  rescue_from InvalidClientDatabaseError,
              ActiveRecord::NoDatabaseError,
              PG::ConnectionBad,
              Mysql2::Error,
              SocketError, :with => :handle_invalid_client_db_error

  def check_license
    redirect_to license_path unless license_valid?
  end

  def referred_from_demo?
    request.host_with_port == 'demo.kuwinda.io' && Rails.env.production?
  end

  protected

  def handle_invalid_client_db_error
    @available_tables = []
    @task_queues = []
    render '/layouts/bad_connection'
  end

  def after_sign_in_path_for(resource)
    dashboard_path
  end

  def after_sign_out_path_for(resource_or_scope)
    new_admin_user_session_path
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

  def adapter_for_db(scheme)
   case scheme
   when 'postgresql', 'postgres'
     return 'postgresql'
   when 'mysql', 'mysql2'
     return 'mysql2'
   else
     raise InvalidClientDatabaseError.new("don't know how to make adpater for #{scheme}")
   end
  end

  def set_relatable_tables
    @relatable_tables = []

    relatable_tables(@current_table).each do |table|
      layout = ViewBuilder.find_by_table_name(table)
      relative = {}
      @target_db_repo.table = table
      foreign_key_title = helpers.get_foreign_key(params[:table_name])
      foreign_key_value = params[:record_id]
      sql_result = @target_db_repo.find_all_related(foreign_key_title, foreign_key_value, 10, 0)
      relative[:headers] = sql_result ? sql_result.columns : []
      relative[:name] = table
      @relatable_tables << relative
    end

    @relatable_tables
  end
end
