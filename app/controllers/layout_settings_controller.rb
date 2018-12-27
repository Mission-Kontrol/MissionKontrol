# frozen_string_literal: true

class LayoutSettingsController < ApplicationController

  before_action :set_layout_setting

  def create
    respond_to do |format|
      if @layout_setting.save
        format.js { render action: 'create/success' }
      else
        format.js { render action: 'create/failure', status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @layout_setting.update(layout_setting_params)
        format.js { render action: 'update/success' }
      else
        format.js { render action: 'update/failure', status: :unprocessable_entity }
      end
    end
  end

  private

  def set_layout_setting
    @layout_setting = if !params[:id].nil?
      LayoutSetting.find(params[:id])
    else
      LayoutSetting.new(layout_setting_params)
    end
  end

  def layout_setting_params
    params.require(:layout_setting).permit(:primary_table,
                                            :parent_comments_table,
                                            :show_status,
                                            :commentable,
                                            :layout_id)
  end
end
