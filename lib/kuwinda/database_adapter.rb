# frozen_string_literal: true

module Kuwinda
  class DatabaseAdapter
    class << self
      def adapter(scheme)
        case scheme
        when 'postgresql', 'postgres'
          'postgresql'
        when 'mysql', 'mysql2'
          'mysql2'
        else
          raise InvalidClientDatabaseError.new("Do not know how to make adpater for #{scheme}")
        end
      end
    end
  end
end
