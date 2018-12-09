# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    redirect_to dashboard_path if admin_user_signed_in?
  end
end
