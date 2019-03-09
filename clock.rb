require 'clockwork'
include Clockwork

handler do |job|
  puts "Running #{job}"
end

every(3600, 'bundle exec rake dummy_client_database:reset')
