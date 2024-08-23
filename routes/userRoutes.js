const express = require("express");
const { 
    getAllUsers, 
    registerController, 
    loginController,
} = require("../controllers/userController");

// Router object
const router = express.Router();

// POST create user
router.post("/register", registerController);

// GET all users
router.get("/all-users", getAllUsers);

// POST login
router.post("/login", loginController);

module.exports = router
