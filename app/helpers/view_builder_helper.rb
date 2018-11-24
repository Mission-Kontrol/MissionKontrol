# frozen_string_literal: true

module ViewBuilderHelper
  def status_options
    [
      ['Pending', 'pending', { class: 'select-pending' }],
      ['Active', 'active', { class: 'select-active' }],
      ['Deactivated', 'deactivated', { class: 'select-deactivated' }]
    ]
  end
end
