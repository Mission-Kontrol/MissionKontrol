# frozen_string_literal: true

class DataTableState < ApplicationRecord
  def state_as_json
    columns = []

    state['columns'].each do |_k, v|
      val = {}
      val['visible'] = ActiveModel::Type::Boolean.new.cast(v['visible'])
      val['search'] = v['search']
      columns << val
    end

    {
      time: state['time'].to_i,
      start: state['start'].to_i,
      length: state['length'].to_i,
      order: state['order'],
      search: state['search'],
      columns: columns
    }
  end
end
