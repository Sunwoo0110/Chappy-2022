const { Router } = require("express");
const router = Router();
const ctrl = require("./runcode.ctrl");

router.get("/", ctrl.get_root);
// router.get("/add/:title", ctrl.get_add_title);
// router.get("/click/:title", ctrl.get_click_title);
router.post("/run", ctrl.post_run_code);

module.exports = router;