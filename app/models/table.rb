# frozen_string_literal: true

class Table
  attr_accessor :name
  # has_many :activities, as: :feedable

  def rows
    sql = "select * from #{name};"
    ClientRecord.connection.exec_query(sql)
  end

  def row(id)
    sql = "select * from #{name} where id=#{id};"
    ClientRecord.connection.exec_query(sql)
  end
end
