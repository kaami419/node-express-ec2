const router = require("express").Router();
const {
  createPin,
  findAllPins,
  updatePin,
  deletePin,
} = require("../../controller/Pin");

router.post("/", createPin);
router.get("/", findAllPins);
router.put("/", updatePin);
router.delete("/", deletePin);

module.exports = router;
