const { choiceService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { answerId, attemptId, questionId } = req.body;
  await choiceService.upsertOne({
    answerId: +answerId,
    questionId: +questionId,
    attemptId: +attemptId,
  });
  res.status(httpStatus.OK).json();
});

const updateMany = catchAsync(async (req, res) => {
  const choices = req.body;
  await choiceService.upsertMany(choices);
  res.status(httpStatus.OK).json();
});

module.exports = {
  createOne,
  updateMany,
};
