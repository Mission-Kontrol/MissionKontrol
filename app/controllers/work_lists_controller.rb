# frozen_string_literal: true

class WorkListsController < ApplicationController
  layout 'dashboard'

  def index; end

  def show
    work_lists = [
      'Accounts without demos',
      'End of trial calls',
      'Slipping away'
    ]

    @work_list = work_lists[params[:id].to_i - 1]
  end
end
