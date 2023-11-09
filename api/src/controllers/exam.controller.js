const { examService, questionService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { id } = req.user;
  let exam = await examService.createOne({ ...req.body, teacherId: id });
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

const copyOneById = catchAsync(async (req, res) => {
  const { id: teacherId } = req.user;
  const { id } = req.params;
  const exam = await examService.getOneById(+id, { teacherId });
  // console.log(exam);

  // let newExam = await examService.createOne({ ...exam, teacherId: id });

  // //
  // const curIndex = (await questionService.count()) + 1;
  // const questions = exam.Question;

  // await questionService.deleteMany(exam.id);

  // questions.map(async (q, index) => {
  //   let question = await questionService.createOne({
  //     ...q,
  //     index: curIndex + index + 1,
  //   });

  //   const answers = q.answers.map((answer) => ({
  //     ...answer,
  //     questionId: question.id,
  //   }));

  //   await answerService.createMany(answers);
  // });

  //
  res.status(httpStatus.OK).json({ content: exam });
});

const getManyByTeacherId = catchAsync(async (req, res) => {
  const { id } = req.user;
  const exam = await examService.getManyByTeacherId(+id);

  res.status(httpStatus.OK).json({ content: exam });
});

const updateOneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const exam = await examService.updateOneById(+id, req.body);

  res
    .status(httpStatus.OK)
    .json({ message: "Cập nhật bài kiểm tra thành công", data: exam });
});

const deleteOneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await examService.deleteOneById(id);

  res.status(httpStatus.OK).json({ message: "Xóa bài kiểm tra thành công" });
});

module.exports = {
  createOne,
  getOneById,
  copyOneById,
  getManyByTeacherId,
  updateOneById,
  deleteOneById,
};
