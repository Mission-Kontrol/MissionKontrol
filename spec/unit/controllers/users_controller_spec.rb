require 'rails_helper'

describe UsersController, type: :controller do
  subject { get :index }

  describe '#index' do
    it 'will render the page' do
      expect(response.status).to eq(200)
    end
  end
end
