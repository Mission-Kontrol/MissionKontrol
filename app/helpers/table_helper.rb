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
    foreign_key = get_foreign_key(primary_table)
    repo.find_related(foreign_key , relatable_id)
  end

  def get_foreign_key(primary_table)
    "#{convert_table_name(primary_table)}_id"
  end

  def table_has_layout?(table)
    ViewBuilder.where(table_name: table).size > 0
  end

  def draggable_fields_container_is_empty?(container)
    if container.class == Array
       container.empty?
     elsif container.class == String
       JSON.parse(container).empty?
     else
       false
    end
  end

  def fields_for_header_container1(layout_builder)
    items_for_container(layout_builder, 'draggable_fields_header_container1')
  end

  def fields_for_header_container2(layout_builder)
    items_for_container(layout_builder, 'draggable_fields_header_container2')
  end

  def fields_for_main_container1(layout_builder)
    items_for_container(layout_builder, 'draggable_fields_main_container1')
  end

  def fields_for_main_container2(layout_builder)
    items_for_container(layout_builder, 'draggable_fields_main_container2')
  end

  def fields_for_main_container3(layout_builder)
    items_for_container(layout_builder, 'draggable_fields_main_container3')
  end

  def fields_for_side_container(layout_builder)
    items_for_container(layout_builder, 'draggable_fields_side_container')
  end

  def task_queue_draggable_field_settings_container(task_queue)
    items = task_queue.draggable_fields

    if items.class == String
      JSON.parse(items)
    else
      items
    end
  end

  def current_row_valid?(current_row, field)
    current_row &&  !current_row[field["title"]].blank?
  end

  def table_has_layout?(table)
    ViewBuilder.where(table_name: table).size > 0
  end

  private

  def convert_table_name(table)
    ies = table.end_with?('ies')
    pluralization = ies ? 'ies' : 's'
    table = table.chomp(pluralization)
    table = ies ? table + 'y' : table
    table.downcase
  end

  def total_row_count(rows, default=8)
    if rows.size < default
      rows.size
    else
      default
    end
  end
end
