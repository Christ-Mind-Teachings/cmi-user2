/*
 * Request body:
 * {
 *   from: "email address",
 *     to: "comma separated list of email addresses"
 * }
 */
function parseRequestForSend(request) {
  var parms = {message: []};

  parms.error = false;

  //if no parms given set error indicator and return
  if (request.body === null || typeof request.body === "undefined") {
    parms.message.push("request body missing");
    parms.error = true;
    return parms;
  }

  var userRequest = request.body;

  if (!userRequest.senderName) {
    parms.message.push("Error: 'senderName' not specified");
  }
  else {
    parms.senderName = userRequest.senderName;
  }

  if (!userRequest.senderEmail) {
    parms.message.push("Error: 'senderEmail' not specified");
  }
  else {
    parms.senderEmail = userRequest.senderEmail;
  }

  if (!userRequest.to) {
    parms.message.push("Error: 'to' not specified");
  }
  else {
    parms.to = userRequest.to;
  }

  if (!userRequest.quote) {
    parms.message.push("Error: 'quote' not specified");
  }
  else {
    parms.quote = userRequest.quote;
  }

  if (!userRequest.citation) {
    parms.message.push("Error: 'citation' not specified");
  }
  else {
    parms.citation = userRequest.citation;
  }

  if (!userRequest.url) {
    parms.message.push("Error: 'url' not specified");
  }
  else {
    parms.url = userRequest.url;
  }

  if (!userRequest.sid) {
    parms.message.push("Error: 'sid' not specified");
  }
  else {
    parms.sid = userRequest.sid;
  }

  if (userRequest.message) {
    parms.msg = userRequest.message;
  }

  if (parms.message.length > 0) {
    parms.error = true;
  }

  return parms;
}

/*
 * parse request for ACOL Access Request
 * Expect:
 *  senderName
 *  senderEmail
 *  to
 */
function parseRequestForACOL(request) {
  var parms = {message: []};

  parms.error = false;

  //if no parms given set error indicator and return
  if (request.body === null || typeof request.body === "undefined") {
    parms.message.push("request body missing");
    parms.error = true;
    return parms;
  }

  var userRequest = request.body;

  if (!userRequest.senderName) {
    parms.message.push("Error: 'senderName' not specified");
  }
  else {
    parms.senderName = userRequest.senderName;
  }

  if (!userRequest.senderEmail) {
    parms.message.push("Error: 'senderEmail' not specified");
  }
  else {
    parms.senderEmail = userRequest.senderEmail;
  }

  if (!userRequest.to) {
    parms.message.push("Error: 'to' not specified");
  }
  else {
    parms.to = userRequest.to;
  }

  if (!userRequest.newsletter) {
    parms.newsletter = false;
  }
  else if (userRequest.newsletter === "on") {
    parms.newsletter = true;
  }
  else {
    parms.newsletter = false;
  }

  if (parms.message.length > 0) {
    parms.error = true;
  }

  return parms;
}

function parseForVerify(request) {
  var parms = {message: []};

  parms.error = false;

  //if no parms given set error indicator and return
  if (request.body === null || typeof request.body === "undefined") {
    parms.message.push("request body missing");
    parms.error = true;
    return parms;
  }

  var userRequest = request.body;

  if (!userRequest.to) {
    parms.message.push("Error: 'to' not specified");
  }
  else {
    parms.to = userRequest.to;
  }

  if (parms.message.length > 0) {
    parms.error = true;
  }

  return parms;
}

module.exports = {
  parseForSend: parseRequestForSend,
  parseForAccess: parseRequestForACOL,
  parseForVerify: parseForVerify
};

