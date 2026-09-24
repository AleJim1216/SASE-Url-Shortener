const express = require('express');
const hash = require('./hash');
const Shortener = require('./shortenerModel');
const router = express.Router();
process.loadEnvFile();
const urlPath = `http://localhost:${process.env.PORT}/`;

router.post('/shorten', async (req, res) => {
  if (!req.body.originalUrl) return res.status(404).json({ error: "No URL Found" });
  const shortId = req.body.customAlias ? req.body.customAlias : hash(req.body.originalUrl);
  const idExists = await Shortener.exists({ shortId: shortId }).exec();
  if (idExists) return res.json({ message: "Alias exists.", link: urlPath+shortId });
  const shortener = new Shortener({
    shortId: shortId,
    originalUrl: req.body.originalUrl,
  });
  await shortener.save();
  res.send(urlPath+shortId);
});

router.get('/:code/stats/', async (req, res) => {
  try {
    const doc = await Shortener.findOne({ shortId: req.params.code }).exec();
    if (!doc) res.status(404).json({ error: "No Document Found" });
    res.send(`Number of clicks for ${urlPath+ doc.shortId}: ${doc.count}`);
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
});

router.get('/:code', async (req, res) => {
  try {
    const doc = await Shortener.findOne({ shortId: req.params.code }).exec();
    if (!doc) res.status(404).json({ error: "No Document Found" });
    doc.count += 1;
    await doc.save();
    res.redirect(302, doc.originalUrl);
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
