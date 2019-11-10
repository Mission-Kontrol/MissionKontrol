# frozen_string_literal: true

class AdminUsersController < ApplicationController
  layout 'dashboard'

  STATUSES = ['active', 'inactive'].freeze

  before_action :load_available_tables,
                :load_task_queues,
                :check_target_db_connection, only: [:index]

  def index
    @users = AdminUser.all
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

  def edit
    @user = AdminUser.find(params[:id])
    @role = @user.roles.first
    @roles = Role.all
  end

  def update_role
    @user = AdminUser.find(params[:id])
    @role = Role.find(params[:role])

    @user.roles.clear
    @user.roles << @role
    @admin_user_roles = admin_user_roles
  end

  def update_status
    @user = AdminUser.find(params[:id])
    new_status = @user.active ? false : true

    @user.update_attribute(:active, new_status)
    @user.save!

    @admin_user_statuses = admin_user_statuses
  end

  private

  def render_show_html
    @headers = field_names << 'actions'
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
    ['email', 'first_name', 'last_name', 'active']
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
    {
      active: AdminUser.active.count,
      inactive: AdminUser.inactive.count
    }
  end
end
