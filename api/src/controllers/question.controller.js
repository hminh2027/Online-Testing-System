const { questionService, answerService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { examId } = req.query;

  let question = await questionService.createOne({
    ...req.body,
    examId,
  });

  const answers = req.body.answers.map((answer) => ({
    ...answer,
    questionId: question.id,
  }));

  await answerService.createMany(answers);
  res.status(httpStatus.CREATED).json();
});

const getManyByClassCode = catchAsync(async (req, res) => {
  const { classCode } = req.query;
  let posts = await postService.getManyByClassCode(classCode);
  res.status(httpStatus.OK).json({ content: posts });
});

const updateOneById = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { id: postId } = req.params;
  let post = await postService.updateOneById(postId, {
    userId,
    ...req.body,
  });
  res
    .status(httpStatus.OK)
    .json({ message: "Cập nhật bài viết thành công", content: post });
});

const deleteOneById = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { id: postId } = req.params;
  await postService.deleteOneById(postId, userId);
  res.status(httpStatus.OK).json({ message: "Xoá bài viết thành công" });
});

module.exports = {
  createOne,
  getManyByClassCode,
  updateOneById,
  deleteOneById,
};
