const router = require("express").Router();
const {
  preRegistration,
  findAllPreRegistration,
  getAllKnockers,
  updateKnocker,
  getKnockerById,
} = require("../../controller/Knocker");

router.post("/pre/registation", preRegistration);
router.get("/pre/registation", findAllPreRegistration);
router.get("/all", getAllKnockers);
router.get("", getKnockerById);
router.put("", updateKnocker);

module.exports = router;
