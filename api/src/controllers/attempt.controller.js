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

const getOneOngoing = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { testCode } = req.params;
  let attempt = await attemptService.getOneOngoing({
    userId: id,
    testCode,
  });
  res.status(httpStatus.OK).json({ data: { attempt } });
});

const getManyByTestCode = catchAsync(async (req, res) => {
  const { testCode } = req.params;
  let attempts = await attemptService.getManyByTestCode({ testCode });
  res.status(httpStatus.OK).json({ data: { attempts } });
});

const getManyByTestCodeAndUserId = catchAsync(async (req, res) => {
  const { testCode } = req.params;
  const { id } = req.user;
  let attempts = await attemptService.getManyByTestCodeAndUserId({
    testCode,
    userId: id,
  });
  res.status(httpStatus.OK).json({ data: { attempts } });
});

const updateOneOngoing = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { attemptId } = req.body;
  let attempt = await attemptService.updateOneById({
    userId: id,
    attemptId,
  });
  res.status(httpStatus.OK).json({ data: { attempt } });
});

module.exports = {
  createOne,
  getOneOngoing,
  getManyByTestCode,
  getManyByTestCodeAndUserId,
  updateOneOngoing,
};
