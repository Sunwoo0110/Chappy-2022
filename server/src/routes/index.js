const { Router } = require("express");
const router = Router();

const connectDb = require("./db");

connectDb();

// router.use("/", require("./root"));
// router.use("/users", require("./users"))
router.use("/test", require("./test"))
router.use("/feedback", require("./feedback"))
// router.use("/habit", require("./habit"))

module.exports = router;
