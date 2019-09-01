class OrganisationSettingsController < ApplicationController
  layout 'dashboard'

  before_action :load_available_tables,
                :load_task_queues,
                :check_target_db_connection

  def edit
    @organisation = OrganisationSetting.find params[:id]
  end
end