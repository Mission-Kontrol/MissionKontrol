# frozen_string_literal: true

require 'rack'

class CatchErrorFromRack
  def initialize(app)
    @app = app
  end

  # rubocop:disable Style/RescueModifier
  def call(env)
    if ActiveRecord::Base.connection.active?
      status, headers, body = @app.call(env)
      [status, headers, body]
    else
      ActiveRecord::Base.connection_pool.disconnect! if connection_pool
      ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
    end
  rescue ActiveRecord::ConnectionNotEstablished
    connection_pool = nil

    connection_pool = ActiveRecord::Base.connection_pool rescue nil until connection_pool

    ActiveRecord::Base.connection_pool.disconnect! if connection_pool
    ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)

    status, headers, body = @app.call(env)
    [status, headers, body]
  rescue ActionController::BadRequest
    [301, { 'Location' => get_hostname(env) }, []]
  end
  # rubocop:enable Style/RescueModifier

  def get_hostname(env)
    "#{env['SERVER_NAME']}:#{env['SERVER_PORT']}"
  end
end
