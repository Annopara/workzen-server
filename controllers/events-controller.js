const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("events");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Users: ${err}`);
  }
};

const findOne = async (req, res) => {
  try {
    const eventsFound = await knex("events").where({ event_id: req.params.id });

    if (eventsFound.length === 0) {
      return res.status(404).json({
        message: `Event with ID ${req.params.id} not found`,
      });
    }

    const eventData = eventsFound[0];
    res.json(eventData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve event data for event with ID ${req.params.id}`,
    });
  }
};

// Get staff
const posts = async (req, res) => {
  try {
    const posts = await knex("teammembers")
      .join("events", "events.event_id", "=", "teammembers.staff_id") // Joining with the events table
      .where({ "teammembers.staff_id": req.params.id }) // Filtering by staff_id
      .select("events.*", "teammembers.name"); // Selecting all columns from the events table

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve posts for user with ID ${req.params.id}: ${error}`,
    });
  }
};

module.exports = {
  index,
  findOne,
  posts,
};
