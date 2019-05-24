# frozen_string_literal: true

require 'rails_helper'

describe DashboardController, :type => :controller do
  let(:admin) do
    AdminUser.first_or_create(email: 'test@test.com', password: '123456', password_confirmation: '123456')
  end

  describe 'GET show' do
    context "when client database connection is invalid" do
      it "renders the bad connection template" do
        sign_in admin
        allow(controller).to receive(:show).and_raise(InvalidClientDatabaseError.new)

        VCR.use_cassette('license_check_success') do
          get :show
        end

        expect(response).to render_template("tables/bad_connection")
      end
    end

    context "when client database connection is valid" do
      it "renders the show template" do
        sign_in admin

        VCR.use_cassette('license_check_success') do
          get :show
        end

        expect(response).to render_template("show")
      end
    end

    context "when admin user has not activated license" do
      it "redirects to the license route" do
        user = create(:admin_user)
        sign_in user

        VCR.use_cassette('license_check_failure') do
          get :show
        end

        expect(response).to redirect_to(license_path)
      end
    end
  end
end
