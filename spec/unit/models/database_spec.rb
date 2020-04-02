# frozen_string_literal: true

describe Database do
  let(:database) { build(:database, password: password) }

  describe '#encrypt_database_password' do
    subject { database.encrypt_database_password }
    let(:password) { 'password' }

    context 'when saving the database' do
      it 'encrypts the password' do
        database.save
        expect(database.password).not_to eq password
      end
    end

    context 'when password has been encrypted' do
      context 'and trying to save the database with the encypted password' do
        it 'saves the originally encrypted password' do
          database.save
          encrypted_password = database.password
          database.password = encrypted_password
          database.save
          expect(database.password).to eq encrypted_password
        end
      end
    end
  end
end
