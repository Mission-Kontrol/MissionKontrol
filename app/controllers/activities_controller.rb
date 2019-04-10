# frozen_string_literal: true

class ActivitiesController < ApplicationController
  def create
    @activity = Activity.new(activity_params.except(:twilio_call_sid))

    respond_to do |format|
      if @activity.save
        format.js { render action: 'success' }
      else
        format.js { render action: 'failure', status: :unprocessable_entity }
      end
    end
  end

  private

  def activity_params
    params.require(:activity).permit(:content,
                                     :kind,
                                     :feedable_type,
                                     :feedable_id,
                                     :twilio_call_sid)
  end
end
