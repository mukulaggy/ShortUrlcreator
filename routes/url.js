const express = require("express");
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("./analytics/:shortId", handleGetAnalytics);  // Fixed the route path to start with '/'

module.exports = router;
