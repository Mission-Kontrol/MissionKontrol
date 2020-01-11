# frozen_string_literal: true

class DatabasesController < ApplicationController
  layout 'dashboard'

  def new
    @database = Database.new
  end

  def create
  end
end