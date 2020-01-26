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
            host: ENV['DEMO_CLIENT_DB_HOST'],
            port: 5432,
            name: ENV['DEMO_CLIENT_DB_NAME'],
            username: ENV['DEMO_CLIENT_DB_USER'],
            password: ENV['DEMO_CLIENT_DB_PASSWORD']
          }
        }
      end

      it 'saves the database credentials' do
        subject

        expect(assigns(:database)).to eq(Database.last)
      end

      it 'updates the available permissions' do
        subject

        expect(Permission.all.count).to eq(20)
      end

      it 'creates target table settings for tables' do
        subject

        expect(TargetTableSetting.all.count).to eq(5)
      end
    end
  end
end
