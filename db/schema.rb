# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_28_161057) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "activities", force: :cascade do |t|
    t.string "kind", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "feedable_type", null: false
    t.integer "feedable_id", null: false
    t.integer "user_id"
    t.integer "database_id"
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

  create_table "databases", force: :cascade do |t|
    t.string "adapter", null: false
    t.string "encoding"
    t.integer "pool", default: 5
    t.string "host", null: false
    t.string "username", null: false
    t.string "password", null: false
    t.integer "port", null: false
    t.string "name"
    t.string "friendly_name"
    t.string "domain_url"
    t.string "gem_token"
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
    t.integer "database_id"
    t.jsonb "editable_fields"
  end

  create_table "task_queue_outcomes", force: :cascade do |t|
    t.integer "task_queue_id", null: false
    t.string "task_queue_item_table", null: false
    t.string "task_queue_item_primary_key", null: false
    t.datetime "task_queue_item_reappear_at"
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
    t.integer "database_id"
    t.jsonb "success_database_update"
    t.jsonb "failure_database_update"
    t.boolean "enabled", default: true
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
    t.integer "database_id"
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

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
