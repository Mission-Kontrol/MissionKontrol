class TokenController < ApplicationController
  skip_before_action :verify_authenticity_token

  ## TODO: FIX THIS SHIT
  def generate
    token = Rails.env.test? ? 'token' : ::Twilio::Capability.generate(current_admin_user)

    render json: { token: token }
  end
end
