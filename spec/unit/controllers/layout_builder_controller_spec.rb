# frozen_string_literal: true

require 'rails_helper'

describe LayoutBuilderController, type: :controller do
  let(:admin_with_license) { create(:admin_user, :with_license) }

  before do
    Rails.cache.write("license-#{admin_with_license.license_key}", expires_in: 2.hours)
  end

  after do
    Rails.cache.clear
  end

  describe 'GET new' do
    before do

      VCR.use_cassette('license_key/validation_success') do
        sign_in admin_with_license

        get :new
      end
    end

    it 'will render the page' do
      expect(response.status).to eq(200)
    end

    it 'will assign the available tables' do
      expect(assigns(:available_tables)).to match_array available_tables
    end
  end

  describe 'POST create' do
    context 'when admin has a valid license key' do
      before do
        params = {
          view_name: 'name of view',
          table: 'Users'
        }
        admin_user = create(:admin_user, :with_license)

        VCR.use_cassette('license_key/validation_success') do
          sign_in admin_user

          post :create, params: params
        end
      end

      it 'will create the view builder' do
        expect(assigns(:view_builder).view_name).to eq 'name of view'
        expect(assigns(:view_builder).table_name).to eq 'Users'
      end

      it 'will save the view builder' do
        expect(assigns(:view_builder)).to be_a ViewBuilder
      end
    end
  end

  describe 'PATCH update' do
    let(:expected_positions) do
      {
        '1' => 'area',
        '2' => 'level',
        '3' => 'plan',
        '4' => 'space'
      }
    end

    context 'when admin has a valid license key' do
      before do
        @view_builder = create(:view_builder)
        admin_user = create(:admin_user, :with_license)
        table_configurations = {
          '1' => { 'Field' => 'area', 'Position' => '1' },
          '2' => { 'Field' => 'level', 'Position' => '2' },
          '3' => { 'Field' => 'plan', 'Position' => '3' },
          '4' => { 'Field' => 'space', 'Position' => '4' }
        }
        params = {
          id: @view_builder.id,
          tableConfigurations: table_configurations,
        }

        VCR.use_cassette('license_key/validation_success') do
          sign_in admin_user

          put :update, params: params, format: :js
        end

        @view_builder.reload
      end

      it 'will update the positions of the visible fields' do
        expect(@view_builder.table_attributes['visible_fields']).to eq expected_positions
      end

      it 'will redirect to view the configuration' do
        expect(response).to redirect_to(layout_url(@view_builder))
      end
    end
  end

  describe 'GET show' do
    context 'when client database is valid' do
      context 'when admin has a valid license key' do
        before do
          @view_builder = create(:view_builder)
          params = { id: @view_builder.id }
          admin_user = create(:admin_user, :with_license)

          VCR.use_cassette('license_key/validation_success') do
            sign_in admin_user

            get :show, params: params
          end
        end

        it 'will render the page' do
          expect(response.status).to eq(200)
        end

        it 'will assign the view_builder' do
          expect(assigns[:view_builder]).to eq @view_builder
        end
      end
    end

    context 'when client database connection is invalid' do
      context 'when admin has a valid license key' do
        before do
          admin_user = create(:admin_user, :with_license)
          allow(controller).to receive(:show).and_raise(InvalidClientDatabaseError.new)

          VCR.use_cassette('license_key/validation_success') do
            sign_in admin_user

            get :show, params: { use_route: 'layouts/' }
          end
        end

        it 'renders the bad connection template' do
          expect(response).to render_template('tables/bad_connection')
        end
      end
    end
  end

  describe 'GET edit' do
    context 'when client database connection is invalid' do
      it 'renders the bad connection template' do
        allow(controller).to receive(:edit).and_raise(InvalidClientDatabaseError.new)

        VCR.use_cassette('license_key/validation_success') do
          sign_in admin_with_license

          get :edit, params: { use_route: 'layouts/' }
        end

        expect(response).to render_template('tables/bad_connection')
      end
    end
  end

  describe 'GET preview' do
    context 'when client database connection is invalid' do
      it 'renders the bad connection template' do
        allow(controller).to receive(:preview).and_raise(InvalidClientDatabaseError.new)

        VCR.use_cassette('license_key/validation_success') do
          sign_in admin_with_license

          get :preview, params: { use_route: 'layouts/' }
        end

        expect(response).to render_template('tables/bad_connection')
      end
    end
  end
end

def available_tables
  Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
end
