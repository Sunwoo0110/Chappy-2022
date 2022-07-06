const { Router } = require("express");
const router = Router();
const ctrl = require("./hint.ctrl");

router.post("/post_hint", ctrl.post_hint);

module.exports = router;
