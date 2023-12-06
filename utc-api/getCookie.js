const request = require("request");

module.exports.getCookie = (username, password, url) => {
  const formData = {
    txtUserName: username,
    txtPassword: password,
    btnSubmit: "%C4%90%C4%83ng+nh%E1%BA%ADp",
    __VIEWSTATE:
      "/wEPDwUKMTkwNDg4MTQ5MQ9kFgICAQ9kFgpmD2QWCgIBDw8WAh4EVGV4dAUuSOG7hiBUSOG7kE5HIFRIw5RORyBUSU4gVFLGr+G7nE5HIMSQ4bqgSSBI4buMQ2RkAgIPZBYCZg8PFgQfAAUNxJDEg25nIG5o4bqtcB4QQ2F1c2VzVmFsaWRhdGlvbmhkZAIDDxAPFgYeDURhdGFUZXh0RmllbGQFBmt5aGlldR4ORGF0YVZhbHVlRmllbGQFAklEHgtfIURhdGFCb3VuZGdkEBUBAlZOFQEgQUU1NjE5NjI2OUFGNDQ3NkI0MjIwNjdDOUI0MjQ1MDQUKwMBZxYBZmQCBA8PFgIeCEltYWdlVXJsBSgvQ01DU29mdC5JVS5XZWIuSW5mby9JbWFnZXMvVXNlckluZm8uZ2lmZGQCBQ9kFgYCAQ8PFgIfAAUGS2jDoWNoZGQCAw8PFgIfAGVkZAIHDw8WAh4HVmlzaWJsZWhkZAICD2QWBAIDDw9kFgIeBm9uYmx1cgUKbWQ1KHRoaXMpO2QCBw8PFgIfAAUhVMOqbiDEkcSDbmcgbmjhuq1wIGtow7RuZyDEkcO6bmchZGQCBA8PFgIfBmhkZAIGDw8WAh8GaGQWBgIBDw9kFgIfBwUKbWQ1KHRoaXMpO2QCBQ8PZBYCHwcFCm1kNSh0aGlzKTtkAgkPD2QWAh8HBQptZDUodGhpcyk7ZAILD2QWCGYPDxYCHwAFCUVtcHR5RGF0YWRkAgEPZBYCZg8PFgIfAWhkZAICD2QWAmYPDxYEHwAFDcSQxINuZyBuaOG6rXAfAWhkZAIDDw8WAh8ABbYFPGEgaHJlZj0iIyIgb25jbGljaz0iamF2YXNjcmlwdDp3aW5kb3cucHJpbnQoKSI+PGRpdiBzdHlsZT0iRkxPQVQ6bGVmdCI+CTxpbWcgc3JjPSIvQ01DU29mdC5JVS5XZWIuSW5mby9pbWFnZXMvcHJpbnQucG5nIiBib3JkZXI9IjAiPjwvZGl2PjxkaXYgc3R5bGU9IkZMT0FUOmxlZnQ7UEFERElORy1UT1A6NnB4Ij5JbiB0cmFuZyBuw6B5PC9kaXY+PC9hPjxhIGhyZWY9Im1haWx0bzo/c3ViamVjdD1IZSB0aG9uZyB0aG9uZyB0aW4gSVUmYW1wO2JvZHk9aHR0cHM6Ly9xbGR0LnV0Yy5lZHUudm4vQ01DU29mdC5JVS5XZWIuaW5mby9sb2dpbi5hc3B4Ij48ZGl2IHN0eWxlPSJGTE9BVDpsZWZ0Ij48aW1nIHNyYz0iL0NNQ1NvZnQuSVUuV2ViLkluZm8vaW1hZ2VzL3NlbmRlbWFpbC5wbmciICBib3JkZXI9IjAiPjwvZGl2PjxkaXYgc3R5bGU9IkZMT0FUOmxlZnQ7UEFERElORy1UT1A6NnB4Ij5H4butaSBlbWFpbCB0cmFuZyBuw6B5PC9kaXY+PC9hPjxhIGhyZWY9IiMiIG9uY2xpY2s9ImphdmFzY3JpcHQ6YWRkZmF2KCkiPjxkaXYgc3R5bGU9IkZMT0FUOmxlZnQiPjxpbWcgc3JjPSIvQ01DU29mdC5JVS5XZWIuSW5mby9pbWFnZXMvYWRkdG9mYXZvcml0ZXMucG5nIiAgYm9yZGVyPSIwIj48L2Rpdj48ZGl2IHN0eWxlPSJGTE9BVDpsZWZ0O1BBRERJTkctVE9QOjZweCI+VGjDqm0gdsOgbyDGsGEgdGjDrWNoPC9kaXY+PC9hPmRkZMCp3NSpwFQ4NmBLMIvyyOR8rwSdDjNLu5l/pHJdXPNY",
    __EVENTVALIDATION:
      "/wEdAA+kpbr6gYJZ1Je2YFK6mtvqb8csnTIorMPSfpUKU79Fa8zr1tijm/dVbgMI0MJ/5MgoRSoZPLBHamO4n2xGfGAWHW/isUyw6w8trNAGHDe5T/w2lIs9E7eeV2CwsZKam8yG9tEt/TDyJa1fzAdIcnRuY3plgk0YBAefRz3MyBlTcHY2+Mc6SrnAqio3oCKbxYY85pbWlDO2hADfoPXD/5tdAxTm4XTnH1XBeB1RAJ3owlx3skko0mmpwNmsvoT+s7J0y/1mTDOpNgKEQo+otMEzMS21+fhYdbX7HjGORawQMqpdNpKktwtkFUYS71DzGv5+qeq1CaqBdvaThOQ46zOoI/0KJ0oetkjnGX99c/EGmA==",
  };

  const options = {
    url: `${url}`,
    method: "POST",
    headers: {},
    formData,
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error && response.headers["set-cookie"] !== undefined) {
        const cookie = response.headers["set-cookie"].toString().split(";")[0];
        resolve(cookie);
      } else {
        console.log(response.headers["set-cookie"]);
        reject({ status: 404, body: "Wrong username or password" });
      }
    });
  });
};
