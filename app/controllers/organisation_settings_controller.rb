class OrganisationSettingsController < ApplicationController
  layout 'dashboard'

  before_action :load_available_tables,
                :load_task_queues,
                :check_target_db_connection

  def edit
    @organisation = OrganisationSetting.find params[:id]
  end

  def update
    @organisation = OrganisationSetting.find params[:id]

    if @organisation.update!(organisation_params)
      respond_to do |format|
        format.js { }
      end
    end
  end

  private

  def organisation_params
    params.require(:organisation_setting).permit(:company_name, :license_key)
  end
end