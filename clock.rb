require 'clockwork'
include Clockwork

handler do |job|
  puts "Running #{job}"
end

every(60, 'bundle exec rake dummy_client_database:reset')
# every(3600, 'bundle exec rake dummy_client_database:reset')
