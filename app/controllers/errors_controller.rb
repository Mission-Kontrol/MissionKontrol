# frozen_string_literal: true

class ErrorsController < ApplicationController
  def not_found
    respond_to do |format|
      format.html { render status: 404, layout: 'dashboard' }
      format.js { render status: 404, layout: 'dashboard' }
    end
  end

  def internal_server_error
    respond_to do |format|
      format.html { render status: 500, layout: 'dashboard' }
      format.js { render status: 500, layout: 'dashboard' }
    end
  end

  def not_acceptable
    respond_to do |format|
      format.html { render status: 406, layout: 'dashboard' }
      format.js { render status: 406, layout: 'dashboard' }
    end
  end

  def not_authorized
    respond_to do |format|
      format.html { render status: 401, layout: 'dashboard' }
      format.js { render status: 401, layout: 'dashboard' }
    end
  end
end
