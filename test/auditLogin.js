const user = require("../module/user");

user.initialize(true, "remote");

const login = {
  "event": "login",
  "instance_id": "fdb3dc30-d264-4c65-9e2c-274ce3a5dd3c",
  "user": {
      "id": "5e03320e-e418-43d6-afd3-e2741612e533",
      "aud": "",
      "role": "",
      "email": "rmercer33@gmail.com",
      "confirmed_at": "2019-02-09T11:47:15Z",
      "confirmation_sent_at": "2019-02-09T11:46:59Z",
      "app_metadata": {
          "provider": "email",
          "roles": [
              "acol"
          ]
      },
      "user_metadata": {
          "full_name": "Rick Mercer"
      },
      "created_at": "2019-02-09T11:46:59Z",
      "updated_at": "2019-02-09T11:46:59Z"
  }
};

user.auditLogin(login)
  .then((result) => {
    console.log("auditLogin: ", result);
  })
  .catch((err) => {
    console.error(`auditLogin error: ${err}`);
  });

