const router = require("express").Router();

router.use("/auth", require("./Auth"));
router.use("/admin", require("./Admin"));
router.use("/knocker", require("./Knocker"));
router.use("/area", require("./Area"));
router.use("/pin", require("./Pin"));

module.exports = router;
