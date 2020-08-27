const mailgunPrivateKey = {
  apiKey: "key-5d441d817e61642bedd485c2b2337deb",
  domain: "mg.christmind.info"
};

const mailgunPublicKey = {
  apiKey: "pubkey-5e67c21fc09a2655bab0004e0e3dca4c",
  domain: "mg.christmind.info"
};


module.exports = {
  initializeSend: function() {
    const mailgun = require("mailgun-js")(mailgunPrivateKey);
    return mailgun;
  },
  initializeVerify: function() {
    const mailgun = require("mailgun-js")(mailgunPublicKey);
    return mailgun;
  }
};

