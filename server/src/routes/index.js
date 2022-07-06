const { Router } = require("express");
const router = Router();

const connectDb = require("./db");

connectDb();

// router.use("/", require("./root"));
router.use("/test", require("./test"));
router.use("/runcode", require("./runcode"));
router.use("/feedback", require("./feedback"));
router.use("/hint", require("./hint"));

module.exports = router;
