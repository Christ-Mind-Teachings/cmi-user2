# cmi-user2

Defines the API to access all user related information for CMI. This includes bookmarks, quotes,
topicLists, profile, and mailList. All user data is stored in cmiUser dynamodb table and the API
defines endpoints to query, create, update, and delete related records.

The API is defined with claudia.js and uses AWS API Gateway and Lambda functions.

Note: This replaces cmi-user


