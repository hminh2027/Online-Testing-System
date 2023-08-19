const { postService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { id } = req.user;
  let post = await postService.createOne({
    userId: id,
    testCode: req.body.testCode,
  });
  res
    .status(httpStatus.CREATED)
    .json({ message: "Bắt đầu làm bài thi!", data: { post } });
});

const getOneOngoing = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { testCode } = req.params;
  let post = await postService.getOneOngoing({
    userId: id,
    testCode,
  });
  res.status(httpStatus.OK).json({ data: { post } });
});

const getManyByTestCode = catchAsync(async (req, res) => {
  const { testCode } = req.params;
  let posts = await postService.getManyByTestCode({ testCode });
  res.status(httpStatus.OK).json({ data: { posts } });
});

const getManyByTestCodeAndUserId = catchAsync(async (req, res) => {
  const { testCode } = req.params;
  const { id } = req.user;
  let posts = await postService.getManyByTestCodeAndUserId({
    testCode,
    userId: id,
  });
  res.status(httpStatus.OK).json({ data: { posts } });
});

const updateOneOngoing = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { postId } = req.body;
  let post = await postService.updateOneById({
    userId: id,
    postId,
  });
  res.status(httpStatus.OK).json({ data: { post } });
});

module.exports = {
  createOne,
  getOneOngoing,
  getManyByTestCode,
  getManyByTestCodeAndUserId,
  updateOneOngoing,
};
