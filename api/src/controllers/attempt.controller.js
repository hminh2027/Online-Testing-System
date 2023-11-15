const { attemptService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { examId } = req.body;
  let attempt = await attemptService.createOne({
    studentId: id,
    examId: examId,
  });
  res
    .status(httpStatus.CREATED)
    .json({ message: "Bắt đầu làm bài thi!", content: { attempt } });
});

const getOneOngoing = catchAsync(async (req, res) => {
  const { id } = req.user;
  let attempt = await attemptService.getOneOngoing(id);
  res.status(httpStatus.OK).json({ content: attempt });
});

const getManyByTestCode = catchAsync(async (req, res) => {
  const { testCode } = req.params;
  let attempts = await attemptService.getManyByTestCode({ testCode });
  res.status(httpStatus.OK).json({ content: { attempts } });
});

const getManyByTestCodeAndUserId = catchAsync(async (req, res) => {
  const { testCode } = req.params;
  const { id } = req.user;
  let attempts = await attemptService.getManyByTestCodeAndUserId({
    testCode,
    userId: id,
  });
  res.status(httpStatus.OK).json({ content: { attempts } });
});

const updateOneOngoing = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { attemptId } = req.body;
  let attempt = await attemptService.updateOneById({
    userId: id,
    attemptId,
  });
  res.status(httpStatus.OK).json({ content: { attempt } });
});

module.exports = {
  createOne,
  getOneOngoing,
  getManyByTestCode,
  getManyByTestCodeAndUserId,
  updateOneOngoing,
};
