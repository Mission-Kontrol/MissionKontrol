uri = URI.parse(ENV["CLIENT_DATABASE_URL"])
CLIENT_DB = {
  adapter: "postgresql",
  encoding: "unicode",
  pool: 2,
  username: uri.user,
  password: uri.password,
  port: uri.port,
  host: uri.host,
  database: uri.path.from(1),
}
