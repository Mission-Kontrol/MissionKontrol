# frozen_string_literal: true

module DatabaseConnection
  def self.reconnect_to_database
    ActiveRecord::Base.connection_pool.disconnect! if ActiveRecord::Base.connection_pool
    ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations.configs_for(env_name: Rails.env).first)
    "reconnected" if ActiveRecord::Base.connection.active?
  end
end
