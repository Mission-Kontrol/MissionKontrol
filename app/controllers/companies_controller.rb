# frozen_string_literal: true

class CompaniesController < ApplicationController
  layout 'dashboard'

  def index
    @companies = Company.all
  end

  def show
    @company = Company.find(params[:id])
  end
end
