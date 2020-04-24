# frozen_string_literal: true

require 'rails_helper'

describe LayoutBuilderController, type: :controller do
  before do
    @database = create(:database)
    create_user_with_permissions('Editor', :view, 'users', @database.id)
    sign_in @user

    allow(mock_list_available_tables).to receive(:call).and_return(available_tables)
    allow(Kuwinda::Presenter::ListAvailableTables).to receive(:new).and_return(mock_list_available_tables)

    allow(mock_list_table_fields_with_type).to receive(:call).and_return(fields_with_type)
    allow(Kuwinda::Presenter::ListTableFieldsWithType).to receive(:new).and_return(mock_list_table_fields_with_type)

    allow(mock_list_relatable_tables).to receive(:call).and_return(relatable_tables)
    allow(Kuwinda::Presenter::ListRelatableTables).to receive(:new).and_return(mock_list_relatable_tables)
  end

  let(:mock_list_available_tables) { double("PresenterDouble") }
  let(:mock_list_table_fields_with_type) { double("PresenterDouble") }
  let(:mock_list_relatable_tables) { double("PresenterDouble") }
  let(:mock_target_db) { double('TargetDbDouble') }
  let(:available_tables) { ['users', 'events', 'attending_events'] }
  let(:relatable_tables) { ['events', 'attending_events'] }
  let(:table_name) { 'users' }
  let(:fields_with_type) do
    [
      ["id", "string", table_name],
      ["user", "string", table_name],
      ["name", "string", table_name]
    ]
  end

  let!(:view_builder) { create(:view_builder, table_name: table_name, database_id: @database.id) }

  describe 'GET index' do
    subject { get :index }

    before do
      subject
    end

    it 'assigns @databases with all databases' do
      expect(assigns(:databases)).to eq [@database]
    end

    it 'assigns @view_builders with all view_builders' do
      expect(assigns(:view_builders)).to eq [view_builder]
    end
  end

  describe 'GET new' do
    subject { get :new, params: { database_id: @database.id, table: table_name } }

    before do
      @view_builder = view_builder
      @view_builder_other = view_builder_other
      subject
    end
    let!(:view_builder_other) { create(:view_builder, table_name: table_name, database_id: 5) }

    it 'assigns the available tables' do
      expect(assigns[:available_tables]).to eq available_tables
    end

    it 'assigns the tables with layouts' do
      expect(assigns[:tables_with_layouts]).to eq [table_name]
    end

    it 'assigns the correct view_builder' do
      expect(assigns[:view_builder].table_name).to eq table_name
    end
  end

  describe 'GET show' do
    subject { get :show, params: { id: view_builder.id } }

    it 'assigns the correct view_builder' do
      subject
      expect(assigns(:view_builder)).to eq view_builder
    end
  end

  describe 'GET table_fields_with_type' do
    subject { get :table_fields_with_type, params: params }
    let(:params) { { id: view_builder.id, table: table_name } }

    let(:json_response) do
      [
        ["id", "string", table_name],
        ["name", "string", table_name],
        ["user", "string", table_name]
      ]
    end

    before do
      subject
    end

    it 'assigns fields_with_type' do
      expect(assigns(:fields_with_type)).to eq fields_with_type
    end

    it 'renders a sorted json of fields_with_type' do
      expect(JSON.parse(response.body)).to eq json_response
    end
  end

  ## TODO: Come back to this - see todo comment in method
  xdescribe 'GET edit' do
    subject { get :edit, params: params }
    let(:params) { { id: view_builder.id } }

    before do
      subject
    end

    it 'assigns the available tables' do
      expect(assigns[:available_tables]).to eq available_tables
    end

    it 'assigns fields_with_type' do
      expect(assigns(:fields_with_type)).to eq fields_with_type
    end

    it 'assigns relatable_tables' do
      expect(assigns(:relatable_tables)).to eq relatable_tables
    end
  end

  describe 'POST create' do
    subject { post :create, params: params }

    before do
      subject
    end

    let(:params) do
      {
        table: 'events',
        view_name: 'view_name',
        database_id: @database.id
      }
    end

    context 'when ignore_layout_modal is checked' do
      let(:params) do
        {
          table: 'events',
          view_name: 'view_name',
          database_id: @database.id,
          ignore_modal: true
        }
      end

      it 'updates the user to ignore layout modal' do
        @user.reload
        expect(@user.ignore_layout_modal).to eq true
      end
    end

    it 'renders the view_builder in json format' do
      expect(JSON.parse(response.body)).to include({ 'table_name' => 'events', 'view_name' => 'view_name', 'database_id' => @database.id })
    end

    context 'when there is an error saving the view_builder' do
      ## TODO: fail gracefully
    end
  end

  describe 'POST update' do
    subject { post :update, params: params, xhr: true }

    before do
      subject
    end

    let(:params) do
      {
        'id' => view_builder.id,
        'view_builder' => {
          'draggable_fields_main_container1' => draggable_fields_main_container1
        }
      }
    end
    let(:draggable_fields_main_container1) do
      {
        '0' => {
          'title' => 'choice',
          'table' => table_name,
          'kind' => 'string'
        }
      }
    end

    it 'updates the view_builder' do
      view_builder.reload
      expect(view_builder.draggable_fields_main_container1).to eq draggable_fields_main_container1
    end

    it 'renders a success message' do
      expect(response).to render_template('layout_builder/update/success')
    end

    context 'when it fails to save' do
      it 'renders a failure message' do
        ## TODO: fail gracefully
      end
    end
  end

  describe 'POST update_related_tables' do
    subject { post :update_related_tables, params: params, xhr: true }

    before do
      subject
    end

    let(:params) do
      {
        'id' => view_builder.id,
        'related_table' => 'events'
      }
    end

    it 'updates the view_builder' do
      view_builder.reload
      expect(view_builder.related_tables).to eq ['events']
    end

    it 'renders a success message' do
      expect(response).to render_template('layout_builder/update/success')
    end

    context 'when there is already a related table' do
      let(:view_builder) { create(:view_builder, table_name: table_name, database_id: @database.id, related_tables: ['events']) }
      let(:params) do
        {
          'id' => view_builder.id,
          'related_table' => 'attending_events'
        }
      end

      it 'updates the view_builder' do
        view_builder.reload
        expect(view_builder.related_tables).to eq ['events', 'attending_events']
      end
    end

    context 'when it fails to save' do
      it 'renders a failure message' do
        ## TODO: fail gracefully
      end
    end
  end

  describe 'POST remove_related_table' do
    subject { post :remove_related_table, params: params, xhr: true }

    before do
      subject
    end

    let(:view_builder) { create(:view_builder, table_name: table_name, database_id: @database.id, related_tables: ['events']) }
    let(:params) do
      {
        'id' => view_builder.id,
        'related_table' => 'events'
      }
    end

    it 'updates the view_builder' do
      view_builder.reload
      expect(view_builder.related_tables).to eq []
    end

    it 'renders a success message' do
      expect(response).to render_template('layout_builder/update/success')
    end

    context 'when it fails to save' do
      it 'renders a failure message' do
        ## TODO: fail gracefully
      end
    end
  end
end
