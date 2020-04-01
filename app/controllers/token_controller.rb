class TokenController < ApplicationController
  skip_before_action :verify_authenticity_token

  ## TODO: FIX THIS SHIT
  def generate
    if Rails.env.test?
      token = 'token'
    else
      token = ::Twilio::Capability.generate(current_admin_user)
    end

    render json: { token: token }
  end
end
