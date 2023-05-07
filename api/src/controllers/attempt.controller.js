const { attemptService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { id } = req.user;
  let attempt = await attemptService.createOne({
    userId: id,
    testCode: req.body.testCode,
  });
  res
    .status(httpStatus.CREATED)
    .json({ message: "Bắt đầu làm bài thi!", data: { attempt } });
});

module.exports = {
  createOne,
};
