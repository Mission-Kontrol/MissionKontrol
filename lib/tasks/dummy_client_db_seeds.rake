# frozen_string_literal: true

namespace :dummy_client_database do
  desc 'Seed client database'
  task seeds: :environment do
    run_client_database_seeds
  end
end

def run_client_database_seeds
  client_database = Kuwinda::UseCase::DatabaseConnection.new.execute

  client_database.connection.exec_query(events_query)
end

def events_query
  "INSERT INTO events (id, day, area, level, plan, space, meeting, created_at, updated_at, user_id) VALUES
    (1, 'Monday', 'London', 'pro', 'gold', 6, '05:00', '2013-06-01', '2013-06-01', 3),
    (2, 'Tuesday', 'Morzine', 'beginner', 'silver', 2, '13:00', '2015-06-01', '2015-06-01', 3),
    (3, 'Monday', 'Nairobi', 'pro', 'gold', 7, '09:00', '2016-06-01', '2016-06-01', 4),
    (4, 'Wednesday', 'Amsterdam', 'beginner', 'platinum', 5, '05:00', '2013-08-01', '2013-10-01', 5),
    (5, 'Sunday', 'Birmingham', 'intermediate', 'gold', 6, '10:00', '2013-06-01', '2013-06-01', 5),
    (6, 'Monday', 'New York', 'pro', 'silver', 4, '05:00', '2013-06-01', '2013-06-01', 6);"
end
