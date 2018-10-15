class ActivitiesController < ApplicationController
  # POST /activities
  # POST /activities.json
  def create
    @activity = Activity.new(activity_params)

    respond_to do |format|
      if @activity.save
        format.js { render :action => "success" }
      else
        format.js { render :action => "failure", status: :unprocessable_entity }
      end
    end
  end 

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def activity_params
      params.require(:activity).permit(:user_id, :content, :kind)
    end
end
