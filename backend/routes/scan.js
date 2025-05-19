const express = require('express');
const router = express.Router();
const Bottle = require('../models/Bottle');

const facts = [
  'This whiskey aged 12 years!',
  'Made with 10 botanicals!',
  'Distilled in oak barrels!',
];

router.post('/scan', async (req, res) => {
  const { id } = req.body;

  try {
    // Find bottle by ID
    const bottle = await Bottle.findOne({ id });

    if (!bottle) {
      return res.json({
        authentic: false,
        details: 'Invalid or counterfeit ID',
        fact: facts[Math.floor(Math.random() * facts.length)],
      });
    }

    // Check for duplicate scans
    const isDuplicate = bottle.scans.some(
      (scan) => new Date() - new Date(scan.timestamp) < 24 * 60 * 60 * 1000 // 24 hours
    );

    if (isDuplicate) {
      return res.json({
        authentic: false,
        details: 'Duplicate scan detected',
        fact: facts[Math.floor(Math.random() * facts.length)],
      });
    }

    // Record new scan
    bottle.scans.push({ timestamp: new Date() });
    await bottle.save();

    // Return verification result
    res.json({
      authentic: bottle.authentic,
      details: bottle.authentic
        ? `Verified: ${bottle.brand}, Bottled ${bottle.bottlingDate}`
        : 'Invalid or counterfeit ID',
      fact: facts[Math.floor(Math.random() * facts.length)],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      authentic: false,
      details: 'Server error during scan',
      fact: facts[Math.floor(Math.random() * facts.length)],
    });
  }
});

module.exports = router;