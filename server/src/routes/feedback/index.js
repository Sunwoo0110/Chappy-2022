const { Router } = require("express");
const router = Router();
const ctrl = require("./feedback.ctrl");

router.post("/post_test", ctrl.post_test);
router.post("/get_feedback", ctrl.get_feedback);

module.exports = router;