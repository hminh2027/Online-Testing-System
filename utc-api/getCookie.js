const request = require("request");

module.exports.getCookie = (username, password, url) => {
  const formData = {
    txtUserName: username,
    txtPassword: password,
    btnSubmit: "%C4%90%C4%83ng+nh%E1%BA%ADp",
    __VIEWSTATE:
      "/wEPDwUKMTkwNDg4MTQ5MQ9kFgICAQ9kFgpmD2QWCgIBDw8WAh4EVGV4dAUuSOG7hiBUSOG7kE5HIFRIw5RORyBUSU4gVFLGr+G7nE5HIMSQ4bqgSSBI4buMQ2RkAgIPZBYCZg8PFgQfAAUNxJDEg25nIG5o4bqtcB4QQ2F1c2VzVmFsaWRhdGlvbmhkZAIDDxAPFgYeDURhdGFUZXh0RmllbGQFBmt5aGlldR4ORGF0YVZhbHVlRmllbGQFAklEHgtfIURhdGFCb3VuZGdkEBUBAlZOFQEgQUU1NjE5NjI2OUFGNDQ3NkI0MjIwNjdDOUI0MjQ1MDQUKwMBZxYBZmQCBA8PFgIeCEltYWdlVXJsBSgvQ01DU29mdC5JVS5XZWIuSW5mby9JbWFnZXMvVXNlckluZm8uZ2lmZGQCBQ9kFgYCAQ8PFgIfAAUGS2jDoWNoZGQCAw8PFgIfAGVkZAIHDw8WAh4HVmlzaWJsZWhkZAICD2QWBAIDDw9kFgIeBm9uYmx1cgUKbWQ1KHRoaXMpO2QCBw8PFgIfAGVkZAIEDw8WAh8GaGRkAgYPDxYCHwZoZBYGAgEPD2QWAh8HBQptZDUodGhpcyk7ZAIFDw9kFgIfBwUKbWQ1KHRoaXMpO2QCCQ8PZBYCHwcFCm1kNSh0aGlzKTtkAgsPZBYIZg8PFgIfAAUJRW1wdHlEYXRhZGQCAQ9kFgJmDw8WAh8BaGRkAgIPZBYCZg8PFgQfAAUNxJDEg25nIG5o4bqtcB8BaGRkAgMPDxYCHwAFtgU8YSBocmVmPSIjIiBvbmNsaWNrPSJqYXZhc2NyaXB0OndpbmRvdy5wcmludCgpIj48ZGl2IHN0eWxlPSJGTE9BVDpsZWZ0Ij4JPGltZyBzcmM9Ii9DTUNTb2Z0LklVLldlYi5JbmZvL2ltYWdlcy9wcmludC5wbmciIGJvcmRlcj0iMCI+PC9kaXY+PGRpdiBzdHlsZT0iRkxPQVQ6bGVmdDtQQURESU5HLVRPUDo2cHgiPkluIHRyYW5nIG7DoHk8L2Rpdj48L2E+PGEgaHJlZj0ibWFpbHRvOj9zdWJqZWN0PUhlIHRob25nIHRob25nIHRpbiBJVSZhbXA7Ym9keT1odHRwczovL3FsZHQudXRjLmVkdS52bi9DTUNTb2Z0LklVLldlYi5JbmZvL0xvZ2luLmFzcHgiPjxkaXYgc3R5bGU9IkZMT0FUOmxlZnQiPjxpbWcgc3JjPSIvQ01DU29mdC5JVS5XZWIuSW5mby9pbWFnZXMvc2VuZGVtYWlsLnBuZyIgIGJvcmRlcj0iMCI+PC9kaXY+PGRpdiBzdHlsZT0iRkxPQVQ6bGVmdDtQQURESU5HLVRPUDo2cHgiPkfhu61pIGVtYWlsIHRyYW5nIG7DoHk8L2Rpdj48L2E+PGEgaHJlZj0iIyIgb25jbGljaz0iamF2YXNjcmlwdDphZGRmYXYoKSI+PGRpdiBzdHlsZT0iRkxPQVQ6bGVmdCI+PGltZyBzcmM9Ii9DTUNTb2Z0LklVLldlYi5JbmZvL2ltYWdlcy9hZGR0b2Zhdm9yaXRlcy5wbmciICBib3JkZXI9IjAiPjwvZGl2PjxkaXYgc3R5bGU9IkZMT0FUOmxlZnQ7UEFERElORy1UT1A6NnB4Ij5UaMOqbSB2w6BvIMawYSB0aMOtY2g8L2Rpdj48L2E+ZGRkaWR1HGt7WBdVi1bunepNuOXveBnEIxpLHtuIgKgR474=",
    __EVENTVALIDATION:
      "/wEdAA9TQR1CzmNCicGKNnzkNCx6b8csnTIorMPSfpUKU79Fa8zr1tijm/dVbgMI0MJ/5MgoRSoZPLBHamO4n2xGfGAWHW/isUyw6w8trNAGHDe5T/w2lIs9E7eeV2CwsZKam8yG9tEt/TDyJa1fzAdIcnRuY3plgk0YBAefRz3MyBlTcHY2+Mc6SrnAqio3oCKbxYY85pbWlDO2hADfoPXD/5tdAxTm4XTnH1XBeB1RAJ3owlx3skko0mmpwNmsvoT+s7J0y/1mTDOpNgKEQo+otMEzMS21+fhYdbX7HjGORawQMqpdNpKktwtkFUYS71DzGv5d38s8ymX8qps/fibYo2Vm8QrXkyxt9mtPXIQitKY6oA==",
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
