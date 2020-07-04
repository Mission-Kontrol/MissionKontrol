if Rails.env == "development"
  require_dependency "task_queue"
  # Dir.foreach("#{Rails.root}/app/models") do |model_name|
  #   require_dependency model_name
  # end
end