class ErrorsController < ApplicationController
  def not_found
    respond_to  do |format|
      format.html { }
      format.js { render status: 404 }
    end
  end

  def internal_server_error
    render status: 500
  end
end