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

      it 'responds to #update_row' do
        expect(a_target_db_repo).to respond_to(:update_row)
      end

      describe '#all' do
        it 'returns all records' do
          expect(a_target_db_repo.conn).to receive(:exec_query).with("select * from #{table};")
          a_target_db_repo.all
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

      describe '#update_row' do
        xit 'updates the given row with the new value' do
          row = {}
          row['id'] = 1
          table = 'users'
          column = "email"
          value = "jknnlkm@fnjnfk"

          foreign_key = "user_id"
          expect(a_target_db_repo.conn).to receive(:exec_query).with(
            "UPDATE #{table} SET #{column} = #{value}, WHERE id=#{row['id']};"
          )
          a_target_db_repo.update_row(row, value)
        end
      end
    end
  end
end
