/*eslint no-console: "warn"*/

const mg = require("./mailgun");
const template = require("./template.js");
const template2 = require("./template2.js");
const ack = require("./ack.js");

const send = mg.initializeSend();
const verify = mg.initializeVerify();

var shareBody = {};

function verifyList(parms) {
  let emailList = parms.to.split(",");

  return new Promise((resolve, reject) => {
    verify.parse(emailList, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

function shareQuote(parms) {
  shareBody.from = `${parms.senderName} <${parms.senderEmail}>`;
  shareBody.to = parms.to;
  shareBody.subject = `${parms.senderName} shared a quote from the Library of Christ Mind Teachings`;
  shareBody["o:tag"] = [parms.sid];

  if (parms.msg) {
    shareBody.html = template2.generateEmail(parms.quote, parms.citation, parms.url, parms.msg);
  }
  else {
    shareBody.html = template.generateEmail(parms.quote, parms.citation, parms.url);
  }

  return new Promise((resolve, reject) => {
    send.messages().send(shareBody, (error, body) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(body);
    });
  });
}

function accessRequest(parms) {
  shareBody.from = `${parms.senderName} <${parms.senderEmail}>`;
  shareBody.to = parms.to;
  shareBody.subject = `${parms.senderName} requests ACOL access`;
  shareBody.html = ack.buildAccessRequest(parms.senderName, parms.senderEmail, parms.newsletter);

  return new Promise((resolve, reject) => {
    send.messages().send(shareBody, (error, body) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(body);
    });
  });
}

module.exports = {
  share: shareQuote,
  accessRequest: accessRequest,
  verify: verifyList
};

