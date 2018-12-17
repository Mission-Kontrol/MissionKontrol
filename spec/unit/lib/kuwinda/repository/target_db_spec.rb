# frozen_string_literal: true

require 'rails_helper'

module Kuwinda
  module Repository
    describe  TargetDB  do
      let(:table) { 'events' }
      let(:a_target_db_repo) { described_class.new(table) }

      it "responds to #table" do
        expect(a_target_db_repo).to respond_to(:table)
      end

      it "responds to #all" do
        expect(a_target_db_repo).to respond_to(:all)
      end

      it "responds to #find" do
        expect(a_target_db_repo).to respond_to(:find)
      end

      describe "#all" do
        it "returns all records" do
          expect(a_target_db_repo.conn).to receive(:exec_query).with("select * from #{table};")
          a_target_db_repo.all
        end
      end

      describe "#find" do
        it "returns the first record with a matching id" do
          id = 1
          expect(a_target_db_repo.conn).to receive(:exec_query).with("select * from #{table} where id=#{id};")
          a_target_db_repo.find(id)
        end
      end
    end
  end
end
