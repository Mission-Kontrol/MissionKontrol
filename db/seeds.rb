# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database
# with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db
# with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if Role.all.empty?
  Role.create([
    {
      name: 'Admin',
      administrator: true,
      editor: true,
      export: true
    },
    {
      name: 'Editor',
      administrator: false,
      editor: true,
      export: false
    },
    {
      name: 'User',
      administrator: false,
      editor: false,
      export: false
    }
  ])
end
