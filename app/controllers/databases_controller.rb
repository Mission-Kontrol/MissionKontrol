# frozen_string_literal: true

class DatabasesController < ApplicationController
  include DatabaseActions
  include DatabasePresenterActions

  layout 'standard'

  before_action :check_user_permissions, only: %i[new edit]

  IGNORED_COLUMNS = %w[id created_at updated_at].freeze

  def index
    @databases = Database.all
    can_add = current_admin_user.admin_abilities? && params[:settings]
    json = { databases: @databases.sort, can_add: can_add }.to_json

    respond_to do |format|
      format.js { render json: json }
    end
  end

  def new
    @database = Database.new
  end

  def create
    @database = Database.new(database_params)
    create_database_actions
  end

  def edit
    @database = Database.find(params[:id])
  end

  def update
    @database = Database.find(params[:id])
    update_database_actions
  end

  def destroy
    database = Database.find(params[:id])
    database.delete
    redirect_to dashboard_path
  rescue ActiveRecord::RecordNotFound
    flash[:alert] = 'Something went wrong trying to delete this database. Please try again.'
    redirect_to(databases_path)
  end

  def table_fields_with_type
    @database = Database.find(params[:id])
    @database_connection = database_connection
    @fields_with_type = list_table_fields_with_type(params[:table])
    render json: @fields_with_type.sort
  end

  def related_table_fields_with_type
    @database = Database.find(params[:id])
    @database_connection = database_connection
    table = params[:table]
    related_tables = relatable_tables(table)
    table_fields_with_type = list_table_fields_with_type(table)
    all_fields_with_type = []
    table_fields_with_type.each { |field| all_fields_with_type << field }
    related_tables.each do |related_table|
      list_related_table_fields_with_type(related_table).each { |field| all_fields_with_type << field }
    end
    render json: all_fields_with_type
  end

  private

  def check_user_permissions
    return if current_admin_user.admin_abilities?

    flash[:alert] = 'You do not have sufficient permissions to manage database settings'
    redirect_to(dashboard_path)
  end

  def database_params
    params.require(:database).permit(:friendly_name,
                                     :adapter,
                                     :host,
                                     :port,
                                     :name,
                                     :password,
                                     :password_changed,
                                     :username)
  end

  def database_params_update
    permitted = params.require(:database).permit(:friendly_name,
                                                 :adapter,
                                                 :host,
                                                 :port,
                                                 :name,
                                                 :username,
                                                 :domain_url,
                                                 :gem_token)

    permitted.merge!(password: params[:database][:password]) if params[:database][:password_changed] == 'true'
    permitted
  end

  def password_param
    params[:database][:password]
  end
end
