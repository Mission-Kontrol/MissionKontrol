# frozen_string_literal: true

require 'rails_helper'

describe PermissionsController, type: :controller, js: true do
  before do
    create_user_with_permissions(role, :edit, table, database.id)
    @view_permission = create(:permission, subject_class: table, action: 'view', subject_id: database.id)
    @create_permission = create(:permission, subject_class: table, action: 'create', subject_id: database.id)
    sign_in @user
  end

  let(:role) { 'Editor' }
  let(:table) { 'users' }
  let(:database) { create(:database) }

  describe '#index' do
    subject { get :index }

    it 'assigns databases' do
      subject

      expect(assigns(:databases)).to eq [database]
    end

    it 'assigns the headers' do
      subject

      expect(assigns(:headers)).to eq ['Table', role]
    end

    it 'assigns roles' do
      subject

      expect(assigns(:roles)).to eq [@role]
    end

    context 'table_permission_data' do
      subject { get :index, params: params, xhr: true }

      let(:params) { { database_id: database.id } }

      it 'returns the table name' do
        subject

        expect(JSON.parse(response.body)['data'].first['Table']).to eq 'Users'
      end

      it 'returns the role name with the permission level as html' do
        subject

        expect(JSON.parse(response.body)['data'].first['Editor']).to include "<img src='/assets/images/icons/circle-with-contrast.png'"
      end

      it 'returns individual role permissions for actions as booleans' do
        subject

        expect(JSON.parse(response.body)['data'].first['Editor_view']).to eq false
      end
    end
  end

  describe '#add_to_role' do
    context 'when action is view' do
      subject { post :add_to_role, params: { role: role, table: table, permission: 'view', database_id: database.id }, format: :js }

      it 'adds view permission for the table to the role' do
        subject

        expect(@user.roles.first.permissions).to include(@view_permission)
      end
    end

    context 'when action is not view' do
      subject { post :add_to_role, params: { role: role, table: table, permission: 'create', database_id: database.id }, format: :js }

      context 'when view is already enabled' do
        before do
          @user.roles.first.permissions << @view_permission
        end

        it 'adds action permission for the table to the role' do
          subject

          expect(@user.roles.first.permissions).to include(@create_permission)
        end
      end

      context 'when view is not already enabled' do
        before do
          @user.roles.first.permissions.delete(@view_permission)
        end

        it 'adds action and view permission for the table to the role' do
          subject

          expect(@user.roles.first.permissions).to include(@create_permission)
          expect(@user.roles.first.permissions).to include(@view_permission)
        end
      end
    end
  end

  describe '#remove_from_role' do
    context 'when action is view' do
      subject { post :remove_from_role, params: { role: role, table: table, permission: 'view', database_id: database.id }, format: :js }

      before do
        @user.roles.first.permissions << @view_permission
      end

      it 'removes view permission for the table from the role' do
        subject

        expect(@user.roles.first.permissions).not_to include(@view_permission)
      end

      context 'when there are other actions enabled' do
        before do
          @user.roles.first.permissions << @view_permission
          @user.roles.first.permissions << @create_permission
        end

        it 'removes action and view permission for the table from the role' do
          subject

          expect(@user.roles.first.permissions).not_to include(@view_permission)
          expect(@user.roles.first.permissions).not_to include(@create_permission)
        end
      end
    end

    context 'when action is not view' do
      subject { post :remove_from_role, params: { role: role, table: table, permission: 'create', database_id: database.id }, format: :js }

      before do
        @user.roles.first.permissions << @create_permission
      end

      it 'removes action permission for the table from the role' do
        subject

        expect(@user.roles.first.permissions).not_to include(@view_permission)
      end

      context 'when view permission is enabled' do
        before do
          @user.roles.first.permissions << @view_permission
        end

        it 'does not remove view permission for the table from the role' do
          subject

          expect(@user.roles.first.permissions).to include(@view_permission)
        end
      end
    end
  end

  describe '#enable_all' do
    subject { post :enable_all, params: { role: role, table: table, database_id: database.id }, format: :js }

    it 'enables all permissions for the table for the role' do
      subject

      expect(@user.roles.first.permissions).to include(@create_permission)
      expect(@user.roles.first.permissions).to include(@view_permission)
    end
  end

  describe '#disable_all' do
    subject { post :disable_all, params: { role: role, table: table, database_id: database.id }, format: :js }

    before do
      @user.roles.first.permissions << @view_permission
      @user.roles.first.permissions << @create_permission
    end

    it 'removes all permissions for the table from the role' do
      subject

      expect(@user.roles.first.permissions).not_to include(@view_permission)
      expect(@user.roles.first.permissions).not_to include(@create_permission)
    end
  end
end
