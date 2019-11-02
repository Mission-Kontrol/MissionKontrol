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

  def add_to_role
    @permission = Permission.find_by(subject_class: permission_params[:table],
                                    action: permission_params[:permission])
    @role = Role.find_by(name: permission_params[:role])

    @role.permissions << @permission unless @role.permissions.include? @permission

    # render js: 'add_to_role'
    respond_to do |format|
      format.js {}
    end
  end

  def remove_from_role
    @permission = Permission.find_by(subject_class: permission_params[:table],
                                     action: permission_params[:permission])
    @role = Role.find_by(name: permission_params[:role])

    @role.permissions.delete(@permission) if @role.permissions.include? @permission

    respond_to do |format|
      format.js {}
    end
  end

  private

  def permission_params
    params.permit(:permission, :role, :table)
  end

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
        table_data.merge!(role.name.to_s => role_permissions_level(table.last, role))
        table.last.each do |permission|
          data_key = role.name + '_' + permission.action
          data_value = role_has_permission?(permission, role)
          table_data.merge!(data_key => data_value)
        end
      end
      data << table_data
    end
    data
  end

  def role_permissions_level(table, role)
    permissions = (table & role.permissions)
    if permissions.empty?
      "<img src='/assets/images/icons/circle-with-cross.png'>"
    elsif permissions.length == table.length
      "<img src='/assets/images/icons/circle-with-check-symbol.png'>"
    else
      "<img src='/assets/images/icons/circle-with-contrast.png'>"
    end
  end

  def role_has_permission?(permission, role)
    role.permissions.include? permission
  end
end
