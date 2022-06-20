const express = require("express");
const router = require("express").Router();
const { registerUser , authUser , allUsers} = require("../../controllers/userControllers");
const {protect} = require("../../middleware/chat/authMiddleware");

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/loginC", authUser);




module.exports = router;