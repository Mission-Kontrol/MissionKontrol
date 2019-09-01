# frozen_string_literal: true

class AdminUsersController < ApplicationController
  layout 'dashboard'

  before_action :load_available_tables,
                :load_task_queues,
                :check_target_db_connection

  def index
    @users = AdminUser.all
    @headers = field_names

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
    @headers = field_names
    @roles = Role.all
    render :index
  end

  def render_show_js
    offset = params['start']
    limit = params['length']
    search = params.dig('search', 'value')
    searchable_columns = params['columns']
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
    AdminUser.attribute_names - ['encrypted_password', 'reset_password_token', 'reser_password_sent_at', 'remember_created_at']
  end
end
