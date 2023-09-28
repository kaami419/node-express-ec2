const router = require("express").Router();
const authController = require("../../controller/Auth");
const { signUpValidatorUser } = require("../../utils/validators/validators");

router.post("/create/user", signUpValidatorUser(), authController.create);

module.exports = router;
