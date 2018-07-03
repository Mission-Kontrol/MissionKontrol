module Kuwinda
  module Gateway
    class DatabaseConnectionGateway
      def connect
        ActiveRecord::Base.establish_connection(CLIENT_DB)
      end
    end
  end
end
