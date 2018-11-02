# frozen_string_literal: true

CLIENT_DB = {
  adapter: 'postgresql',
  encoding: 'unicode',
  pool: 2,
  username: SensitiveData.get_target_database_credential(:database_username),
  password: SensitiveData.get_target_database_credential(:database_password),
  port: SensitiveData.get_target_database_credential(:database_port),
  host: SensitiveData.get_target_database_credential(:database_host),
  database: SensitiveData.get_target_database_credential(:database_name)
}.freeze
