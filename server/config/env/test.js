'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/jackblog-test'
  },
  // Server port
  port:    process.env.PORT || 8080,
  seedDB: true
};