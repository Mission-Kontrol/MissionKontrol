# frozen_string_literal: true

require 'rails_helper'

describe RolesController, type: :controller, js: true do
  before do
    create_user_with_role(admin_role)
    sign_in @user
  end

  let!(:admin_role) { create(:role, :admin) }
  let!(:sales_role) { create(:role, :Sales) }
  let!(:team_lead_role) { create(:role, :team_lead) }
  let(:table) { 'users' }

  describe '#update' do
    context 'removing the administrator ability' do
      context 'when no other role has administrator ability' do
        it 'raises an error' do
          put :update, params: { id: admin_role.id, setting: 'administrator' }, format: :js

          expect(response).to render_template(:update_error)
        end
      end

      context 'when other role has administrator ability' do
        let!(:team_lead_role) { create(:role, :team_lead, administrator: true) }

        it 'updates the role' do
          put :update, params: { id: admin_role.id, setting: 'administrator' }, format: :js

          expect(response).to render_template(:update)
        end
      end
    end
  end
end
