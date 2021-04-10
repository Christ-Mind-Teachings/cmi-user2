/*eslint no-console: "warn"*/

/*
 * User
 *
 */
const AWS = require("aws-sdk");
const md5 = require("md5");

let dbInitialized = false;
let db;

function initDB(dev = false, endpoint = "local") {

  // --------- DEVELOPMENT ONLY ------------------
  if (dev) {
    var local = "http://localhost:8000";
    var remote = "https://dynamodb.us-east-1.amazonaws.com";

    var awsConfig = {
      region: "us-east-1"
    };

    if (endpoint === "remote") {
      awsConfig.endpoint = remote;
    }
    else {
      awsConfig.endpoint = local;
    }

    AWS.config.update(awsConfig);
  }
  // --------- DEVELOPMENT ONLY ------------------

  if (!dbInitialized) {
    db = new AWS.DynamoDB.DocumentClient();
    dbInitialized = true;
  }
}

//--------------- Profile ---------------------

/*
 * Format paraKey so it contains 3 decimal positions
 */
function formatKey(key) {
  let decimalPos = key.indexOf(".");

  //invalid key, but return it anyway.
  if (decimalPos === -1) {
    return `${key}.001`;
  }

  let intPart = key.substr(0, decimalPos);
  let decimalPart = key.substr(decimalPos + 1);
  let padding = decimalPart.length === 2 ? "0" : decimalPart.length === 1 ? "00" : "";

  return `${intPart}.${decimalPart}${padding}`;
}

/*
 * Get profile for user
 */
function getProfile(userId) {
  return new Promise((resolve, reject) => {

    //query parms
    let getParams = {
      TableName: "cmiUser",
      Key: {
        "userId": userId,
        "itemId": "profile"
      }
    };

    db.get(getParams, function(err, data) {
      err ? reject(err) : data.Item ? resolve(data.Item.profile) : resolve({});
    });
  });
}

function putProfile(userId, profile) {
  return new Promise((resolve, reject) => {

    let putParams = {
      TableName: "cmiUser",
      Item: {
        "userId": userId,
        "itemId": "profile",
        "profile": profile
      }
    };

    db.put(putParams, function(err) {
      if (err) {
        reject(err);
      }
      else {
        resolve("success");
      }
    });
  });
}

/*
 * Add share info to user profile 
 */
function addShare(profile, parms, type) {
  parms.shareDate = new Date().toString();

  parms.type = type;
  if (type === "quote") {
    delete parms.quote;
    delete parms.citation;
    delete parms.message;
    delete parms.error;
  }
  else {
    delete parms.message;
    delete parms.error;
  }

  if (!profile.shareHistory) {
    profile.shareHistory = [parms];
  }
  else {
    profile.shareHistory.push(parms);
  }

  return profile;
}


/*
 * Add login date to profile
 */
function addLogin(profile, userEvent) {
  let now = new Date().toString();

  if (userEvent.event === "signup") {
    profile.created = now;
  }

  if (userEvent.event === "login") {
    if (!profile.login) {
      profile.login = [now];
    }
    else {
      profile.login.push(now);
    }
  }

  if (!profile.name) {
    profile.name = userEvent.user.user_metadata.full_name;
    profile.email = userEvent.user.email;
  }

  return profile;
}

/*
 * Audit details from shared bookmark
 */
function auditShare(parms, type) {
  return new Promise((resolve, reject) => {

    parms.userId = md5(parms.senderEmail);

    getProfile(parms.userId).then((profile) => {
      profile = addShare(profile, parms, type);
      return putProfile(parms.userId, profile);
    }).then(() => {
      resolve("send and audit success");
    }).catch((err) => {
      reject(`send success but audit failed: ${err}`);
    });
  });
}

/*
 * Webhook called by Netflix when user signs
 * into site. We maintain log of sign ins.
 */
function auditLogin(userEvent) {
  return new Promise((resolve, reject) => {

    let userId = md5(userEvent.user.email);

    getProfile(userId).then((profile) => {
      profile = addLogin(profile, userEvent);
      return putProfile(userId, profile);
    }).then(() => {
      resolve("success");
    }).catch((err) => {
      reject(err);
    });
  });
}

