# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :set_target_db_tables, only: %i[settings]
  before_action :authenticate_admin_user!

  def show; end

  def settings; end

  private

  def set_target_db_tables
    @target_db_tables ||= ClientRecord.connection.tables
  end
end
