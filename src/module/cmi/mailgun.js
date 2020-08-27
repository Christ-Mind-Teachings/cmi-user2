module.exports = {
  initializeSend: function() {
    const mailgun = require("mailgun-js")({
      apiKey: process.env.mgPrivateKey,
      domain: process.env.domain
    });
    return mailgun;
  },
  initializeVerify: function() {
    const mailgun = require("mailgun-js")({
      apiKey: process.env.mgPublicKey,
      domain: process.env.domain
    });
    return mailgun;
  }
};

