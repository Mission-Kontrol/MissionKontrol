# frozen_string_literal: true

describe Role do
  describe '#setting' do
    let(:subject) { role.setting(setting_name) }

    context 'when setting_name is administrator' do
      let(:setting_name) { 'administrator' }

      context 'and role is administrator' do
        let(:role) { create(:role, :admin) }

        it 'returns false' do
          expect(subject).to eq false
        end
      end

      context 'and role is not administrator' do
        let(:role) { create(:role) }

        it 'returns true' do
          expect(subject).to eq true
        end
      end
    end

    context 'when setting_name is editor' do
      let(:setting_name) { 'editor' }

      context 'and role is editor' do
        let(:role) { create(:role, :editor) }

        it 'returns false' do
          expect(subject).to eq false
        end
      end

      context 'and role is not editor' do
        let(:role) { create(:role) }

        it 'returns true' do
          expect(subject).to eq true
        end
      end
    end

    context 'when setting_name is export' do
      let(:setting_name) { 'export' }

      context 'and role is export' do
        let(:role) { create(:role, :export) }

        it 'returns false' do
          expect(subject).to eq false
        end
      end

      context 'and role is not export' do
        let(:role) { create(:role) }

        it 'returns true' do
          expect(subject).to eq true
        end
      end
    end
  end
end
