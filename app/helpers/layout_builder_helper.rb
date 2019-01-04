module LayoutBuilderHelper
  def icon_for_field_type(field)
    case field
    when 'string', 'text'
      return 'fa fa-font'
    when 'boolean'
      return 'fa fa-toggle-on'
    when 'time', 'timestamp'
      return 'fa fa-clock-o'
    when 'datetime', 'date'
      return 'fa fa-calendar'
    else
      return 'fa fa-font'
    end
  end
end


# :binary
#
#
# :decimal
# :float
# :integer
#
# :primary_key
#
# :boolean
#
# :string
# :text
#
# :date
# :datetime
# :time
# :timestamp
