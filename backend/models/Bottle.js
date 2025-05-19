const mongoose = require('mongoose');

const bottleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
  },
  bottlingDate: {
    type: String,
    required: true,
  },
  authentic: {
    type: Boolean,
    default: true,
  },
  scans: [
    {
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

// Index for faster ID lookups
bottleSchema.index({ id: 1 });

module.exports = mongoose.model('Bottle', bottleSchema);