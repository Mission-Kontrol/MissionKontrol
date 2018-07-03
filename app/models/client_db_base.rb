class ClientDbBase < ActiveRecord::Base
  self.abstract_class = true
  Kuwinda::UseCase::DatabaseConnection.new.execute
end
