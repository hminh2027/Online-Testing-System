const { questionService, answerService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const index = (await questionService.count()) + 1;

  let question = await questionService.createOne({
    ...req.body,
    index: req.body.index || index,
  });

  const answers = req.body.answers.map((answer) => ({
    ...answer,
    questionId: question.id,
  }));

  await answerService.createMany(answers);
  res
    .status(httpStatus.CREATED)
    .json({ message: "Tạo câu hỏi thành công", content: question });
});

const createMany = catchAsync(async (req, res) => {
  const questions = req.body;
  const curIndex = (await questionService.count(questions[0].examId)) + 1;

  await questionService.deleteMany(questions[0].examId);

  const newQuestions = questions.map(async (q, index) => {
    let question = await questionService.createOne({
      ...q,
      index: curIndex + index + 1,
    });

    const answers = q.answers.map((answer) => ({
      ...answer,
      questionId: +question.id,
      isCorrect: !!answer.isCorrect,
    }));

    await answerService.createMany(answers);

    return { ...question, answers };
  });

  res
    .status(httpStatus.CREATED)
    .json({ message: "Tạo câu hỏi thành công", content: newQuestions });
});

const getOneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  let question = await questionService.getOneById(+id);
  res.status(httpStatus.OK).json({ content: question });
});

const getManyByExamId = catchAsync(async (req, res) => {
  const { examId } = req.query;
  let questions = await questionService.getManyByExamId(+examId);
  res.status(httpStatus.OK).json({ content: questions });
});

const updateIndex = catchAsync(async (req, res) => {
  const { indexArray } = req.body;

  indexArray.forEach(async (id, index) => {
    await questionService.patchIndexById(id, index + 1);
  });

  res.status(httpStatus.OK).json({ message: "Vị trí câu hỏi cập nhật" });
});

const updateOneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  let question = await questionService.updateOneById(+id, req.body);
  await answerService.updateMany(question.id, req.body.answers);
  res
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
  createMany,
  getOneById,
  getManyByExamId,
  updateIndex,
  updateOneById,
  deleteOneById,
};
