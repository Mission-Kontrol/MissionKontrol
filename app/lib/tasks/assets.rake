require 'sprockets/rails/task'

Sprockets::Rails::Task.new(Rails.application) do |t|
  t.logger = Logger.new(STDOUT)
end