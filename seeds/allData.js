// import seed data files, arrays of objects
const eventsData = require("../seed-data/eventData");
const teamData = require("../seed-data/teamData");

exports.seed = async function (knex) {
  await knex("events").del();
  await knex("events").insert(eventsData);
  await knex("teammembers").del();
  await knex("teammembers").insert(teamData);
  await knex("messages").del();
  await knex("messages").insert([
    {
      event_id: 1,

      content: "Reminder: Please confirm the final guest list by tomorrow.",
    },
    {
      event_id: 2,

      content: "The cake order has been placed as per the client's request.",
    },
    {
      event_id: 3,

      content: "The venue booking is confirmed for the wedding date.",
    },
    {
      event_id: 4,

      content:
        "We will arrange transportation for guests from the hotel to the beach venue.",
    },
    {
      event_id: 5,

      content: "Please review the agenda for the corporate retreat.",
    },
    {
      event_id: 6,

      content: "Reminder: Team-building activities are scheduled for tomorrow.",
    },
    {
      event_id: 7,

      content: "All arrangements for the graduation party are on track.",
    },
    {
      event_id: 8,

      content:
        "Reminder: Collect the graduation certificates from the printing company.",
    },
    {
      event_id: 9,

      content: "The anniversary celebration decorations are ready for setup.",
    },
    {
      event_id: 10,

      content:
        "Please finalize the music playlist for the anniversary celebration.",
    },
    {
      event_id: 11,

      content: "Reminder: Please confirm the final guest list by tomorrow.",
    },
    {
      event_id: 12,

      content: "The cake order has been placed as per the client's request.",
    },
    {
      event_id: 13,

      content: "The venue booking is confirmed for the wedding date.",
    },
    {
      event_id: 14,

      content:
        "We will arrange transportation for guests from the hotel to the beach venue.",
    },
    {
      event_id: 15,

      content: "Please review the agenda for the corporate retreat.",
    },
    {
      event_id: 16,

      content: "Reminder: Team-building activities are scheduled for tomorrow.",
    },
    {
      event_id: 17,

      content: "All arrangements for the graduation party are on track.",
    },
    {
      event_id: 18,

      content:
        "Reminder: Collect the graduation certificates from the printing company.",
    },
    {
      event_id: 19,

      content: "The anniversary celebration decorations are ready for setup.",
    },
    {
      event_id: 20,

      content:
        "Please finalize the music playlist for the anniversary celebration.",
    },
  ]);
};
