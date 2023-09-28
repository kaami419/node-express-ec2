const router = require("express").Router();

const {
  create,
  finAllAreas,
  AssignAreaToKnocker,
  FetchAllAreaUsers,
} = require("../../controller/Area");

router.post("", create);
router.get("", finAllAreas);
router.post("/assign", AssignAreaToKnocker);
router.get("/get/users", FetchAllAreaUsers);

module.exports = router;
