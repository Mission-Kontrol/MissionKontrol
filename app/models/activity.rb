# frozen_string_literal: true

class Activity < ApplicationRecord
  KINDS = %w[note call].freeze
  ## TODO: Figure out the feedable_types based on database?
  # FEEDABLE_TYPES = Kuwinda::Presenter::ListAvailableTables.new(@database_connection).call

  validates :content, presence: true
  validates :kind, presence: true, inclusion: { in: KINDS }
  validates :feedable_id, presence: true

  belongs_to :admin_user, class_name: 'AdminUser', foreign_key: 'user_id'
  # validates :feedable_type, presence: true, inclusion: { in: FEEDABLE_TYPES }
end
