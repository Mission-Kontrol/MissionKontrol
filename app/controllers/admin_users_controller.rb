# frozen_string_literal: true

class AdminUsersController < ApplicationController
  layout 'dashboard'

  STATUSES = ['active', 'inactive'].freeze

  before_action :load_available_tables,
                :load_task_queues,
                :check_target_db_connection, only: [:index]

  def new
    @user = AdminUser.new
    @roles = Role.all
  end

  def create_new
    @user = AdminUser.create(user_params)
    @user.password_confirmation = user_params[:password]
    @role = Role.find(params[:team])
    @user.roles << @role

    @user.save!
    @admin_user_roles = admin_user_roles
    @admin_user_statuses = admin_user_statuses
  end

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

  def user_params
    params.require(:admin_user).permit(
      :first_name,
      :last_name,
      :email,
      :active,
      :password
    )
  end

  def render_show_html
    @headers = field_names << 'actions'
    render :index
  end

  def render_show_js
    columns = []
    search = params.dig('search', 'value')

    result_columns = field_names

    result_columns.each do |c|
      columns << { data: c }
    end

    render json: {
      data: table_data(search, columns),
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: AdminUser.all.count,
      recordsFiltered: AdminUser.all.count
    }
  end

  def field_names
    ['name', 'email', 'team', 'active']
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

  def table_data(search, columns)
    table_data = []

    result = []
    if search
      ['first_name', 'last_name', 'email'].each do |value|
        result << search_admin_users(value, search)
      end
      result = result.flatten.uniq
    else
      result = AdminUser.all
    end

    result.each do |user|
      table_data << {
        id: user.id,
        name: user.name,
        email: user.email,
        team: user.roles.first.name,
        active: user.active
      }
    end

    table_data
  end

  def search_admin_users(value, search_value)
    AdminUser.where("#{value} ILIKE ?", "%#{search_value}%")
  end
end
