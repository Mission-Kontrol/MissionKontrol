module Twilio
  class Capability
    def self.generate(user)
      account_sid     = user.twilio_account_sid
      auth_token      = user.twilio_auth_token
      application_sid = user.twilio_application_sid
      role = user.role

      capability = Twilio::JWT::ClientCapability.new(account_sid, auth_token)

      outgoing_scope = Twilio::JWT::ClientCapability::OutgoingClientScope.new(application_sid, role)
      capability.add_scope outgoing_scope

      capability.to_s
    end
  end
end
