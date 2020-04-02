# frozen_string_literal: true

require 'rails_helper'

describe RolesController, type: :controller, js: true do
  before do
    create_user_with_role(admin_role)
    sign_in @user
  end

  let!(:admin_role) { create(:role, :admin) }
  let!(:editor_role) { create(:role, :Editor) }
  let!(:user_role) { create(:role, :user) }
  let(:table) { 'users' }

  describe '#edit' do
    it 'assigns role based on name in param' do
      get :edit, params: { name: 'Editor' }, xhr: true

      expect(assigns(:role)).to eq editor_role
    end
  end

  describe '#update' do
    context 'removing the administrator ability' do
      context 'when no other role has administrator ability' do
        it 'raises an error' do
          put :update, params: { id: admin_role.id, setting: 'administrator' }, xhr: true

          expect(response).to render_template(:update_error)
        end
      end

      context 'when other role has administrator ability' do
        let!(:user_role) { create(:role, :user, administrator: true) }

        it 'updates the role' do
          put :update, params: { id: admin_role.id, setting: 'administrator' }, xhr: true

          expect(response).to render_template(:update)
        end
      end
    end

    context 'updating the export limit' do
      let!(:editor_role) { create(:role, :Editor, export_limit: 5) }

      it 'updates the export limit for the role' do
        put :update, params: { id: editor_role.id, limit: 105 }, xhr: true

        editor_role.reload
        expect(editor_role.export_limit).to eq 105
      end
    end
  end
end
