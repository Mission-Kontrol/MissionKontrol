# frozen_string_literal: true

module ActivityHelper
  def render_activity(activity)
    case activity.kind
    when 'note'
      content_tag(:strong, '{User here}') +
        content_tag(:span, ' added a ') +
        content_tag(:strong, 'comment: ') +
        content_tag(:span, activity.content.to_s)
    end
  end
end
