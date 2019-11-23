# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20191123165832) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string "kind", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "feedable_type", null: false
    t.integer "feedable_id", null: false
    t.index ["feedable_type", "feedable_id"], name: "index_activities_on_feedable_type_and_feedable_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.boolean "ignore_layout_modal", default: false
    t.boolean "active"
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "admin_users_roles", id: false, force: :cascade do |t|
    t.bigint "admin_user_id"
    t.bigint "role_id"
    t.index ["admin_user_id", "role_id"], name: "index_admin_users_roles_on_admin_user_id_and_role_id"
    t.index ["admin_user_id"], name: "index_admin_users_roles_on_admin_user_id"
    t.index ["role_id"], name: "index_admin_users_roles_on_role_id"
  end

  create_table "data_table_states", force: :cascade do |t|
    t.string "table", null: false
    t.jsonb "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "organisation_settings", force: :cascade do |t|
    t.string "license_key"
    t.string "activation_id"
    t.boolean "full_license", default: false
    t.string "company_name"
  end

  create_table "permissions", force: :cascade do |t|
    t.string "name"
    t.string "subject_class"
    t.integer "subject_id"
    t.string "action"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "administrator"
    t.boolean "editor"
    t.boolean "export"
    t.integer "export_limit"
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource_type_and_resource_id"
  end

  create_table "roles_permissions", force: :cascade do |t|
    t.bigint "role_id"
    t.bigint "permission_id"
    t.index ["permission_id"], name: "index_roles_permissions_on_permission_id"
    t.index ["role_id", "permission_id"], name: "index_roles_permissions_on_role_id_and_permission_id"
    t.index ["role_id"], name: "index_roles_permissions_on_role_id"
  end

  create_table "target_table_settings", force: :cascade do |t|
    t.string "name", null: false
    t.string "nested_table"
    t.string "create_destination"
    t.string "delete_destination"
  end

  create_table "task_queue_outcomes", force: :cascade do |t|
    t.integer "task_queue_id", null: false
    t.string "task_queue_item_table", null: false
    t.string "task_queue_item_primary_key", null: false
    t.datetime "task_queue_item_reappear_at", null: false
    t.string "outcome", null: false
    t.index ["task_queue_id", "task_queue_item_primary_key"], name: "task_queue_item_unique", unique: true
  end

  create_table "task_queues", force: :cascade do |t|
    t.string "name", null: false
    t.text "details"
    t.string "table"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "query_builder_rules", default: []
    t.string "raw_sql"
    t.string "query_builder_sql"
    t.jsonb "draggable_fields", default: []
    t.string "success_outcome_title"
    t.string "success_outcome_timeout"
    t.string "failure_outcome_title"
    t.string "failure_outcome_timeout"
  end

  create_table "view_builders", force: :cascade do |t|
    t.string "table_name", null: false
    t.jsonb "table_attributes", default: "{}", null: false
    t.string "view_name"
    t.string "status", default: "pending"
    t.boolean "show_status", default: false, null: false
    t.boolean "commentable", default: false, null: false
    t.string "parent_comment_table"
    t.jsonb "draggable_fields_side_container", default: []
    t.jsonb "draggable_fields_header_container1", default: []
    t.jsonb "draggable_fields_header_container2", default: []
    t.jsonb "draggable_fields_main_container1", default: []
    t.jsonb "draggable_fields_main_container2", default: []
    t.jsonb "draggable_fields_main_container3", default: []
    t.jsonb "hidden_columns", default: []
    t.jsonb "callable_fields", default: []
    t.jsonb "related_tables", default: []
  end

  create_table "work_lists", force: :cascade do |t|
    t.string "name", null: false
    t.text "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "sql_filters", default: []
    t.string "sql_query"
    t.jsonb "outcomes", default: []
    t.string "data_table_name"
    t.jsonb "visible_columns", default: []
  end

end
