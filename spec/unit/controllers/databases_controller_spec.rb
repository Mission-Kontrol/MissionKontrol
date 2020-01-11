# frozen_string_literal: true

describe DatabasesController, type: :controller, js: true do
  describe '#create' do
    subject { post :create, params: params, format: :js }

    context 'with valid params' do
      let(:params) do
        {
          database: {
            friendly_name: 'Test database',
            adapter: 'postgresql',
            host: 'localhost',
            port: 5432,
            name: 'name',
            username: 'username',
            password: 'password'
          }
        }
      end

      it 'saves the database credentials' do
        subject

        expect(assigns(:database)).to eq(Database.last)
      end
    end
  end
end