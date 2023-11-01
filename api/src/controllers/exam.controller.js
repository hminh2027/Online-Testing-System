const { examService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { id } = req.user;
  let exam = await examService.createOne({ ...req.body, userId: id });
  res
    .status(httpStatus.CREATED)
    .json({ message: "Tạo bài kiểm tra thành công", content: exam });
});

const getOneById = catchAsync(async (req, res) => {
  const { id: teacherId } = req.user;
  const { id } = req.params;
  const exam = await examService.getOneById(+id, { teacherId });

  res.status(httpStatus.OK).json({ content: exam });
});

const getManyByTeacherId = catchAsync(async (req, res) => {
  const { id } = req.user;
  const exam = await examService.getManyByTeacherId(+id);

  res.status(httpStatus.OK).json({ content: exam });
});

// const updateOneQuestion = catchAsync(async (req, res) => {
//   const { answers } = req.body;
//   const { id } = req.params;

//   const question = await questionService.updateOneById(id, req.body);
//   answers.forEach(async (answer) => {
//     await answerService.updateOne(question.id, answer.index, {
//       text: answer.text,
//       is_correct: answer.isCorrect,
//       index: answer.index,
//     });
//   });

//   res.status(httpStatus.OK).json({ message: "Cập nhật câu hỏi thành công" });
// });
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

const updateOneById = catchAsync(async (req, res) => {
  const { testCode } = req.params;
  const { id } = req.user;
  const data = { ...req.user, userId: id };
  const test = await examService.updateOneBy(testCode, data);

  res
    .status(httpStatus.OK)
    .json({ message: "Cập nhật bài kiểm tra thành công", data: { test } });
});

const deleteOneById = catchAsync(async (req, res) => {
  const { testCode } = req.params;
  const { id } = req.user;
  await examService.deleteOneById(testCode, id);

  res.status(httpStatus.OK).json({ message: "Xóa bài kiểm tra thành công" });
});

// const deleteOneQuestion = catchAsync(async (req, res) => {
//   const { testCode, questionIndex } = req.params;
//   await questionService.deleteOne(testCode, questionIndex);

//   res.status(httpStatus.OK).json({ message: "Xóa bài kiểm tra thành công" });
// });

module.exports = {
  createOne,
  getOneById,
  getManyByTeacherId,
  updateOneById,
  deleteOneById,
};
