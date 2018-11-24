# frozen_string_literal: true

describe ViewBuilderController, type: :controller do
  let(:table) { 'Users' }

  describe '#new' do
    before { get :new }

    it 'will render the page' do
      expect(response.status).to eq(200)
    end

    it 'will assign the available tables' do
      expect(assigns(:available_tables)).to eq available_tables
    end
  end

  describe '#table_fields' do
    before { get :table_fields, params: params }
    let(:params) { { table: table } }

    it 'will assign the available fields for the table' do
      expect(assigns(:fields)).to eq list_table_fields(table)
    end

    it 'will render json' do
      expect(response.body).to eq list_table_fields(table).to_json
    end
  end

  describe '#create' do
    before { post :create, params: params }
    let(:view_name) { 'View name' }
    let(:params) do
      {
        view_name: view_name,
        table: table,
        selectedOptions: %w[id name email]
      }
    end
    let(:table_attributes) do
      {
        'visible_fields' => {
          '0' => 'id',
          '1' => 'name',
          '2' => 'email'
        }
      }
    end

    it 'will create the view builder' do
      expect(assigns(:view_builder).view_name).to eq view_name
      expect(assigns(:view_builder).table_name).to eq table
    end

    it 'will create the view_builders visible_fields' do
      expect(assigns(:view_builder).table_attributes).to eq table_attributes
    end

    it 'will save the view builder' do
      expect(assigns(:view_builder)).to be_a ViewBuilder
    end

    it 'will render the configure_table_order template' do
      expect(response).to render_template(:configure_table_order)
    end
  end

  describe '#update' do
    before do
      put :update, params: params
      view_builder.reload
    end
    let(:params) do
      {
        id: view_builder.id,
        tableConfigurations: table_configurations,
        defaultRows: default_rows
      }
    end
    let(:view_builder) { create(:view_builder) }
    let(:default_rows) { '2' }
    let(:table_configurations) do
      {
        '1' => { 'Field' => 'area', 'Position' => '1' },
        '2' => { 'Field' => 'level', 'Position' => '2' },
        '3' => { 'Field' => 'plan', 'Position' => '3' },
        '4' => { 'Field' => 'space', 'Position' => '4' }
      }
    end
    let(:expected_positions) do
      {
        '1' => 'area',
        '2' => 'level',
        '3' => 'plan',
        '4' => 'space'
      }
    end

    it 'will update the view builder with the default rows' do
      expect(view_builder.table_attributes['default_rows']).to eq default_rows
    end

    it 'will update the positions of the visible fields' do
      expect(view_builder.table_attributes['visible_fields']).to eq expected_positions
    end

    it 'will redirect to view the configuration' do
      expect(response).to redirect_to(view_builder_url(view_builder))
    end
  end

  describe '#show' do
    before { get :show, params: params }
    let(:params) { { id: view_builder.id } }
    let(:view_builder) { create(:view_builder) }

    it 'will render the page' do
      expect(response.status).to eq(200)
    end

    it 'will assign the view_builder' do
      expect(assigns[:view_builder]).to eq view_builder
    end
  end

  describe '#index' do
    before { get :index }
    let(:view_builder) { create(:view_builder) }

    it 'will render the page' do
      expect(response.status).to eq(200)
    end

    it 'will assign the view_builders' do
      expect(assigns[:view_builders]).to eq [view_builder]
    end
  end
end

def list_table_fields(table)
  Kuwinda::Presenter::ListTableFields.new(ClientRecord, table).call
end

def available_tables
  Kuwinda::Presenter::ListAvailableTables.new(ClientRecord).call
end
