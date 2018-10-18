# frozen_string_literal: true

class ActivitiesController < ApplicationController
  before_action :set_feedable, only: [:create]

  def create
    @activity = @feedable.activities.new(activity_params)

    respond_to do |format|
      if @feedable.save
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
                                     :feedable_id)
  end

  def set_feedable
    feedable_klass = params[:activity][:feedable_type].capitalize.constantize
    @feedable = feedable_klass.find(params[:activity][:feedable_id])
  end
end