//--------------- Mail List ---------------------

/*
 * Get maillist, return empty array if not present
 */
function getMailList(userId) {
  return new Promise((resolve, reject) => {

    //query parms
    let getParams = {
      TableName: "cmiUser",
      Key: {
        "userId": userId,
        "itemId": "mailList"
      }
    };

    db.get(getParams, function(err, data) {
      err ? reject(err) : data.Item ? resolve(data.Item.mailList) : resolve([]);
    });
  });
}

function putMailList(userId, mailList) {
  return new Promise((resolve, reject) => {

    let putParams = {
      TableName: "cmiUser",
      Item: {
        "userId": userId,
        "itemId": "mailList",
        "mailList": mailList
      }
    };

    db.put(putParams, function(err) {
      if (err) {
        reject(err);
      }
      else {
        resolve("success");
      }
    });
  });
}

/*
 * Remove entry for address from MailList
 */
function deleteAddress(userId, address) {
  return new Promise((resolve, reject) => {

    getMailList(userId).then((response) => {
      if (response.length > 0) {
        let newList = response.filter((i) => i.address != address);
        
        if (newList.length === response.length) {
          resolve(`Address "${address}" not found in mailList.`);
          return;
        }
        putMailList(userId, newList).then((resp) => {
          resolve(resp);
          return;
        }).catch((err) => {
          reject(err);
          return;
        });
      }
      else {
        resolve("MailList has no entries.");
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

function deleteMailList(userId) {
  return new Promise((resolve, reject) => {

    let deleteParams = {
      TableName: "cmiUser",
      Key: {
        "userId": userId,
        "itemId": "mailList"
      }
    };

    db.delete(deleteParams, function(err) {
      if (err) {
        reject(err.message);
      }
      else {
        resolve("deleted");
      }
    });
  });
}

//--------------- Topics ---------------------

/*
 * Get topic list: The topic list is source specific.
 */
function getTopicList(userId, sourceId) {
  return new Promise((resolve, reject) => {

    let getParams = {
      TableName: "cmiUser",
      Key: {
        "userId": userId,
        "itemId": `t:${sourceId}`
      }
    };

    db.get(getParams, function(err, data) {
      err ? reject(err) : data.Item ? resolve(data.Item.topics) : resolve([]);
    });
  });
}

function putTopicList(userId, sourceId, topicList) {
  return new Promise((resolve, reject) => {

    let putParams = {
      TableName: "cmiUser",
      Item: {
        "userId": userId,
        "itemId": `t:${sourceId}`,
        "topics": topicList
      }
    };

    db.put(putParams, function(err) {
      if (err) {
        reject(err);
      }
      else {
        resolve("success");
      }
    });
  });
}

/*
 * Remove topic from topicList for user and source
 */
function deleteTopic(userId, sourceId, value) {
  return new Promise((resolve, reject) => {

    getTopicList(userId, sourceId).then((response) => {
      if (response.length > 0) {
        let newList = response.filter((i) => i.value != value);
        
        if (newList.length === response.length) {
          resolve(`Topic "${value}" not found in topicList.`);
          return;
        }
        putTopicList(userId, sourceId, newList).then((resp) => {
          resolve(resp);
          return;
        }).catch((err) => {
          reject(err);
          return;
        });
      }
      else {
        resolve("TopicList has no topics.");
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

function deleteTopicList(userId, sourceId) {
  return new Promise((resolve, reject) => {

    let deleteParams = {
      TableName: "cmiUser",
      Key: {
        "userId": userId,
        "itemId": `t:${sourceId}`
      }
    };

    db.delete(deleteParams, function(err) {
      if (err) {
        reject(err.message);
      }
      else {
        resolve("deleted");
      }
    });
  });
}

//--------------- Quotes ---------------------

/*
 * insert or update quote
 *
 */
function putQuote(userId, paraKey, creationDate, quote) {
  return new Promise((resolve, reject) => {

    let putParams = {
      TableName: "cmiUser",
      Item: {
        "userId": userId,
        "itemId": `q:${formatKey(paraKey)}:${creationDate}`,
        "q": {
          "pid": quote.pid,
          "quote": quote.quote,
          "citation": quote.citation,
          "url": quote.url
        }
      }
    };

    db.put(putParams, function(err) {
      if (err) {
        reject(err);
      }
      else {
        resolve("success");
      }
    });
  });
}

/*
 * Format the url with query string to take user directly
 * to quote when clicked.
 */
function formatResult(q) {
  let [,, aid] = q.itemId.split(":");
  return {
    quote: q.q.quote,
    citation: q.q.citation,
    url: `${q.q.url}?as=${q.q.pid}:${aid}:${q.userId}`
  };
}

/*
 * Get quote by userId and itemId. Adds 'q:' to itemId
 * because that's how its stored in the db.
 *
 * Returns quote only, no userId, itemId
 */
function getQuote(userId, paraKey, creationDate) {
  return new Promise((resolve, reject) => {

    let getParams = {
      TableName: "cmiUser",
      Key: {
        "userId": userId,
        "itemId": `q:${formatKey(paraKey)}:${creationDate}`
      }
    };

    db.get(getParams, function(err, data) {
      if (err) {
        reject(err.message);
      }
      else {
        if (data.Item) {
          let quote = formatResult(data.Item); 
          resolve(quote);
          return;
        }
        else {
          resolve({});
          return;
        }
      }
    });
  });
}

/* get quote data by userId and quoteId
 * - return data in database w/o modification
 *   but it does remove the 'q:' from itemId
 */
function getQuoteData(userId, paraKey, creationDate) {
  return new Promise((resolve, reject) => {

    //query parms
    let getParams = {
      TableName: "cmiUser",
      Key: {
        "userId": userId,
        "itemId": `q:${formatKey(paraKey)}:${creationDate}`
      }
    };

    db.get(getParams, function(err, data) {
      if (err) {
        reject(err.message);
      }
      else {
        if (data.Item) {
          //remove the 'q:' leading characters of the itemId
          let [, paraKey, creationDate] = data.Item.itemId.split(":");
          data.Item.paraKey = paraKey;
          data.Item.creationDate = creationDate;
          delete data.Item.itemId;
          resolve(data.Item);
        }
        else {
          resolve({});
        }
      }
    });
  });
}

/*
 * Get itemId for all quotes with itemId that beins with key and
 * remove the 'q:' from itemId
 */
function getQuoteIds(userId, key) {
  return new Promise((resolve, reject) => {

    //query parms
    let queryParams = {
      TableName: "cmiUser",
      ProjectionExpression: "itemId",
      KeyConditionExpression: "userId = :address AND begins_with ( itemId, :sid )",
      ExpressionAttributeValues: {
        ":address": userId,
        ":sid": `q:${key}`
      }
    };

    db.query(queryParams, function(err, data) {
      if (err) {
        reject(err);
      }
      else {
        if (data.Items) {
          //remove the 'q:' starting chars of the itemId
          let keyArray = data.Items.map(i => i.itemId.substring(2));
          resolve(keyArray);
        }
        else {
          resolve([]);
        }
      }
    });
  });
}

function deleteQuote(userId, paraKey, creationDate) {
  return new Promise((resolve, reject) => {

    let deleteParams = {
      TableName: "cmiUser",
      Key: {
        "userId": userId,
        "itemId": `q:${formatKey(paraKey)}:${creationDate}`
      }
    };

    db.delete(deleteParams, function(err) {
      if (err) {
        reject(err.message);
      }
      else {
        resolve("deleted");
      }
    });
  });
}

//---------------- Annotations ---------------------

/*
 * Create or update annotation
 *
 * If the eannotation has a creationDate then an update is requested.
 * Update the bookmark if not a duplicate.
 *
 * args:
 *  userId: md5(email address)
 *  parakey: pageKey + paragraphKey
 *  annotation: An object containing 'Comment' and topicArray
 *
 */
function putAnnotation(userId, paraKey, creationDate, annotation) {
  return new Promise((resolve, reject) => {

    let putParams = {
      TableName: "cmiUser",
      Item: {
        "userId": userId,
        "itemId": `b:${formatKey(paraKey)}:${creationDate}`,
        "annotation": annotation
      }
    };

    db.put(putParams, function(err) {
      if (err) {
        reject(err);
      }
      else {
        resolve("success");
      }
    });
  });
}

/* get annotation by userId, paraKey and creationDate
 *   remove the 'b:' from itemId and separate into paraKey and creationDate
 */
function getAnnotation(userId, paraKey, creationDate) {
  return new Promise((resolve, reject) => {

    //query parms
    let getParams = {
      TableName: "cmiUser",
      Key: {
        "userId": userId,
        "itemId": `b:${formatKey(paraKey)}:${creationDate}`
      }
    };

    db.get(getParams, function(err, data) {
      if (err) {
        reject(err);
      }
      else {
        if (data.Item) {
          data.Item.itemId = data.Item.itemId.substring(2);
          let [paraKey, creationDate] = data.Item.itemId.split(":");
          resolve({
            userId: data.Item.userId,
            paraKey: paraKey,
            creationDate: creationDate,
            annotation: data.Item.annotation
          });
        }
        else {
          resolve({});
        }
      }
    });
  });
}

/*
 * Get all bookmarks for the specified user and key.
 *
 * args:
 *  userId: md5 of email address
 *  key: can specify a complete or partial pageKey but must specify
 *      the sourceId at the minimum (2 digits)
 *  topic: optional, when given results are filtered to those containing
 *      the specified topic
 */
function getAnnotationsByKey(userId, key, topic, summariesOnly=false) {
  return new Promise((resolve, reject) => {

    //query parms
    let queryParams = {
      "TableName": "cmiUser",
      "KeyConditionExpression": "#DYNOBASE_userId = :pkey and begins_with(#DYNOBASE_itemId, :skey)",
      "ExpressionAttributeValues": {
        ":pkey": userId,
        ":skey": `b:${key}`
      },
      "ExpressionAttributeNames": {
        "#DYNOBASE_userId": "userId",
        "#DYNOBASE_itemId": "itemId"
      }
    };

    db.query(queryParams, function(err, data) {
      if (err) {
        reject(err);
      }
      else {
        if (data.Items) {
          let results = data.Items.map((i) => {
            let [, paraKey, creationDate] = i.itemId.split(":");
            delete i.itemId;
            i.paraKey = paraKey;
            i.creationDate = creationDate;
            return i;
          });
          if (typeof topic !== "undefined") {
            // console.log("topic: %s", topic);

            results = results.filter((i) => {
              if (!i.annotation.topicList) {
                return false;
              }
              let found = i.annotation.topicList.find(t => t.value === topic);
              if (found) {
                if (summariesOnly) {
                  return typeof found.summary !== "undefined";
                }
                return true;
              }
              return false;
            });
          }

          resolve(results);
        }
        else {
          resolve([]);
        }
      }
    });
  });
}

function deleteAnnotation(userId, paraKey, creationDate) {
  return new Promise((resolve, reject) => {

    let deleteParams = {
      TableName: "cmiUser",
      Key: {
        "userId": userId,
        "itemId": `b:${formatKey(paraKey)}:${creationDate}`
      }
    };

    db.delete(deleteParams, function(err) {
      if (err) {
        reject(err);
      }
      else {
        resolve("deleted");
      }
    });
  });
}

module.exports = {
  initialize: function(dev, endpoint) {
    initDB(dev, endpoint);
  },
  getProfile: getProfile,
  putProfile: putProfile,
  getMailList: getMailList,
  putMailList: putMailList,
  deleteMailList: deleteMailList,
  deleteAddress: deleteAddress,
  getTopicList: getTopicList,
  putTopicList: putTopicList,
  deleteTopicList: deleteTopicList,
  deleteTopic: deleteTopic,
  putQuote: putQuote,
  getQuote: getQuote,
  getQuoteData: getQuoteData,
  getQuoteIds: getQuoteIds,
  deleteQuote: deleteQuote, 
  putAnnotation: putAnnotation,
  getAnnotation: getAnnotation,
  getAnnotationsByKey: getAnnotationsByKey,
  deleteAnnotation: deleteAnnotation,
  auditLogin: auditLogin,
  auditShare: auditShare
};

