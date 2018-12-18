# frozen_string_literal: true

class CompaniesController < ApplicationController
  layout 'dashboard'

  def index
    @companies = Company.all
  end

  def show
    @company = Company.find(params[:id])
    @activities = OpenStruct.new
    @activity = Activity.new
    set_activities_for_company
  end

  private

  def set_activities_for_company
    feedable_type = 'companies'
    feedable_id = params[:id]

    @activities_for_company = Activity.where(
      feedable_type: feedable_type,
      feedable_id: feedable_id
    )

    group_activities_by_kind
  end

  def group_activities_by_kind
    select_all_activities
    select_call_activities
    select_note_activities
    select_meeting_activities
  end

  def select_all_activities
    @activities.all = @activities_for_company
  end

  def select_call_activities
    @activities.calls = @activities_for_company.select do |i|
      i.kind == 'call'
    end
  end

  def select_meeting_activities
    @activities.meetings = @activities_for_company.select do |i|
      i.kind == 'meeting'
    end
  end

  def select_note_activities
    @activities.notes = @activities_for_company.select do |i|
      i.kind == 'note'
    end
  end
end
