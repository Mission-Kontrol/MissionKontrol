# frozen_string_literal: true

require 'rails_helper'

describe TablesController, :type => :controller do
  let(:admin_with_license) { create(:admin_user, :with_license) }

  before do
    Rails.cache.write("license-#{admin_with_license.license_key}", expires_in: 2.hours)
  end

  after do
    Rails.cache.clear
  end

  describe 'GET show' do
    context 'when admin user has a valid license' do
      context 'when client database connection is invalid' do
        it 'renders the bad connection template' do
          sign_in admin_with_license
          allow(controller).to receive(:show).and_raise(InvalidClientDatabaseError.new)

          VCR.use_cassette('license_key/validation_success') do
            get :show, params: { id: 'users', table_name: 'users', table: 'users'}
          end

          expect(response).to render_template('layouts/bad_connection')
        end
      end

      context 'when client database connection is valid' do
        it 'renders the show template' do
          sign_in admin_with_license

          VCR.use_cassette('license_key/validation_success') do
            get :show, params: { id: 'users', table_name: 'users', table: 'users'}
          end

          expect(response).to render_template('show')
        end
      end
    end
  end

  describe 'GET preview' do
    context 'when admin user has a valid license' do
      context 'when client database connection is invalid' do
        it 'renders the bad connection template' do
          sign_in admin_with_license
          allow(controller).to receive(:preview).and_raise(InvalidClientDatabaseError.new)

          VCR.use_cassette('license_key/validation_success') do
            get :preview, params: { id: 'users', table_name: 'users', record_id: 1, table: 'users'}
          end

          expect(response).to render_template('layouts/bad_connection')
        end
      end

      context 'when client database connection is valid' do
        context 'when layout exists for table' do
          it 'renders the preview template' do
            create(:view_builder, table_name: 'users')
            sign_in admin_with_license

            VCR.use_cassette('license_key/validation_success') do
              get :preview, params: { id: 'users', table_name: 'users', record_id: 1, table: 'users'}
            end

            expect(response).to render_template('preview')
          end
        end

        context 'when layout does not exist for table' do
          it 'redirects to the new layout template' do
            ViewBuilder.where(table_name: 'users').delete_all
            sign_in admin_with_license

            VCR.use_cassette('license_key/validation_success') do
              get :preview, params: { id: 'users', table_name: 'users', record_id: 1, table: 'users'}
            end

            expect(response).to redirect_to(new_layout_url(table: 'users'))
          end
        end
      end
    end
  end
end
