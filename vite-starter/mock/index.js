const MockJs = require("mockjs");
const userList = MockJs.mock({
  "userList|100": [
    {
      "id|+1": 1,
      name: "@cname",
      brithday: "@brithday",
      email: "@email",
      avatar: "@image",
      capitalize: "@capitalize",
    },
  ],
});
module.exports = [
  {
    url: "/api/get",
    method: "get",
    response: ({ query }) => {
      console.log("query", query);
      return {
        code: 200,
        data: {
          name: "ymy",
        },
      };
    },
  },
  {
    method: "post",
    url: "/api/user",
    response: ({ body }) => {
      return {
        code: 200,
        message: "ok",
        object: userList,
      };
    },
  },
  // rawResponse: (req, res, next) => {
  //   // console.log("==>", req, res, next);
  //   let responseData = {
  //     code: 200,
  //     message: "ok",
  //     object: userList,
  //   };
  //   // res.setHeader("Content-Type", "application/json");
  //   res.end(JSON.stringify(responseData));
  // },
  // },
];
