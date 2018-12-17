# frozen_string_literal: true

class TablesController < ApplicationController
  layout 'dashboard'
  before_action :authenticate_admin_user!, :set_target_db_repo


  def show
    @activities = OpenStruct.new
    @activities.all = []
    @activities.calls = []
    @activities.meetings = []
    @activities.notes = []
  end

  def preview
    @target_db_repo.table = params[:table_name]
    @row = @target_db_repo.find(params[:record_id])
  end

  private

  def set_target_db_repo
    @target_db_repo = Kuwinda::Repository::TargetDB.new(params[:id])
  end
end
