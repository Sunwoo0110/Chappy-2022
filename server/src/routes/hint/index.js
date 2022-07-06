const { Router } = require("express");
const router = Router();
const ctrl = require("./hint.ctrl");

router.post("/get_hint", ctrl.get_hint);

module.exports = router;
