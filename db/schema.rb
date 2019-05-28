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

ActiveRecord::Schema.define(version: 20190518152319) do

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
    t.string "company_name"
    t.string "license_key"
    t.string "activation_id"
    t.boolean "full_license", default: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
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
