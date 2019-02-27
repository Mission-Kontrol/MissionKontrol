# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_admin_user!
  before_action :load_view_builders,
                :load_available_tables

  def show; end

  private

  def load_available_tables
    @available_tables = Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
  rescue Kuwinda::Gateway::InvalidClientDatabaseError => e
    @available_tables = []
    render '/tables/bad_connection'
  end
end
