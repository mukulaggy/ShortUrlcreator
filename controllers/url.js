const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = shortid.generate();

    await URL.create({
        shortId: shortId,
        requiredUrl: body.url,
        visitedHistory: [],
    });

    return res.render("home", {
        id: shortId,
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    try {
        const result = await URL.findOne({ shortId: shortId });
        if (!result) {
            return res.status(404).json({ error: "URL not found" });
        }
        return res.json({
            totalClicks: result.visitedHistory.length,
            analytics: result.visitedHistory,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
