# frozen_string_literal: true

class AdminUsersController < ApplicationController
  layout 'dashboard'

  STATUSES = ['active', 'inactive', 'suspended'].freeze

  before_action :load_available_tables,
                :load_task_queues,
                :check_target_db_connection

  def index
    @users = AdminUser.all
    @headers = field_names
    @admin_user_roles = admin_user_roles
    @admin_user_statuses = admin_user_statuses

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
    @headers = field_names
    @roles = Role.all
    render :index
  end

  def render_show_js
    columns = []

    result_columns = field_names

    result_columns.each do |c|
      columns << { data: c }
    end

    data = AdminUser.all

    render json: {
      data: data,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: AdminUser.all.count,
      recordsFiltered: AdminUser.all.count
    }
  end

  def field_names
    ['email', 'first_name', 'last_name', 'status']
  end

  def load_roles
    @roles = Role.all
  end

  def admin_user_roles
    @roles = Role.all

    admin_user_roles = {}
    @roles.each do |role|
      admin_user_roles[role.name] = AdminUser.with_role(role.name.to_sym).count
    end
    admin_user_roles
  end

  def admin_user_statuses
    admin_user_statuses = {}
    STATUSES.each do |status|
      count = AdminUser.where(status: status).count
      admin_user_statuses[status] = count
    end

    admin_user_statuses
  end
end
