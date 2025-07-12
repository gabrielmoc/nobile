const express = require("express");
const router = express.Router();
const { listarLogs } = require("../controllers/adminLogController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

router.get("/logs", authMiddleware, isAdmin, listarLogs);

module.exports = router;
