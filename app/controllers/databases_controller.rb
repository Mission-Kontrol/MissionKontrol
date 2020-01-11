# frozen_string_literal: true

class DatabasesController < ApplicationController
  layout 'dashboard'

  def new
    @database = Database.new
  end

  def create
    if testing?
      @active_connection = test_connection
      render :test_connection and return
    else
      @database = Database.new(database_params)
      @database.password = password_param
      @result = @database.save!
    end
  end

  private

  def database_params
    params.require(:database).permit(:friendly_name,
                                     :adapter,
                                     :host,
                                     :port,
                                     :name,
                                     :username)
  end

  def password_param
    params[:database][:password]
  end

  def testing?
    params[:commit] == "Test connection"
  end

  def test_connection
    connection = ActiveRecord::Base.establish_connection(
      adapter: adapter_for_db(database_params[:adapter]),
      host: database_params[:host],
      username: database_params[:username],
      password: password_param,
      database: database_params[:name],
      port: database_params[:port]
    ).connection

    connection.active?
  end
end