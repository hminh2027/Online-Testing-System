const {
  questionService,
  answerService,
  examService,
  categoryService,
} = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { id } = req.user;
  let test = await examService.createOne({ ...req.body, userId: id });
  res
    .status(httpStatus.CREATED)
    .json({ message: "Tạo bài kiểm tra thành công", data: { test } });
});

const createOneQuestion = catchAsync(async (req, res) => {
  const { answers } = req.body;
  const { testCode } = req.params;

  const question = await questionService.createOne({ ...req.body, testCode });
  answers.forEach(async (answer) => {
    await answerService.createOne({ ...answer, questionId: question.id });
  });

  res
    .status(httpStatus.CREATED)
    .json({ message: "Tạo câu hỏi thành công", data: { question } });
});

const getAllWithCategory = catchAsync(async (req, res) => {
  const categories = await categoryService.getAll();

  res.status(httpStatus.OK).json({ data: { categories } });
});

const getAllByCategoryId = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const tests = await examService.getAllByCategoryId(categoryId);

  res.status(httpStatus.OK).json({ data: { tests } });
});

const getoneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const exam = await examService.getOneById(id);

  res.status(httpStatus.OK).json({ data: { exam } });
});

const getManyByTeacherId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const exam = await examService.getManyByTeacherId(+userId);

  res.status(httpStatus.OK).json({ data: { exam } });
});

const updateOneQuestion = catchAsync(async (req, res) => {
  const { answers } = req.body;
  const { id } = req.params;

  const question = await questionService.updateOneById(id, req.body);
  answers.forEach(async (answer) => {
    await answerService.updateOne(question.id, answer.index, {
      text: answer.text,
      is_correct: answer.isCorrect,
      index: answer.index,
    });
  });

  res.status(httpStatus.OK).json({ message: "Cập nhật câu hỏi thành công" });
});
// xem answer update ntn
// const updateOneAnswer = catchAsync(async (req, res) => {
//   const { answers } = req.body;
//   const { testCode, questionIndex } = req.params;

//   const answer = await answerService.updateOne(
//     testCode,
//     questionIndex,
//     req.body
//   );

//   res.status(httpStatus.OK).json({ message: "Cập nhật đáp án thành công" });
// });

const updateOneByCode = catchAsync(async (req, res) => {
  const { testCode } = req.params;
  const { id } = req.user;
  const data = { ...req.user, userId: id };
  const test = await examService.updateOneByCode(testCode, data);

  res
    .status(httpStatus.OK)
    .json({ message: "Cập nhật bài kiểm tra thành công", data: { test } });
});

const deleteOneByCode = catchAsync(async (req, res) => {
  const { testCode } = req.params;
  const { id } = req.user;
  await examService.deleteOneByCode(testCode, id);

  res.status(httpStatus.OK).json({ message: "Xóa bài kiểm tra thành công" });
});

const deleteOneQuestion = catchAsync(async (req, res) => {
  const { testCode, questionIndex } = req.params;
  await questionService.deleteOne(testCode, questionIndex);

  res.status(httpStatus.OK).json({ message: "Xóa bài kiểm tra thành công" });
});

module.exports = {
  createOneQuestion,
  createOne,
  getAllWithCategory,
  getAllByCategoryId,
  getAllByUserId,
  getoneByCode,
  updateOneByCode,
  updateOneQuestion,
  deleteOneByCode,
  deleteOneQuestion,
};
