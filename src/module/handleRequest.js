function getAuditShareParms(parms, userRequest) {
  if (!userRequest.date) {
    parms.message.push("Error: body.date missing");
    parms.error = true;
  }
  else {
    parms.date = userRequest.date;
  }
  
  if (!userRequest.share) {
    parms.message.push("Error: body.share missing");
    parms.error = true;
  }
  else {
    parms.share = userRequest.share;
  }
  
  if (!parms.share.itemId) {
    parms.message.push("Error: body.share.itemId missing");
    parms.error = true;
  }
  
  if (!parms.share.recipientList) {
    parms.message.push("Error: body.share.recipientList missing");
    parms.error = true;
  }

  return parms;
}

function getProfileParms(parms, userRequest) {

  //user info
  if (!userRequest.profile) {
    parms.message.push("Error: body.profile missing");
    parms.error = true;
  }
  else {
    parms.profile = userRequest.profile;
  }

  return parms;
}

/*
 * Required parms:
 *  userId
 *  parakey
 *  creationDate
 *  annotation
 */
function getAnnotationParms(parms, userRequest) {

  //paragraph containing annotation
  if (!userRequest.paraKey) {
    parms.message.push("Error: body.paraKey missing");
    parms.error = true;
  }
  else {
    parms.paraKey = userRequest.paraKey;
  }

  //paragraph containing annotation
  if (!userRequest.creationDate) {
    parms.message.push("Error: body.creationDate missing");
    parms.error = true;
  }
  else {
    parms.creationDate = userRequest.creationDate;
  }

  //The annotation
  if (!userRequest.annotation) {
    parms.message.push("Error: body.annotation missing");
    parms.error = true;
  }
  else {
    parms.annotation = userRequest.annotation;
  }

  return parms;
}

/*
 * Required parms:
 *  userId: verified by calling function
 *  paraKey: pageKey including paragraph
 *  creationDate: creationDate of quote bookmark
 *  quote: {pid, quote, citation, url}
 */
function getQuoteParms(parms, userRequest) {

  if (!userRequest.paraKey) {
    parms.message.push("Error: body.paraKey missing");
    parms.error = true;
  }
  else {
    parms.paraKey = userRequest.paraKey;
  }

  if (!userRequest.creationDate) {
    parms.message.push("Error: body.creationDate missing");
    parms.error = true;
  }
  else {
    parms.creationDate = userRequest.creationDate;
  }

  //query source
  if (!userRequest.quote) {
    parms.message.push("Error: body.quote missing");
    parms.error = true;
  }
  else {
    parms.quote = userRequest.quote;
  }

  return parms;
}

function getUserTopicsParms(parms, userRequest) {

  //source Id: a 2 digit string
  if (!userRequest.sourceId) {
    parms.message.push("Error: body.sourceId missing");
    parms.error = true;
  }
  else {
    parms.sourceId = userRequest.sourceId;
  }

  //topicList: array of one or more topics
  // - can be either a "string" or an object {value: "string", topic: "string"}
  if (!userRequest.topicList) {
    parms.message.push("Error: body.topicList missing");
    parms.error = true;
  }
  else {
    parms.topicList = userRequest.topicList;
  }

  return parms;
}

/*
 * email address list
 * addressList: [{first,last,address}]
 */
function getUserAddressListParms(parms, userRequest) {

  //addressList: array of one or more email addresses
  // - {first: "string", last: "string", address: "string"}
  if (!userRequest.mailList) {
    parms.message.push("Error: body.mailList missing");
    parms.error = true;
  }
  else {
    parms.mailList = userRequest.mailList;
  }

  return parms;
}

function parseRequest(requestType, request) {
  var parms = {message: []};

  //if no parms given set error indicator and return
  if (request.body === null || typeof request.body === "undefined") {
    parms.message.push("request body missing");
    parms.error = true;
    return parms;
  }

  var userRequest = request.body;

  //md5 of email address
  //=> email address for searchAudit requestType
  if (!userRequest.userId) {
    parms.message.push("Error: body.userId missing");
  }
  else {
    parms.userId = userRequest.userId;
  }

  switch(requestType) {
    case "profile":
      parms = getProfileParms(parms, userRequest);
      break;
    case "topicList":
      parms = getUserTopicsParms(parms, userRequest);
      break;
    case "mailList":
      parms = getUserAddressListParms(parms, userRequest);
      break;
    case "quote":
      parms = getQuoteParms(parms, userRequest);
      break;
    case "annotation":
      parms = getAnnotationParms(parms, userRequest);
      break;
    case "share":
      parms = getAuditShareParms(parms, userRequest);
      break;
  }

  return parms;
}

module.exports = {
  parse: parseRequest
};

