# frozen_string_literal: true

require 'rails_helper'

describe TablesController, :type => :controller do
  before do
    @database = create(:database)
    create_user_with_permissions('Sales', :view, 'users', @database.id)
    create(:target_table_setting, database_id: @database.id)
  end

  describe 'GET index' do
    subject { get :index, xhr: true, format: :js, params: { id: @database.id } }

    before do
      allow_any_instance_of(Kuwinda::Presenter::ListAvailableTables).to receive(:call).and_return(['users', 'events', 'attending_events'])
      sign_in @user

      subject
    end

    context 'when user has permissions to view the users table' do
      it 'returns the users table in the json response' do
        expect(JSON.parse(response.body)).to include 'users'
      end
    end

    context 'when user does not have permission to view the events table' do
      it 'does not return the events table in the json response' do
        expect(JSON.parse(response.body)).not_to include 'events'
      end
    end
  end

  describe 'GET show' do
    context 'when admin user has a valid license' do
      context 'when client database connection is invalid' do
        it 'renders the bad connection template' do
          sign_in @user
          allow(controller).to receive(:show).and_raise(InvalidClientDatabaseError.new)

          get :show, params: { id: @database.id, table_name: 'users', table: 'users'}

          expect(response).to redirect_to('/database_connection_error')
        end
      end

      context 'when client database connection is valid' do
        it 'renders the show template' do
          sign_in @user

          get :show, params: { id: @database.id, table_name: 'users', table: 'users'}

          expect(response).to render_template('show')
        end
      end
    end
  end

  describe 'GET preview' do
    context 'when admin user has a valid license' do
      context 'when client database connection is invalid' do
        it 'renders the bad connection template' do
          sign_in @user
          allow(controller).to receive(:preview).and_raise(InvalidClientDatabaseError.new)

          get :preview, params: { id: @database.id, table_name: 'users', record_id: 1, table: 'users'}

          expect(response).to redirect_to('/database_connection_error')
        end
      end

      context 'when client database connection is valid' do
        xcontext 'when layout exists for table' do
          it 'renders the preview template' do
            create(:view_builder, table_name: 'users')
            sign_in @user

            get :preview, params: { id: @database.id, table_name: 'users', record_id: 1, table: 'users'}

            expect(response).to render_template('preview')
          end
        end

        xcontext 'when layout does not exist for table' do
          it 'renders the preview template' do
            ViewBuilder.where(table_name: 'users').delete_all
            sign_in @user

            get :preview, params: { id: @database.id, table_name: 'users', record_id: 1, table: 'users'}

            expect(response).to render_template('preview')
          end
        end
      end
    end
  end
end
