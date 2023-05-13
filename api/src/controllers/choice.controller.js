const { choiceService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  let choice = await choiceService.createOne({
    answerIndex: req.body.answerIndex,
    questionIndex: req.body.questionIndex,
    attemptId: req.body.attemptId,
  });
  res.status(httpStatus.OK).json({ data: { choice } });
});

module.exports = {
  createOne,
};
