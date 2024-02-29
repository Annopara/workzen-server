/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("events", (table) => {
      table.increments("event_id").primary();
      table.string("event_name").notNullable();
      table.string("client_name").notNullable();
      table.string("status").notNullable();
      table.date("due_date").notNullable();
      table.string("location").notNullable();
      table.decimal("budget", 10, 2).notNullable();
      table.integer("invitees").notNullable();
      table.text("notes");
      table.string("theme");
      table.text("special_requirements");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("teammembers", (table) => {
      table.increments("staff_id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("role").nullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("messages", (table) => {
      table.increments("id").primary();
      table
        .integer("event_id")
        .unsigned()
        .references("events.event_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("staff_id")
        .unsigned()
        .references("teammembers.staff_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      table.string("content").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("messages")
    .dropTableIfExists("teammembers")
    .dropTableIfExists("events");
};
