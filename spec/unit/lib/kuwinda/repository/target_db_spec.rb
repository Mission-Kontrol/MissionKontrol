# frozen_string_literal: true

require 'rails_helper'

module Kuwinda
  module Repository
    describe TargetDB do
      let(:table) { 'events' }
      let(:target_db) { described_class.new(database_connection) }
      let(:database_connection) do
        Kuwinda::UseCase::DatabaseConnection.new(database).execute
      end
      let(:database) { create(:database) }

      it 'responds to #table_columns' do
        expect(target_db).to respond_to(:table_columns)
      end

      it 'responds to #all' do
        expect(target_db).to respond_to(:all)
      end

      it 'responds to #find' do
        expect(target_db).to respond_to(:find)
      end

      it 'responds to #find_related' do
        expect(target_db).to respond_to(:find_related)
      end

      it 'responds to #update_record' do
        expect(target_db).to respond_to(:update_record)
      end

      it 'responds to #update_related_record' do
        expect(target_db).to respond_to(:update_related_record)
      end

      describe '#all' do
        let(:table) { 'users' }
        context "when limit is present" do
          it 'returns the number of records in the limit' do
            expect(target_db.conn).to receive(:exec_query).with("select * from #{table} limit 5 offset 0;")
            target_db.all(table, 5)
          end
        end

        context "when limit is not present" do
          it 'returns all records' do
            expect(target_db.conn).to receive(:exec_query).with("select * from #{table} limit 10 offset 0;")
            target_db.all(table)
          end
        end
      end

      describe '#find' do
        it 'returns the first record with a matching id' do
          id = 1
          expect(target_db.conn).to receive(:exec_query).with("select * from #{table} where id=#{id};")
          target_db.find(table, id)
        end
      end

      describe '#find_related' do
        it 'returns the first record with a matching foreign key' do
          id = 1
          foreign_key = "user_id"
          expect(target_db.conn).to receive(:exec_query).with("select * from #{table} where #{foreign_key}=#{id};")
          target_db.find_related(table, foreign_key, id)
        end
      end

      describe '#update_record' do
        before do
          travel_to Time.local(2004, 11, 24, 0o1, 0o4, 44)
        end

        after do
          travel_back
        end

        it 'updates the given record with the new value' do
          id = 1
          table = 'users'
          field = "email"
          value = "jknnlkm@fnjnfk.jfknnfk"

          expect(target_db.conn).to receive(:exec_query).with(
            "UPDATE #{table} SET #{field} = '#{value}', updated_at = '#{DateTime.now.utc.to_s(:db)}' WHERE id=#{id};"
          )
          target_db.update_record(table, field, value, id)
        end
      end

      describe '#update_related_record' do
        it 'updates a related record with the new value' do
          foreign_key_title = 'user_id'
          foreign_key_value = 1
          table = 'users'
          field = "email"
          value = "jknnlkm@fnjnfk.jfknnfk"

          expect(target_db.conn).to receive(:exec_query).with(
            "UPDATE #{table} SET #{field} = '#{value}' WHERE #{foreign_key_title}=#{foreign_key_value};"
          )
          target_db.update_related_record(table, field, value, foreign_key_title, foreign_key_value)
        end
      end

      describe '#create_record' do
        subject { target_db.create_record(table, record_params) }
        let(:table) { 'attending_events' }
        let(:record_params) do
          {
            event_id: "5",
            user_id: "7"
          }
        end

        before do
          travel_to Time.zone.local(2004, 11, 24, 0o1, 0o4, 44)
        end

        after do
          travel_back
        end

        context 'when there are no other records in the table' do
          context 'when the id field is numerical' do
            let(:response) { double('ActiveRecord', rows: [nil]) }
            let(:table_columns) { [double('column', name: :event_id, type: :integer, default: nil), double('column', name: :user_id, type: :integer, default: nil)] }
            before do
              allow(target_db.conn).to receive(:exec_query).with(
                "SELECT id FROM #{table} ORDER BY id DESC LIMIT 1;"
              ).and_return(response)
              allow(target_db.conn).to receive(:columns).and_return(table_columns)
            end

            it 'adds the record' do
              expect(target_db.conn).to receive(:exec_query).with(
                "INSERT INTO attending_events (id, event_id, user_id) VALUES (1, '5', '7')"
              )

              subject
            end
          end

          context 'when the id field is not numerical' do
            let(:response) { double('ActiveRecord', rows: [["5a"]]) }
            let(:table_columns) { [double('column', name: :event_id, type: :integer, default: nil), double('column', name: :user_id, type: :integer, default: nil)] }
            before do
              allow(target_db.conn).to receive(:exec_query).with(
                "SELECT id FROM #{table} ORDER BY id DESC LIMIT 1;"
              ).and_return(response)
            end

            it 'raises an error saying Id field is not numerical' do
              expect { subject }.to raise_error(UnableToSaveRecordError, 'Sorry, Id field is not an integer so we cannot add a new record')
            end
          end
        end

        context 'when there are other records in the table' do
          context 'when the ids are numerical' do
            let(:response) { double('ActiveRecord', rows: [[18]]) }
            let(:table_columns) { [double('column', name: :event_id, type: :integer, default: nil), double('column', name: :user_id, type: :integer, default: nil)] }
            before do
              allow(target_db.conn).to receive(:exec_query).with(
                "SELECT id FROM #{table} ORDER BY id DESC LIMIT 1;"
              ).and_return(response)
              allow(target_db.conn).to receive(:columns).and_return(table_columns)
            end

            it 'adds the record' do
              expect(target_db.conn).to receive(:exec_query).with(
                "INSERT INTO attending_events (id, event_id, user_id) VALUES (19, '5', '7')"
              )

              subject
            end
          end

          context 'when the ids are not numerical' do
            let(:response) { double('ActiveRecord', rows: [["5a"]]) }
            let(:table_columns) { [double('column', name: :event_id, type: :integer, default: nil), double('column', name: :user_id, type: :integer, default: nil)] }
            before do
              allow(target_db.conn).to receive(:exec_query).with(
                "SELECT id FROM #{table} ORDER BY id DESC LIMIT 1;"
              ).and_return(response)
            end

            it 'raises an error saying Id field is not numerical' do
              expect { subject }.to raise_error(UnableToSaveRecordError, 'Sorry, Id field is not an integer so we cannot add a new record')
            end
          end
        end
      end

      describe '#delete_record' do
        let(:records_array) { ["78"] }
        let(:table) { 'users' }

        it 'deletes the given record' do
          expect(target_db.conn).to receive(:exec_delete).with(
            "DELETE FROM #{table} WHERE id IN (78);"
          )
          target_db.delete_record(table, records_array)
        end

        context 'given multiple records' do
          let(:records_array) { ["78", "115"] }

          it 'deletes both the given records' do
            expect(target_db.conn).to receive(:exec_delete).with(
              "DELETE FROM #{table} WHERE id IN (78, 115);"
            )
            target_db.delete_record(table, records_array)
          end
        end
      end
    end
  end
end
