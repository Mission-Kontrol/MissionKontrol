# frozen_string_literal: true

module TableHelper
  def items_for_container(layout_builder, container)
    items = layout_builder.send(container)

    if items.class == String
      JSON.parse(items)
    else
      items
    end
  end

  def get_related_row(primary_table, relatable_table, relatable_id)
    repo = Kuwinda::Repository::TargetDB.new
    repo.table = relatable_table
    foreign_key = "#{convert_table_name(primary_table)}_id"
    repo.find_related(foreign_key , relatable_id)
  end

  private

  def convert_table_name(table)
    ies = table.end_with?('ies')
    pluralization = ies ? 'ies' : 's'
    table = table.chomp(pluralization)
    table = ies ? table + 'y' : table
    table.downcase
  end
end
