const router = require("express").Router();

const eventsController = require("../controllers/events-controller");

router.route("/").get(eventsController.index);

router.route("/:id").get(eventsController.findOne);
router.route("/:id/staffs").get(eventsController.posts);

module.exports = router;
