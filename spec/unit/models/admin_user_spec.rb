# frozen_string_literal: true

def twilio_credentials
  %w[
    twilio_caller_id
    twilio_auth_token
    twilio_account_sid
    twilio_application_sid
    twilio_caller_id=
    twilio_auth_token=
    twilio_account_sid=
    twilio_application_sid=
  ]
end

describe AdminUser do
  let(:user) { create(:admin_user) }
  let(:an_admin_user) { described_class.new }

  describe '#active_for_authentication?' do
    context 'when user is active' do
      it 'returns true' do
        expect(user.active_for_authentication?).to eq true
      end
    end

    context 'when user is not active' do
      let(:user) { create(:admin_user, active: false) }

      it 'returns false' do
        expect(user.active_for_authentication?).to eq false
      end
    end
  end

  describe '#inactive_message' do
    it 'returns the inactive message' do
      expect(user.inactive_message).to eq 'Your account is not active. Please speak to an Administrator.'
    end
  end

  describe '#permission?' do
    let(:database_id) { 5 }
    let(:table) { 'dogs' }
    let(:action) { 'view' }

    context 'when user has no permissions' do
      it 'returns false' do
        expect(user.permission?(action, table, database_id)).to eq false
      end
    end

    context 'when user has requested permission' do
      let(:role) { create(:role) }
      let(:permission) { create(:permission, subject_class: table, subject_id: database_id, action: action) }

      before do
        role.permissions << permission
        user.roles << role
      end

      it 'returns true' do
        expect(user.permission?(action, table, database_id)).to eq true
      end
    end
  end

  describe '#admin_abilities?' do
    context 'when user has a role that is administrator' do
      let(:role) { create(:role, :admin) }
      before do
        user.roles << role
      end

      it 'returns true' do
        expect(user.admin_abilities?).to eq true
      end
    end

    context 'when user does not have an administrator role' do
      let(:role) { create(:role, :editor) }
      before do
        user.roles << role
      end

      it 'returns false' do
        expect(user.admin_abilities?).to eq false
      end
    end
  end

  describe '#editor_abilities?' do
    context 'when user has a role that is editor' do
      let(:role) { create(:role, :editor) }
      before do
        user.roles << role
      end

      it 'returns true' do
        expect(user.editor_abilities?).to eq true
      end
    end

    context 'when user does not have an editor role' do
      let(:role) { create(:role, :export) }
      before do
        user.roles << role
      end

      it 'returns false' do
        expect(user.editor_abilities?).to eq false
      end
    end
  end

  describe '#export_abilities?' do
    context 'when user has a role that is export' do
      let(:role) { create(:role, :export) }
      before do
        user.roles << role
      end

      it 'returns true' do
        expect(user.export_abilities?).to eq true
      end
    end

    context 'when user does not have an export role' do
      let(:role) { create(:role, :editor) }
      before do
        user.roles << role
      end

      it 'returns false' do
        expect(user.export_abilities?).to eq false
      end
    end
  end

  describe '#full_name' do
    let(:user) { create(:admin_user, first_name: 'Jane', last_name: 'Doe') }

    it 'returns the users full name' do
      expect(user.full_name).to eq 'Jane Doe'
    end
  end

  describe '#ignore_layout_modal?' do
    it 'returns false if user is not set to ignore layout modal' do
      expect(user.ignore_layout_modal?).to eq false
    end
  end

  twilio_credentials.each do |credential|
    it "responds to #{credential}" do
      expect(an_admin_user).to respond_to(credential)
    end
  end
end
