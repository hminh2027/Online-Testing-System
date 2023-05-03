const {
  authService,
  tokenService,
  userService,
  questionService,
  answerService,
  testService,
  categoryService,
} = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  // const { userId } = req.params;
  let test = await testService.createOne(req.body);
  res
    .status(httpStatus.CREATED)
    .json({ message: "Tạo bài kiểm tra thành công", data: { test } });
});

const createOneQuestion = catchAsync(async (req, res) => {
  const { answers } = req.body;
  const { testId } = req.params;

  const question = await questionService.createOne({ ...req.body, testId });
  answers.forEach(async (answer) => {
    await answerService.createOne({ ...answer, questionId: question.id });
  });

  res
    .status(httpStatus.CREATED)
    .json({ message: "Tạo câu hỏi thành công", data: { question } });
});

const getAllWithCaregory = catchAsync(async (req, res) => {
  const categories = await categoryService.getAll();

  res.status(httpStatus.OK).json({ data: { categories } });
});

const getAllByCategoryId = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const tests = await testService.getAllByCategoryId(categoryId);

  res.status(httpStatus.OK).json({ data: { tests } });
});

module.exports = {
  createOneQuestion,
  createOne,
  getAllWithCaregory,
  getAllByCategoryId,
};
