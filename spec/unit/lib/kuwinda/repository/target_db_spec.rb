# frozen_string_literal: true

require 'rails_helper'

module Kuwinda
  module Repository
    describe TargetDB do
      let(:table) { 'events' }
      let(:a_target_db_repo) { described_class.new(table) }

      it 'responds to #table' do
        expect(a_target_db_repo).to respond_to(:table)
      end

      it 'responds to #all' do
        expect(a_target_db_repo).to respond_to(:all)
      end

      it 'responds to #find' do
        expect(a_target_db_repo).to respond_to(:find)
      end

      it 'responds to #find_related' do
        expect(a_target_db_repo).to respond_to(:find_related)
      end

      it 'responds to #update_record' do
        expect(a_target_db_repo).to respond_to(:update_record)
      end

      it 'responds to #update_related_record' do
        expect(a_target_db_repo).to respond_to(:update_related_record)
      end

      describe '#all' do
        context "when limit is present" do
          it 'returns all records' do
            expect(a_target_db_repo.conn).to receive(:exec_query).with("select * from #{table} limit 5;")
            a_target_db_repo.all(5)
          end
        end

        context "when limit is not present" do
          it 'returns all records' do
            expect(a_target_db_repo.conn).to receive(:exec_query).with("select * from #{table};")
            a_target_db_repo.all
          end
        end
      end

      describe '#find' do
        it 'returns the first record with a matching id' do
          id = 1
          expect(a_target_db_repo.conn).to receive(:exec_query).with("select * from #{table} where id=#{id};")
          a_target_db_repo.find(id)
        end
      end

      describe '#find_related' do
        it 'returns the first record with a matching foreign key' do
          id = 1
          foreign_key = "user_id"
          expect(a_target_db_repo.conn).to receive(:exec_query).with("select * from #{table} where #{foreign_key}=#{id};")
          a_target_db_repo.find_related(foreign_key, id)
        end
      end

      describe '#update_record' do
        it 'updates the given record with the new value' do
          id = 1
          table = 'users'
          field = "email"
          value = "jknnlkm@fnjnfk.jfknnfk"

          expect(a_target_db_repo.conn).to receive(:exec_query).with(
            "UPDATE #{table} SET #{field} = '#{value}' WHERE id=#{id};"
          )
          a_target_db_repo.update_record(table, field, value, id)
        end
      end

      describe '#update_related_record' do
        it 'updates a related record with the new value' do
          foreign_key_title = 'user_id'
          foreign_key_value = 1
          table = 'users'
          field = "email"
          value = "jknnlkm@fnjnfk.jfknnfk"

          expect(a_target_db_repo.conn).to receive(:exec_query).with(
            "UPDATE #{table} SET #{field} = '#{value}' WHERE #{foreign_key_title}=#{foreign_key_value};"
          )
          a_target_db_repo.update_related_record(table, field, value, foreign_key_title, foreign_key_value)
        end
      end
    end
  end
end
