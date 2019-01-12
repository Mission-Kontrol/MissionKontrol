# frozen_string_literal: true
# frozen_string_literal: true

# if Rails.env == 'test' || Rails.env.development?
uri = URI.parse(ENV['CLIENT_DATABASE_URL'])
CLIENT_DB = {
  adapter: 'postgresql',
  encoding: 'unicode',
  pool: 2,
  username: uri.user,
  password: uri.password,
  port: uri.port,
  host: uri.host,
  database: uri.path.from(1)
}.freeze
# else
#   CLIENT_DB = {
#     adapter: 'postgresql',
#     encoding: 'unicode',
#     pool: 2,
#     username: SensitiveData.get_target_database_credential(:database_username),
#     password: SensitiveData.get_target_database_credential(:database_password),
#     port: SensitiveData.get_target_database_credential(:database_port),
#     host: SensitiveData.get_target_database_credential(:database_host),
#     database: SensitiveData.get_target_database_credential(:database_name)
#   }.freeze
# end
