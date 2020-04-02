# frozen_string_literal: true

require 'rack'

class CatchErrorFromRack
  def initialize(app)
    @app = app
  end

  def call(env)
    status, headers, body = @app.call(env)
    [status, headers, body]
  rescue ActiveRecord::ConnectionNotEstablished
    ActiveRecord::Base.establish_connection
    status, headers, body = @app.call(env)
    [status, headers, body]
  rescue ActionController::BadRequest
    [301, { 'Location' => get_hostname(env) }, []]
  end

  def get_hostname(env)
    "#{env['SERVER_NAME']}:#{env['SERVER_PORT']}"
  end
end
