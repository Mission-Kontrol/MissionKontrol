begin
  load File.expand_path("../bin/spring", __dir__)
rescue LoadError => e
  raise unless e.path.end_with?("/bin/spring")
end

ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require "bundler/setup" # Set up gems listed in the Gemfile.
