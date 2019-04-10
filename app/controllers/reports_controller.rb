# frozen_string_literal: true

class ReportsController < ApplicationController
  layout 'dashboard'
  before_action :authenticate_admin_user!,
                :setup_demo_target_database,
                :load_available_tables

  def index; end
end
