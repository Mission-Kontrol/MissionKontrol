class CallController < ApplicationController
  skip_before_action :verify_authenticity_token

  def connect
    render xml: twilio_reponse
  end

  private

  def twilio_reponse
    admin = AdminUser.last

    res = Twilio::TwiML::VoiceResponse.new do |response|
      dial = Twilio::TwiML::Dial.new caller_id: admin.twilio_caller_id
      dial.number params[:phoneNumber]
      response.append(dial)
    end
    return res.to_s
  end
end
