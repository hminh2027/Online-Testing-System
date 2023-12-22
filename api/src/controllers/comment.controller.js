const { commentService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { id } = req.user;
  let post = await commentService.createOne({
    userId: id,
    ...req.body,
  });
  res.status(httpStatus.CREATED).json({ content: post });
});

const getManyByPostId = catchAsync(async (req, res) => {
  const { postId } = req.query;
  let posts = await commentService.getManyByPostId(+postId);
  res.status(httpStatus.OK).json({ content: posts });
});

const updateOneById = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { id: postId } = req.params;
  let post = await commentService.updateOneById(postId, {
    userId,
    ...req.body,
  });
  res.status(httpStatus.OK).json({ content: post });
});

const deleteOneById = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { id: postId } = req.params;
  await commentService.deleteOneById(postId, userId);
  res.status(httpStatus.OK);
});

module.exports = {
  createOne,
  getManyByPostId,
  updateOneById,
  deleteOneById,
};
