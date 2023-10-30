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

const updateOneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  let question = await questionService.updateOneById(+id, req.body);
  const answers = await answerService.res
    .status(httpStatus.OK)
    .json({ message: "Cập nhật câu hỏi thành công", content: question });
});

const deleteOneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await questionService.deleteOneById(+id);
  res.status(httpStatus.OK).json({ message: "Xóa câu hỏi thành công" });
});

module.exports = {
  createOne,
  updateOneById,
  deleteOneById,
};
