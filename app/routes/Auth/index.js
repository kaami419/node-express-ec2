const router = require("express").Router();
const authController = require("../../controller/Auth");
const {
  signUpValidatorUser,
  signInValidator,
} = require("../../utils/validators/validators");

router.post("/signUp", authController.create);
router.post("/signIn", signInValidator(), authController.signIn);
router.get("/signOut", authController.signOutUser);
router.get("/myProfile", authController.myProfile);

module.exports = router;
