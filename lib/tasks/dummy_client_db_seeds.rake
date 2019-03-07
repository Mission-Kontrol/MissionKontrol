# frozen_string_literal: true
namespace :dummy_client_database do
  desc 'Reset dummy databases'
  task reset: :environment do
    internal_tables = ["view_builders", "activities", "work_lists"]
    client_tables = ["events", "users", "companies", "attending_events", "welcomes"]

    # clear kuwinda db
    conn = ActiveRecord::Base.establish_connection.connection
    internal_tables.each do |table|
      query = "DELETE FROM #{table};"
      conn.exec_query(query);
    end

    # clear demo dbs for PG
    url = ENV['DEMO_DATABASE_PG']
    conn1 = ActiveRecord::Base.establish_connection(url).connection
    client_tables.each do |table|
      query = "DELETE FROM #{table};"
      conn1.exec_query(query);
    end

    # seed PG
    conn1.exec_query(users_query)
    conn1.exec_query(events_query)
    conn1.exec_query(companies_query)
    conn1.exec_query(attending_events_query)

    # clear demo dbs for MySQL
    url = ENV['DEMO_DATABASE_MYSQL']
    conn2 = ActiveRecord::Base.establish_connection(url).connection
    client_tables.each do |table|
      query = "DELETE FROM #{table};"
      conn2.exec_query(query);
    end

    # seed MySQL
    conn2.exec_query(users_query_mysql)
    conn2.exec_query(events_query_mysql)
    conn2.exec_query(companies_query_mysql)
    conn2.exec_query(attending_events_query_mysql)

    clear_target_db_credentials
    setup_demo_admin_user
  end
end

def events_query
  "INSERT INTO events (id, day, area, level, plan, space, meeting, created_at, updated_at, user_id) VALUES
    (1, 'Monday', 'London', 'pro', 'gold', 6, '05:00', '2013-06-01', '2013-06-01', 3),
    (2, 'Tuesday', 'Morzine', 'beginner', 'silver', 2, '13:00', '2015-06-01', '2015-06-01', 3),
    (3, 'Monday', 'Nairobi', 'pro', 'gold', 7, '09:00', '2016-06-01', '2016-06-01', 4),
    (4, 'Wednesday', 'Amsterdam', 'beginner', 'platinum', 5, '05:00', '2013-08-01', '2013-10-01', 5),
    (5, 'Sunday', 'Birmingham', 'intermediate', 'gold', 6, '10:00', '2013-06-01', '2013-06-01', 5),
    (6, 'Monday', 'New York', 'pro', 'silver', 4, '05:00', '2013-06-01', '2013-06-01', 6) ON CONFLICT (id) DO NOTHING;"
end

def events_query_mysql
  "INSERT INTO events (id, day, area, level, plan, space, meeting, created_at, updated_at, user_id) VALUES
    (1, 'Monday', 'London', 'pro', 'gold', 6, '05:00', '2013-06-01', '2013-06-01', 3),
    (2, 'Tuesday', 'Morzine', 'beginner', 'silver', 2, '13:00', '2015-06-01', '2015-06-01', 3),
    (3, 'Monday', 'Nairobi', 'pro', 'gold', 7, '09:00', '2016-06-01', '2016-06-01', 4),
    (4, 'Wednesday', 'Amsterdam', 'beginner', 'platinum', 5, '05:00', '2013-08-01', '2013-10-01', 5),
    (5, 'Sunday', 'Birmingham', 'intermediate', 'gold', 6, '10:00', '2013-06-01', '2013-06-01', 5),
    (6, 'Monday', 'New York', 'pro', 'silver', 4, '05:00', '2013-06-01', '2013-06-01', 6);"
end

def users_query
  "INSERT INTO users (id, email, encrypted_password, name, level, reset_password_token, reset_password_sent_at, remember_created_at, sign_in_count, current_sign_in_at, last_sign_in_at, current_sign_in_ip, last_sign_in_ip, created_at, updated_at, provider, uid, choice, number, image_file_name, image_content_type, image_file_size, image_updated_at) VALUES
    (3, 'will.s@kuwinda.io', md5('password'), 'William Smith', 'pro', 'h78t46tg846g6', '2019-01-01', '2019-01-01', 30, '2019-01-01', '2019-01-01', '228.218.87.162', '228.218.87.162', '2019-01-01', '2019-01-01', 'oauth', '123456789-000', 'super', 123456789, 'profile.png', 'png,jpeg', '20', '2019-01-01'),
    (4, 'jaime.j@kuwinda.io', md5('password'), 'Jaime Jones', 'beginner', 'kadu9u348hin', '2019-01-01', '2019-01-01', 22, '2019-01-01', '2019-01-01', '228.218.87.162', '228.218.87.162', '2019-01-01', '2019-01-01', 'oauth', '123456789-000', 'super', 123456789, 'profile.png', 'png,jpeg', '20', '2019-01-01'),
    (5, 'claressa.w@kuwinda.io', md5('password'), 'Claressa Williams', 'intermediate', '9u5utojf89hh', '2019-01-01', '2019-01-01', 3,'2019-01-01', '2019-01-01', '228.218.87.162', '228.218.87.162', '2019-01-01', '2019-01-01', 'oauth', '123456789-000', 'super', 123456789, 'profile.png', 'png,jpeg', '20', '2019-01-01'),
    (6, 'katie.t.t@kuwinda.io', md5('password'), 'Katie Taylor', 'pro', '9y27ygi97tgy', '2019-01-01', '2019-01-01', 112, '2019-01-01', '2019-01-01', '228.218.87.162', '228.218.87.162', '2019-01-01', '2019-01-01', 'oauth', '123456789-000', 'super', 123456789, 'profile.png', 'png,jpeg', '20', '2019-01-01') ON CONFLICT (id) DO NOTHING;"
