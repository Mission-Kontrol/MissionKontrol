# frozen_string_literal: true

namespace :dummy_client_database do
  desc 'Seed client database'
  task all_seeds: :environment do
    run_single_seeds(users_query)
    run_single_seeds(events_query)
    run_single_seeds(attending_events_query)
    run_single_seeds(companies_query)
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
  begin
    client_database.connection.exec_query(query)
  rescue ActiveRecord::RecordNotUnique => e
  end
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
    (3, 'willie.m@kuwinda.io', md5('password'), 'Willie Monroe', 'pro'),
    (4, 'jaime.m@kuwinda.io', md5('password'), 'Jaime Mungia', 'beginner'),
    (5, 'claressa.s@kuwinda.io', md5('password'), 'Claressa Shields', 'intermediate'),
    (6, 'katie.t.t@kuwinda.io', md5('password'), 'Katie Taylor', 'pro');"
end

def attending_events_query
  "INSERT INTO attending_events (id, event_id, user_id, created_at, updated_at) VALUES
    (1, 2, 3, '2016-06-01', '2016-06-01'),
    (2, 2, 5, '2016-06-01', '2016-06-01'),
    (3, 4, 3, '2016-06-01', '2016-06-01'),
    (4, 5, 6, '2016-06-01', '2016-06-01'),
    (5, 5, 3, '2016-06-01', '2016-06-01');"
end

def companies_query
  "INSERT INTO companies (id, name, website_url, company_type, industries, status, headquarters_address, phone_number, created_at, updated_at) VALUES
    (1, 'Ledner, Larkin and Stehr', 'http://kuhlman.name/malcolm.schimmel', 'Government Agency' ,'Museums and Institutions', 'active', '7073 Truman Plains, Rudolfbury, NJ 77888-6693', '821.359.2636' ,'2016-06-01', '2016-06-01'),
    (2, 'Herzog-Grimes', 'http://kuhlman.name/malcolm.schimmel', 'Self-Employed' ,'Sports', 'active', '7073 Truman Plains, Rudolfbury, NJ 77888-6693', '160.106.3811' , '2016-06-01', '2016-06-01'),
    (3, 'Schneider, Mante and Robel', 'http://kuhlman.name/malcolm.schimmel', 'Public Company' ,'Government Relations', 'active', '7073 Truman Plains, Rudolfbury, NJ 77888-6693', '611.882.5173' ,'2016-06-01', '2016-06-01'),
    (4, 'Roberts, Schmeler and Waters', 'http://kuhlman.name/malcolm.schimmel', 'Educational Institution' ,'Telecommunications', 'active', '7073 Truman Plains, Rudolfbury, NJ 77888-6693', '(696) 181-7743' ,'2016-06-01', '2016-06-01'),
    (5, 'Waters, Simonis and Nienow', 'http://kuhlman.name/malcolm.schimmel', 'Privately Held' ,'Judiciary', 'active', '7073 Truman Plains, Rudolfbury, NJ 77888-6693', '1-402-090-3611' , '2016-06-01', '2016-06-01');"
end
