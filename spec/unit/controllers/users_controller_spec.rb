# frozen_string_literal: true

require 'rails_helper'

describe UsersController, type: :controller do
  context '#index' do
    subject { get :index }

    it 'will render the page' do
      expect(response.status).to eq(200)
    end
  end

  context '#show' do
    subject { get :show, params: params }

    let(:user) { create(:user) }
    let(:params) { { id: user.id } }

    it 'will render the page' do
      expect(response.status).to eq(200)
    end
  end
end
