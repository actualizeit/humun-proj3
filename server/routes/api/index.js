const router = require("express").Router();
const userRoutes = require("./users");

// Food routes
router.use("/users", userRoutes);

module.exports = router;
