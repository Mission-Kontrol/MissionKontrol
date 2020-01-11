# frozen_string_literal: true

class DatabasesController < ApplicationController
  layout 'dashboard'

  def new
    @database = Database.new
  end

  def create
    @database = Database.new(database_params)
    @database.password = params[:database][:password]
    @result = @database.save!
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
end