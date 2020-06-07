# frozen_string_literal: true

module ActivityHelper
  def render_activity(activity)
    name = activity.admin_user == current_admin_user ? 'You' : activity.admin_user.full_name
    case activity.kind
    when 'note'
      content_tag(:strong, name) +
        content_tag(:span, ' added a ') +
        content_tag(:strong, 'comment: ') +
        content_tag(:span, activity.content.to_s)
    when 'outcome'
      content_tag(:strong, name) +
        content_tag(:span, ' added a ') +
        content_tag(:strong, 'tag: ') +
        content_tag(:span, activity.content.to_s)
    end
  end
end
