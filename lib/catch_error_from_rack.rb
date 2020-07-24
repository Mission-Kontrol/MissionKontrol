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
    connection_pool = nil
    until connection_pool do
      connection_pool = ActiveRecord::Base.connection_pool rescue nil
    end

    ActiveRecord::Base.connection_pool.disconnect! if connection_pool
    ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)

    status, headers, body = @app.call(env)
    [status, headers, body]
  rescue ActionController::BadRequest
    [301, { 'Location' => get_hostname(env) }, []]
  end

  def get_hostname(env)
    "#{env['SERVER_NAME']}:#{env['SERVER_PORT']}"
  end
end
