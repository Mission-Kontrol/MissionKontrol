class CallController < ApplicationController
  skip_before_action :verify_authenticity_token

  def connect
    render xml: twilio_reponse
  end

  private

  def twilio_reponse
    twilio_number = ENV['TWILIO_PHONE_NUMBER']

    res = Twilio::TwiML::VoiceResponse.new do |response|
      dial = Twilio::TwiML::Dial.new caller_id: twilio_number

      if params.include?(:phoneNumber)
        dial.number params[:phoneNumber]
      else
        dial.client(identity: 'support_agent')
      end
      response.append(dial)
    end
    return res.to_s
  end
end
