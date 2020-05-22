# frozen_string_literal: true

describe TaskQueuesController, type: :controller do
  before do
    @database = create(:database)
    create_user_with_permissions('Editor', :view, 'events', @database.id)
    sign_in @user

    allow(mock_list_available_tables).to receive(:call).and_return(available_tables)
    allow(Kuwinda::Presenter::ListAvailableTables).to receive(:new).and_return(mock_list_available_tables)
  end

  let(:mock_list_available_tables) { double('PresenterDouble') }
  let(:available_tables) { ['users', 'events', 'attending_events'] }
  let(:table_name) { 'events' }
  let!(:task_queue) { create(:task_queue, table: table_name, database_id: @database.id) }
  let(:work_list) { create(:work_list) }

  describe 'GET index' do
    subject { get :index }

    before do
      subject
    end

    it 'assigns @databases with all databases' do
      expect(assigns(:databases)).to eq [@database]
    end

    it 'assigns @view_builders with all view_builders' do
      expect(assigns(:task_queues)).to eq [task_queue]
    end

    it 'renders the standard layout' do
      expect(response).to render_template(layout: 'standard')
    end
  end

  describe 'GET new' do
    subject { get :new, params: { database_id: @database.id } }

    it 'assigns task_queue as a new Task Queue' do
      expect(TaskQueue).to receive(:new)
      subject
    end

    it 'assigns the available tables on the database' do
      subject
      expect(assigns[:available_tables]).to eq available_tables
    end

    # TODO: why?
    it 'assigns the work lists' do
      subject
      expect(assigns[:work_lists]).to eq [work_list]
    end

    # TODO: what does this bit mean
    it 'assigns the work lists in order of created at' do
    end
  end

  describe 'POST create' do
    subject { post :create, params: params }
    let(:params) do
      {
        task_queue: {
          name: 'Test',
          details: '',
          table: table_name,
          database_id: @database.id
        }
      }
    end

    it 'assigns the task queue' do
    end

    context 'successful' do
      it 'redirects to the edit task queue path' do
        expect(subject).to redirect_to edit_task_queue_url(assigns[:task_queue])
      end
    end

    context 'unsuccessful' do
      let(:params) do
        {
          task_queue: {
            name: nil,
            details: '',
            table: table_name,
            database_id: @database.id
          }
        }
      end

      it 'returns a 422 status' do
        expect(subject.code).to eq '422'
      end
    end
  end

  # TODO: write test for this
  describe 'GET show' do
  end

  describe 'GET edit' do
    subject { get :edit, params: { id: task_queue.id } }
    let(:mock_target_db) { double('TargetDbDouble') }

    before do
      allow(mock_target_db).to receive(:query).and_return(1)
      allow(Kuwinda::Repository::TargetDB).to receive(:new).and_return(mock_target_db)
      subject
    end
  end

  describe 'POST update' do
    subject { patch :update, params: params }

    let!(:task_queue) { create(:task_queue) }
    let(:params) do
      {
        id: task_queue.id,
        task_queue: {
          name: '',
          details: 'Task queue details updated',
          query_builder_rules: 'Query rules updated',
          query_builder_sql: 'Query SQL updated',
          raw_sql: 'Raw SQL updated',
          success_outcome_title: 'Success title updated',
          success_outcome_timeout: 7,
          failure_outcome_title: 'Failute title updated',
          failure_outcome_timeout: 1
        }
      }
    end

    it 'updates the task queue attributes' do
      subject
      task_queue.reload
      expect(task_queue.details).to eq 'Task queue details updated'
    end
  end

  describe 'GET preview' do
  end

  describe 'POST outcome' do
  end

  describe 'GET record' do
  end

  describe 'GET field_settings' do
  end
end
