# frozen_string_literal: true

class AdminUserSessionsController < Devise::SessionsController
  skip_before_action :check_license, :only => %i[new]
end
