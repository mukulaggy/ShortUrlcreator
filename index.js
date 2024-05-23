const express = require("express");
const path = require("path");
const URL = require("./models/url");
const staticRoute = require('./routes/staticrouter');
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");

const PORT = 8001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes
app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/test", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.render("home", { urls: allUrls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const urlRecord = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitedHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!urlRecord) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(urlRecord.requiredUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Database connection and server start
connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("Connection successfully established"))
  .catch(() => console.log("Error"));

app.listen(PORT, () => console.log(`Running on: ${PORT}`));
