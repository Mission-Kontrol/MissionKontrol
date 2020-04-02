# frozen_string_literal: true

class AdminUsersController < ApplicationController
  include UserAbilities

  layout 'standard'

  STATUSES = ['active', 'inactive'].freeze

  before_action :check_user_admin_abilities

  def new
    @user = AdminUser.new
    @roles = Role.all
  end

  def create_new
    @user = AdminUser.create(user_params)
    @user.password_confirmation = user_params[:password]
    @role = Role.find(params[:team])
    @user.roles << @role

    @result = @user.save

    @admin_user_roles = admin_user_roles
    @admin_user_statuses = admin_user_statuses
  end

  def update
    @user = AdminUser.find_by(email: user_params[:email])
    @user.update_attributes(user_params.except(:password))
    unless user_params[:password].empty?
      @user.password = user_params[:password]
      @user.password_confirmation = user_params[:password]
    end

    @role = Role.find(params[:team])
    update_user_role
    @result = @user.save
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

  def show_modal
    @user = AdminUser.find(params[:id])
    @role = @user.roles.first
    @roles = Role.all
  end

  def edit
    @user = AdminUser.find(params[:id])
    @role = @user.roles.first
    @roles = Role.all
  end

  def update_role
    @user = AdminUser.find(params[:id])
    @role = Role.find(params[:role])

    update_user_role
  end

  def update_status
    @user = AdminUser.find(params[:id])
    new_status = @user.active ? false : true

    @user.update_attribute(:active, new_status)
    @user.save!

    @admin_user_statuses = admin_user_statuses
  end

  def destroy
    @user = AdminUser.find(params[:id])

    if last_admin_user?
      format.js { 'delete_failure' }
    else
      @user.delete
      @admin_user_roles = admin_user_roles
      @admin_user_statuses = admin_user_statuses
    end
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

  # rubocop:disable Metrics/MethodLength
  def render_show_js
    columns = []
    search = params.dig('search', 'value')
    filters = params.dig('columns', '2', 'search', 'value')
    offset = params['start']
    limit = params['length']

    result_columns = field_names

    result_columns.each do |c|
      columns << { data: c }
    end

    table_data = if filters.present?
                   table_data_filter(filters, limit, offset)
                 else
                   table_data(search, limit, offset)
                 end

    render json: {
      data: table_data,
      columns: columns,
      draw: params['draw'].to_i,
      recordsTotal: AdminUser.all.count,
      recordsFiltered: AdminUser.all.count
    }
  end
  # rubocop:enable Metrics/MethodLength

  def field_names
    ['name', 'email', 'team', 'active']
  end

  def load_roles
    @roles = Role.all
  end

  def update_user_role
    ActiveRecord::Base.transaction do
      @user.roles.clear
      @user.roles << @role
    end
    @admin_user_roles = admin_user_roles
  end

  def admin_user_roles
    @roles = Role.all

    admin_user_roles = {}
    @roles.each do |role|
      admin_user_roles[role.name] = AdminUser.with_role(role.name.to_sym).count
    end
    admin_user_roles
  end

  def last_admin_user?
    return false unless @user.roles.first.name == 'Admin'

    return false if admin_user_roles['Admin'] > 1

    true
  end

  def admin_user_statuses
    {
      active: AdminUser.active.count,
      inactive: AdminUser.inactive.count
    }
  end

  def table_data(search, limit = nil, offset = nil)
    result = []
    if search
      ['first_name', 'last_name', 'email'].each do |value|
        result << search_admin_users(value, search, limit, offset)
      end
      result = result.flatten.uniq
    else
      result = AdminUser.all
    end

    table_data = format_results(result)

    table_data
  end

  def table_data_filter(multi_filters, limit = nil, offset = nil)
    filters = multi_filters.split(',')
    status = filters.first
    role = filters.count > 1 ? filters.last : nil

    result = filter_admin_users(status, role, limit, offset)

    table_data = format_results(result)

    table_data
  end

  def search_admin_users(value, search_value, limit = nil, offset = nil)
    admin_users = AdminUser.where("#{value} ILIKE ?", "%#{search_value}%")
    admin_users.limit(limit).offset(offset)
  end

  def filter_admin_users(active = nil, role = nil, limit = nil, offset = nil)
    if active.present? && role.present?
      admin_users = AdminUser.with_role(role).where(active: active)
    elsif active.present?
      admin_users = AdminUser.where(active: active)
    elsif role.present?
      admin_users = AdminUser.with_role(role)
    end

    admin_users.limit(limit).offset(offset)
  end

  def format_results(results)
    table_data = []

    results.each do |user|
      table_data << {
        id: user.id,
        name: user.full_name,
        email: user.email,
        team: user.roles.first.name,
        active: user.active
      }
    end

    table_data
  end
end
