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
        get :show

        expect(response).to render_template("tables/bad_connection")
      end
    end

    context "when client database connection is valid" do
      xit "renders the show template" do
        sign_in admin
        get :show
        expect(response).to render_template("show")
      end
    end
  end
end
