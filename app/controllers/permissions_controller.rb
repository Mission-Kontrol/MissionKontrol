# frozen_string_literal: true

class PermissionsController < ApplicationController
  layout 'dashboard'

  before_action :load_available_tables,
                :load_task_queues,
                :check_target_db_connection

  def index
    @headers = ['Table'] + roles.map(&:name)
    @tables = available_tables.to_a
    @roles = roles

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

    result_columns = ['Table'] + roles.map(&:name)

    result_columns.each do |c|
      columns << { data: c }
    end

    render json: {
      data: table_permission_data,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: Permission.all.count,
      recordsFiltered: Permission.all.count
    }
  end

  def roles
    Role.all.sort
  end

  def available_tables
    Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  end

  def table_permission_data
    permissions = Permission.all
    grouped_permissions = permissions.group_by(&:subject_class)
    data = []
    grouped_permissions.each do |table|
      table_data = { 'Table' => table.first.to_s }
      @roles.each do |role|
        table_data.merge!(role.name.to_s => (table.last & role.permissions).any?)
      end
      data << table_data
    end
    data
  end
end
