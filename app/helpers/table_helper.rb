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
end
