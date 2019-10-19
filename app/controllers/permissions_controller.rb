# frozen_string_literal: true

class PermissionsController < ApplicationController
  layout 'dashboard'

  before_action :load_available_tables,
                :load_task_queues,
                :check_target_db_connection

  def index
    @users = AdminUser.all
    @headers = roles
    @tables = available_tables.to_a
    @roles = Role.all

    respond_to do |format|
      format.html do
        render_show_html
      end

      format.js do
        render_show_js
      end
    end
  end

  private

  def render_show_html
    render :index
  end

  def render_show_js
    columns = []

    result_columns = available_tables.to_a

    result_columns.each do |c|
      columns << { data: c }
    end

    data = Permission.all

    render json: {
      data: data,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: Permission.all.count,
      recordsFiltered: Permission.all.count
    }
  end

  def roles
    Role.all.map(&:name)
  end

  def available_tables
    Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end
end