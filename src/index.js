/*
 *    *get /profile/{uid}
 *   *post /profile
 *
 *    *get /mailList/{uid}
 *   *post /mailList
 * *delete /mailList/{uid}
 * *delete /mailListAddress/{uid}/{address}
 *
 *   *post /topicList
 *    *get /topicList/{uid}/{sid}
 * *delete /topicList/{uid}/{sid}
 * *delete /topic/{uid}/{sid}/{value}
 *
 *   *post /quote
 *    *get /quote/{uid}/{qid}
 *  delete /quote/{uid}/{qid}
 *    *get /quoteData/{uid}/{itemId}
 *     get /quoteKeys/{uid}/{key}
 *
 *   post /annotation
 *    get /annotation/{uid}/{paraKey}/{creationDate}
 * delete /annotation/{uid}/{paraKey}/{creationDate}
 *    get /queryAnnotation/{uid}/{key}
 *    get /queryAnnotationsByTopic/{uid}/{key}/{topic}
 *    get /queryAnnotationsByTopic/{uid}/{key}/{topic}
 *    get /querySummariesByTopic/{uid}/{key}/{topic}
 *
 *   post /searchResult
 *    get /searchResults/{uid}/{sid}
 *    get /searchResult/{uid}/{sid}/{uniqueId}
 *    get /searchResultsList/{uid}/{sid}
 *
 *   post /send
 *   post /notify
 *
 *eslint no-console: "warn"
 */

var ApiBuilder = require("claudia-api-builder");
var api = new ApiBuilder();
var db = require("./module/user");

module.exports = api;

api.post("/request", function(request) {
  return request;
});

//------------- Profile ----------------------

/*
 * Get user profile
 */
