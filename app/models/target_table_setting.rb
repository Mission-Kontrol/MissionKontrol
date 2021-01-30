# frozen_string_literal: true

class TargetTableSetting < ApplicationRecord
  def create_editable_fields(columns)
    columns.map do |column|
      add_column_to_editable_fields(column)
    end
  end

  def update_editable_fields(columns)
    columns.map do |column|
      next if editable_fields[column.name.to_s]

      add_column_to_editable_fields(column)
    end

    remove_stale_columns(columns)
    save!
  end

  def update_primary_keys(table_primary_keys)
    self.primary_keys = {}
    self.primary_keys = { 'primary_keys' => table_primary_keys }
    save!
  end

  private

  def add_column_to_editable_fields(column)
    self.editable_fields = {} if editable_fields.nil?
    editable_fields.merge!(column.name.to_s => { 'editable' => false, 'mandatory' => false })
  end

  def remove_stale_columns(columns)
    column_names = columns.map(&:name)
    editable_fields.delete_if { |key, _value| !column_names.include? key }
  end
end
