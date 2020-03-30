# frozen_string_literal: true

require 'rails_helper'

describe TablesController, :type => :controller do
  let(:mock_target_db) { double("TargetDbDouble") }
  let(:mock_presenter) { double("PresenterDouble") }

  before do
    @database = create(:database)
    create_user_with_permissions('Editor', :view, 'users', @database.id)
    create(:target_table_setting, database_id: @database.id)
  end

  describe 'GET index' do
    subject { get :index, xhr: true, format: :js, params: { id: @database.id } }

    before do
      allow(mock_presenter).to receive(:call).and_return(['users', 'events', 'attending_events'])
      allow(Kuwinda::Presenter::ListAvailableTables).to receive(:new).and_return(mock_presenter)
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

  describe 'POST delete_record' do
    subject { post :delete_record, xhr: true, format: :js, params: params }

    let(:params) { { database_id: @database.id, table: table, records_array: [record_id.to_i] } }
    let(:table) { 'events' }
    let(:record_id) { 5 }
    let(:role) { 'Editor' }

    context 'when user has permission to delete from specified table' do
      before do
        create_user_with_permissions(role, :delete, table, @database.id)
        sign_in @user
      end

      context 'and record exists' do
        before do
          allow(mock_target_db).to receive(:delete_record).and_return(1)
          allow(Kuwinda::Repository::TargetDB).to receive(:new).and_return(mock_target_db)
          subject
        end
  
        it 'deletes the record' do
          expect(assigns(:result)).to eq true
        end

        it 'renders the delete template' do
          expect(response).to render_template('delete_record')
        end
      end

      context 'when record fails to delete' do
        let(:record_id) { 1111115 }

        before do
          allow(mock_target_db).to receive(:delete_record).and_return(0)
          allow(Kuwinda::Repository::TargetDB).to receive(:new).and_return(mock_target_db)
          subject
        end

        it 'does not delete the record' do
          expect(assigns(:result)).to eq false
        end
      end
    end

    context 'when user does not have permission to delete from specified table' do
      before do
        sign_in @user
      end

      it 'returns an error message' do
        expect { subject }.to raise_error(NotAuthorizedError, "Not authorized to perform this action")
      end
    end
  end

  describe 'POST update_settings' do
    subject { post :update_settings, xhr: true, format: :js, params: params }

    let(:params) do
      {
        editable_fields: {
          id: { editable: false, reference: "" },
          user_id: { editable: true, reference: "", mandatory: true },
          event_id: { editable: true, reference: "", mandatory: false },
          created_at: { editable: false, reference: "" },
          updated_at: { editable: false, reference: "" }
        },
        table: table,
        database_id: @database.id,
        commit: "Save"
      }
    end
    let(:editable_fields) do
      {
        id: false,
        user_id: false,
        event_id: false,
        created_at: false,
        updated_at: false
      }
    end
    let(:table) { 'attending_events' }
    let(:role) { 'Editor' }

    before do
      @target_table_setting = create(:target_table_setting, name: table, database_id: @database.id, nested_table: nil, editable_fields: editable_fields)
      sign_in @user
    end

    context 'when fields are being set to editable' do
      let(:expected_result) do
        {
          id: { editable: false, mandatory: nil },
          user_id: { editable: true, mandatory: true },
          event_id: { editable: true, mandatory: false },
          created_at: { editable: false, mandatory: nil },
          updated_at: { editable: false, mandatory: nil }
      }.with_indifferent_access
      end

      it 'sets the fields as editable on the target_table_settings' do
        subject
        @target_table_setting.reload
        expect(@target_table_setting.editable_fields).to eq expected_result
      end
    end
  end
end