end

def users_query_mysql
  "INSERT INTO users (id, email, encrypted_password, name, level, reset_password_token, reset_password_sent_at, remember_created_at, sign_in_count, current_sign_in_at, last_sign_in_at, current_sign_in_ip, last_sign_in_ip, created_at, updated_at, provider, uid, choice, number, image_file_name, image_content_type, image_file_size, image_updated_at) VALUES
    (3, 'will.s@kuwinda.io', md5('password'), 'William Smith', 'pro', 'h78t46tg846g6', '2019-01-01', '2019-01-01', 30, '2019-01-01', '2019-01-01', '228.218.87.162', '228.218.87.162', '2019-01-01', '2019-01-01', 'oauth', '123456789-000', 'super', 123456789, 'profile.png', 'png,jpeg', '20', '2019-01-01'),
    (4, 'jaime.j@kuwinda.io', md5('password'), 'Jaime Jones', 'beginner', 'kadu9u348hin', '2019-01-01', '2019-01-01', 22, '2019-01-01', '2019-01-01', '228.218.87.162', '228.218.87.162', '2019-01-01', '2019-01-01', 'oauth', '123456789-000', 'super', 123456789, 'profile.png', 'png,jpeg', '20', '2019-01-01'),
    (5, 'claressa.w@kuwinda.io', md5('password'), 'Claressa Williams', 'intermediate', '9u5utojf89hh', '2019-01-01', '2019-01-01', 3,'2019-01-01', '2019-01-01', '228.218.87.162', '228.218.87.162', '2019-01-01', '2019-01-01', 'oauth', '123456789-000', 'super', 123456789, 'profile.png', 'png,jpeg', '20', '2019-01-01'),
    (6, 'katie.t.t@kuwinda.io', md5('password'), 'Katie Taylor', 'pro', '9y27ygi97tgy', '2019-01-01', '2019-01-01', 112, '2019-01-01', '2019-01-01', '228.218.87.162', '228.218.87.162', '2019-01-01', '2019-01-01', 'oauth', '123456789-000', 'super', 123456789, 'profile.png', 'png,jpeg', '20', '2019-01-01');"
end

def attending_events_query
  "INSERT INTO attending_events (id, event_id, user_id, created_at, updated_at) VALUES
    (1, 2, 3, '2016-06-01', '2016-06-01'),
    (2, 2, 5, '2016-06-01', '2016-06-01'),
    (3, 4, 3, '2016-06-01', '2016-06-01'),
    (4, 5, 6, '2016-06-01', '2016-06-01'),
    (5, 5, 3, '2016-06-01', '2016-06-01') ON CONFLICT (id) DO NOTHING;"
end

def attending_events_query_mysql
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
    (5, 'Waters, Simonis and Nienow', 'http://kuhlman.name/malcolm.schimmel', 'Privately Held' ,'Judiciary', 'active', '7073 Truman Plains, Rudolfbury, NJ 77888-6693', '1-402-090-3611' , '2016-06-01', '2016-06-01') ON CONFLICT (id) DO NOTHING;"
end

def companies_query_mysql
  "INSERT INTO companies (id, name, website_url, company_type, industries, status, headquarters_address, phone_number, created_at, updated_at) VALUES
    (1, 'Ledner, Larkin and Stehr', 'http://kuhlman.name/malcolm.schimmel', 'Government Agency' ,'Museums and Institutions', 'active', '7073 Truman Plains, Rudolfbury, NJ 77888-6693', '821.359.2636' ,'2016-06-01', '2016-06-01'),
    (2, 'Herzog-Grimes', 'http://kuhlman.name/malcolm.schimmel', 'Self-Employed' ,'Sports', 'active', '7073 Truman Plains, Rudolfbury, NJ 77888-6693', '160.106.3811' , '2016-06-01', '2016-06-01'),
    (3, 'Schneider, Mante and Robel', 'http://kuhlman.name/malcolm.schimmel', 'Public Company' ,'Government Relations', 'active', '7073 Truman Plains, Rudolfbury, NJ 77888-6693', '611.882.5173' ,'2016-06-01', '2016-06-01'),
    (4, 'Roberts, Schmeler and Waters', 'http://kuhlman.name/malcolm.schimmel', 'Educational Institution' ,'Telecommunications', 'active', '7073 Truman Plains, Rudolfbury, NJ 77888-6693', '(696) 181-7743' ,'2016-06-01', '2016-06-01'),
    (5, 'Waters, Simonis and Nienow', 'http://kuhlman.name/malcolm.schimmel', 'Privately Held' ,'Judiciary', 'active', '7073 Truman Plains, Rudolfbury, NJ 77888-6693', '1-402-090-3611' , '2016-06-01', '2016-06-01');"
end

def clear_target_db_credentials
  credentials = "config/target_db_credentials_#{Rails.env}.txt"
  rm_rf credentials
end

def setup_demo_admin_user
  uri = URI.parse(ENV['DEMO_DATABASE_PG'])
  admin = AdminUser.find_by_email("demo@kuwinda.io")

  admin.delete if admin

  admin = AdminUser.new
  admin.email = ENV['DEMO_ADMIN_USER_EMAIL']
  admin.password = ENV['DEMO_ADMIN_USER_PASSWORD']
  admin.password_confirmation = ENV['DEMO_ADMIN_USER_PASSWORD']
  admin.target_database_host = uri.host
  admin.target_database_name = uri.path.from(1)
  admin.target_database_username = uri.user
  admin.target_database_password = uri.password
  admin.target_database_port = uri.port
  admin.target_database_type = 'postgres'
  admin.save!
end