api.get("/profile/{uid}", function(request) {
  let userId = request.pathParams.uid;

  var result = {
    message: "ok"
  };

  db.initialize(false);

  return db.getProfile(userId)
    .then((response) => {
      result.profile = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * Create or update user profile
 *
 * body: userId
 *       profile{}
 */
api.post("/profile", function(request) {
  var handleRequest = require("./module/handleRequest");

  var parms = handleRequest.parse("profile", request);

  var result = {
    message: "OK"
  };

  if (parms.error) {
    result.message = parms.message;
    return result;
  }

  db.initialize(false);

  return db.putProfile(parms.userId, parms.profile)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

//------------- Mail List ----------------------

/*
 * Get user mailList
 */
api.get("/mailList/{uid}", function(request) {
  let userId = request.pathParams.uid;

  var result = {
    message: "ok"
  };

  db.initialize(false);

  return db.getMailList(userId)
    .then((response) => {
      result.mailList = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * Create or update user mailList
 *
 * body: userId
 *       mailLiist[]
 */
api.post("/mailList", function(request) {
  var handleRequest = require("./module/handleRequest");

  var parms = handleRequest.parse("mailList", request);

  var result = {
    message: "OK"
  };

  if (parms.error) {
    result.message = parms.message;
    return result;
  }

  db.initialize(false);

  return db.putMailList(parms.userId, parms.mailList)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * Delete mailList for user
 */
api.delete("/mailList/{uid}", function(request) {
  let userId = request.pathParams.uid;

  var result = {
    message: "ok"
  };

  db.initialize(false);

  return db.deleteMailList(userId)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * Delete email address from user mailList
 *  "address" is the email address to delete
 */
api.delete("/mailListAddress/{uid}/{address}", function(request) {
  let userId = request.pathParams.uid;
  let address = request.pathParams.address;

  var result = {
    message: "ok"
  };

  db.initialize(false);

  return db.deleteAddress(userId, address)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

//------------- Topics ----------------------

/*
 * Get user topicList for sourceId (sid)
 */
api.get("/topicList/{uid}/{sid}", function(request) {
  let userId = request.pathParams.uid;
  let sourceId = request.pathParams.sid;

  var result = {
    message: "ok"
  };

  db.initialize(false);

  return db.getTopicList(userId, sourceId)
    .then((response) => {
      result.topics = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * Create or update user topicList
 *
 * body: userId
 *       sourceId (sid)
 *       topicList[]
 */
api.post("/topicList", function(request) {
  var handleRequest = require("./module/handleRequest");

  var parms = handleRequest.parse("topicList", request);

  var result = {
    message: "OK"
  };

  if (parms.error) {
    result.message = parms.message;
    return result;
  }

  db.initialize(false);

  return db.putTopicList(parms.userId, parms.sourceId, parms.topicList)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * Delete topicList for user and sourceId (sid)
 */
api.delete("/topicList/{uid}/{sid}", function(request) {
  let userId = request.pathParams.uid;
  let sourceId = request.pathParams.sid;

  var result = {
    message: "ok"
  };

  db.initialize(false);

  return db.deleteTopicList(userId, sourceId)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * Delete topic for user, sourceId, and value
 *  "value" is the topic value attribute
 */
api.delete("/topic/{uid}/{sid}/{value}", function(request) {
  let userId = request.pathParams.uid;
  let sourceId = request.pathParams.sid;
  let value = request.pathParams.value;

  var result = {
    message: "ok"
  };

  db.initialize(false);

  return db.deleteTopic(userId, sourceId, value)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

//------------- Quotes ----------------------

/*
 * Create or update user quote
 *
 * body: userId
 *       itemId (paraKey:creationDate)
 *       quote {pid, quote, citation, url}
 */
api.post("/quote", function(request) {
  var handleRequest = require("./module/handleRequest");

  var parms = handleRequest.parse("quote", request);

  var result = {
    message: "OK"
  };

  if (parms.error) {
    result.message = parms.message;
    return result;
  }

  db.initialize(false);

  return db.putQuote(parms.userId, parms.paraKey, parms.creationDate, parms.quote)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * Get quote for userId and quoteId
 *  where quoteId: parakey:creationDate
 */
api.get("/quote/{uid}/{paraKey}/{creationDate}", function(request) {
  let userId = request.pathParams.uid;
  let paraKey = request.pathParams.paraKey;
  let creationDate = request.pathParams.creationDate;

  var result = {
    message: "ok"
  };

  db.initialize(false);

  return db.getQuote(userId, paraKey, creationDate)
    .then((response) => {
      result.quote = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * Get quote data by 
 *  userId: md5 hash of user email address
 *  itemId: compound key '<page key>:<annotationId>'
 *
 *  Returns data from database without modification.
 */
api.get("/quoteData/{uid}/{paraKey}/{creationDate}", function(request) {
  let userId = request.pathParams.uid;
  let paraKey = request.pathParams.paraKey;
  let creationDate = request.pathParams.creationDate;

  var result = {
    message: "OK"
  };

  db.initialize(false);

  return db.getQuoteData(userId, paraKey, creationDate)
    .then((response) => {
      result.quote = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

//get quoteIds for userId that begin with key
api.get("/quoteKeys/{uid}/{key}", function(request) {
  let userId = request.pathParams.uid;
  let key = request.pathParams.key;

  var result = {
    message: "OK"
  };

  db.initialize(false);

  return db.getQuoteIds(userId, key)
    .then((response) => {
      result.keys = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

//delete quote
api.delete("/quote/{uid}/{paraKey}/{creationDate}", function(request) {
  let userId = request.pathParams.uid;
  let paraKey = request.pathParams.paraKey;
  let creationDate = request.pathParams.creationDate;

  var result = {
    message: "OK"
  };

  db.initialize(false);

  return db.deleteQuote(userId, paraKey, creationDate)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

//------------- Annotations ----------------------

/*
 * Create or update user annotation
 *
 * body: userId
 *       paraKey 
 *       creationDate
 *       annotation
 */
api.post("/annotation", function(request) {
  var handleRequest = require("./module/handleRequest");

  var parms = handleRequest.parse("annotation", request);

  var result = {
    message: "OK"
  };

  if (parms.error) {
    result.message = parms.message;
    return result;
  }

  db.initialize(false);

  return db.putAnnotation(parms.userId, parms.paraKey, parms.creationDate, parms.annotation)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * Get Annotation
 */
api.get("/annotation/{uid}/{paraKey}/{creationDate}", function(request) {
  let userId = request.pathParams.uid;
  let paraKey = request.pathParams.paraKey;
  let creationDate = request.pathParams.creationDate;

  var result = {
    message: "OK"
  };

  db.initialize(false);

  return db.getAnnotation(userId, paraKey, creationDate)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * query annotations by complete or partial pageKey. This can query
 * bookmarks by page, book, or source
 *
 */
api.get("/queryAnnotation/{uid}/{key}", function(request) {
  let userId = request.pathParams.uid;
  let queryKey = request.pathParams.key;

  var result = {
    message: "OK"
  };

  db.initialize(false);

  return db.getAnnotationsByKey(userId, queryKey)
    .then((response) => {
      result.response = response.results;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * query annotations by complete or partial pageKey. This can query
 * bookmarks by page, book, or source. 
 *
 * Return only annotations containing the topic
 */
api.get("/queryAnnotationsByTopic/{uid}/{key}/{topic}", function(request) {
  let userId = request.pathParams.uid;
  let queryKey = request.pathParams.key;
  let topic = request.pathParams.topic;

  var result = {
    message: "OK"
  };

  db.initialize(false);

  return db.getAnnotationsByKey(userId, queryKey, topic)
    .then((response) => {
      result.response = response.results;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * query annotation summaries by complete or partial pageKey. This can query
 * bookmarks by page, book, or source. 
 *
 * Return only annotations containing the topic with summary
 */
api.get("/querySummariesByTopic/{uid}/{key}/{topic}", function(request) {
  let userId = request.pathParams.uid;
  let queryKey = request.pathParams.key;
  let topic = request.pathParams.topic;

  var result = {
    message: "OK"
  };

  db.initialize(false);

  // filter by topics with summaries
  return db.getAnnotationsByKey(userId, queryKey, topic, true)
    .then((response) => {
      if (response.topicTotal) {
        result.topicTotal = response.topicTotal;
      }
      result.response = response.results;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * Delete annotation
 */
api.delete("/annotation/{uid}/{paraKey}/{creationDate}", function(request) {
  let userId = request.pathParams.uid;
  let paraKey = request.pathParams.paraKey;
  let creationDate = request.pathParams.creationDate;

  var result = {
    message: "OK"
  };

  db.initialize(false);

  return db.deleteAnnotation(userId, paraKey, creationDate)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

//share a bookmark via email
api.post("/share", function(request) {
  var send = require("./module/cmi/send");
  var userrequest = require("./module/cmi/request");

  var parms = userrequest.parseForSend(request);
  if (parms.error) {
    return parms;
  }

  db.initialize(false);

  return send.share(parms).then(() => {
    return db.auditShare(parms, "quote");
  });
});

//request full ACOL access
api.post("/acol/access", function(request) {
  var send = require("./module/cmi/send");
  var userrequest = require("./module/cmi/request");

  var parms = userrequest.parseForAccess(request);
  if (parms.error) {
    return parms;
  }

  db.initialize(false);

  return send.accessRequest(parms).then(() => {
    return db.auditShare(parms, "acol");
  });
});

/* ---------- Search --------------------
 *
/*
 * Create or update user saved searches
 *
 * body: userId
 *       sid
 *       searchResult
 */
api.post("/searchResult", function(request) {
  var handleRequest = require("./module/handleRequest");

  var parms = handleRequest.parse("search", request);

  var result = {
    message: "OK"
  };

  if (parms.error) {
    result.message = parms.message;
    return result;
  }

  db.initialize(false);

  return db.putSearchResult(parms.userId, parms.sid, parms.searchResult)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});

/*
 * Get saved searches for user and sid
 */
api.get("/searchResults/{uid}/{sid}", function(request) {
  let userId = request.pathParams.uid;
  let sid = request.pathParams.sid;

  var result = {
    message: "OK"
  };

  db.initialize(false);

  return db.getSearchResults(userId, sid)
    .then((response) => {
      //console.log("get SearchResults response: %o", response);
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err;
      return result;
    });
});

/*
 * Get specific saved search for user, sid, and uniqueId
 */
api.get("/searchResult/{uid}/{sid}/{uniqueId}", function(request) {
  let userId = request.pathParams.uid;
  let sid = request.pathParams.sid;
  let uniqueId = request.pathParams.uniqueId;

  var result = {
    message: "OK"
  };

  db.initialize(false);

  return db.getSearchResult(userId, sid, uniqueId)
    .then((response) => {
      //console.log("get SearchResults response: %o", response);
      result.response = response;
      //console.log("get searchResult returning success: %o", result);
      return result;
    })
    .catch((err) => {
      result.message = err;
      //console.log("get searchResult returning error: %o", result);
      return result;
    });
});

/*
 * Get list of saved search results
 */
api.get("/searchResultsList/{uid}/{sid}", function(request) {
  let userId = request.pathParams.uid;
  let sid = request.pathParams.sid;

  var result = {
    message: "OK"
  };

  db.initialize(false);

  return db.getSearchResultsList(userId, sid)
    .then((response) => {
      //console.log("get SearchResults response: %o", response);
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err;
      return result;
    });
});

//------------- Netlify Identity Webhook ----------------------

/*
 * This is the Netlify Indentity Webhook endpoint. It audits user
 * login and signup events.
 */
api.post("/notify", function(request) {
  db.initialize(false);

  const userEvent = JSON.parse(request.rawBody);
  var result = {
    message: "OK"
  };

  return db.auditLogin(userEvent)
    .then((response) => {
      result.response = response;
      return result;
    })
    .catch((err) => {
      result.message = err.message;
      return result;
    });
});
