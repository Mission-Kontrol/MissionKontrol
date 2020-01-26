# frozen_string_literal: true

require 'rails_helper'

describe TablesController, :type => :controller do
  before do
    @database = create(:database)
    create_user_with_permissions('Sales', :view, 'users', @database.id)
    create(:target_table_setting)
  end

  describe 'GET show' do
    context 'when admin user has a valid license' do
      context 'when client database connection is invalid' do
        it 'renders the bad connection template' do
          sign_in @user
          allow(controller).to receive(:show).and_raise(InvalidClientDatabaseError.new)

          get :show, params: { id: @database.id, table_name: 'users', table: 'users'}

          expect(response).to render_template('layouts/bad_connection')
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

          expect(response).to render_template('layouts/bad_connection')
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
