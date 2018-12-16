# frozen_string_literal: true

class TablesController < ApplicationController
  layout 'dashboard'
  before_action :authenticate_admin_user!

  def show
    @activities = OpenStruct.new
    @activities.all = []
    @activities.calls = []
    @activities.meetings = []
    @activities.notes = []
    @users = User.all
    @companies = Company.all
    @table_name = params[:id]
    @table = Table.new
    @table.name = @table_name
  end

  def preview
    table = Table.new
    table.name = params[:table_name]
    @table_name = table.name
    @row = table.row(params[:record_id]).first
  end
end
