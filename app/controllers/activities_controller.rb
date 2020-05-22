# frozen_string_literal: true

class ActivitiesController < ApplicationController
  include TableActivity

  layout 'standard'

  before_action :set_activities, only: :index

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

  def create_js
    @activity = Activity.new(js_activity_params)

    respond_to do |format|
      if @activity.save
        json = {
          activity: @activity,
          created_at: @activity.created_at.strftime('%a, %d %b %Y at %I:%M'),
          user_name: @activity.admin_user.full_name
        }
        format.js { render action: 'success', json: json }
      else
        format.js { render action: 'failure', status: :unprocessable_entity }
      end
    end
  end

  def index
    @activity = Activity.new
    @feedable_type = params[:feedable_type]
    @feedable_id = params[:feedable_id]
    @activities_for_table = Activity.where(
      feedable_type: @feedable_type,
      feedable_id: @feedable_id
    ).sort_by(&:created_at).reverse

    group_activities_by_kind
  end

  private

  def activity_params
    params.require(:activity).permit(:content,
                                     :kind,
                                     :feedable_type,
                                     :feedable_id,
                                     :user_id,
                                     :twilio_call_sid)
  end

  def js_activity_params
    params.permit(:content,
                  :kind,
                  :feedable_type,
                  :feedable_id,
                  :user_id)
  end
end
