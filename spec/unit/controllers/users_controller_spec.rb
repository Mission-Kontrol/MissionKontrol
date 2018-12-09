# frozen_string_literal: true

describe UsersController, type: :controller do
  context '#index' do
    before { get :index }

    it 'will render the page' do
      expect(response.status).to eq(200)
    end
  end

  context '#show' do
    before { get :show, params: params }

    let(:user) { create(:user) }
    let(:params) { { id: user.id } }
    let(:view_builder) { create(:view_builder, table_name: 'Events') }

    it 'will render the page' do
      expect(response.status).to eq(200)
    end

    it 'will assign the view builder for the user' do
      expect(assigns(:view_builders)).to eq [view_builder]
    end
  end
end
