const express = require('express');
const router = express.Router();

// Mock database
const validIDs = {
  '12345': { brand: 'Whiskey Co', date: '2025-01-01', authentic: true },
  '67890': { brand: 'Gin Ltd', date: '2025-02-01', authentic: true },
};

const scans = []; // Track scans for duplicate detection
const facts = [
  'This whiskey aged 12 years!',
  'Made with 10 botanicals!',
  'Distilled in oak barrels!',
];

router.post('/scan', (req, res) => {
  const { id } = req.body;
  if (scans.includes(id)) {
    return res.json({
      authentic: false,
      details: 'Duplicate scan detected',
    });
  }
  scans.push(id);
  const result = validIDs[id] || {
    authentic: false,
    details: 'Invalid or counterfeit ID',
  };
  res.json({
    ...result,
    details: result.authentic
      ? `Verified: ${result.brand}, Bottled ${result.date}`
      : result.details,
    fact: facts[Math.floor(Math.random() * facts.length)],
  });
});

module.exports = router;