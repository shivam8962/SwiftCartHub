const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getUser, updateUserRole, deleteUser } = require("../controllers/userController");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/getUserDetails").get(isAuthenticatedUser, getUserDetails)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)
router.route("/updateProfile").put(isAuthenticatedUser, updateProfile)
router.route("/admin/getAllUser").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser)
router.route("/admin/getUser/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getUser)
router.route("/admin/getUser/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
router.route("/admin/getUser/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports = router;