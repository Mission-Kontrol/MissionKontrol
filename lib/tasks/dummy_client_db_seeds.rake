# frozen_string_literal: true

namespace :dummy_client_database do
  desc 'Seed client database'
  task all_seeds: :environment do
    run_single_seeds(users_query)
    run_single_seeds(events_query)
    run_single_seeds(attending_events_query)
  end

  task user_seeds: :environment do
    run_single_seeds(users_query)
  end

  task events_seeds: :environment do
    run_single_seeds(events_query)
  end

  task attending_events_seeds: :environment do
    run_single_seeds(attending_events_query)
  end
end

def client_database
  Kuwinda::UseCase::DatabaseConnection.new.execute
end

def run_single_seeds(query)
  client_database.connection.exec_query(query)
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

def users_query
  "INSERT INTO users (id, email, encrypted_password, name, level) VALUES
    (3, 'test3@example.com', md5('password'), 'Test3', 'pro'),
    (4, 'test4@example.com', md5('password'), 'Test4', 'beginner'),
    (5, 'test5@example.com', md5('password'), 'Test5', 'intermediate'),
    (6, 'test6@example.com', md5('password'), 'Test6', 'pro');"
end

def attending_events_query
  "INSERT INTO attending_events (id, event_id, user_id, created_at, updated_at) VALUES
    (1, 2, 3, '2016-06-01', '2016-06-01'),
    (2, 2, 5, '2016-06-01', '2016-06-01'),
    (3, 4, 3, '2016-06-01', '2016-06-01'),
    (4, 5, 6, '2016-06-01', '2016-06-01'),
    (5, 5, 3, '2016-06-01', '2016-06-01');"
end
