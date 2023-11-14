const { examService, questionService, answerService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");
const omit = require("lodash/omit");

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
  const { id } = req.params;
  const exam = await examService.getOneById(+id);

  if (!exam)
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "Không tìm thấy bài kiểm tra" });

  let newExam = await examService.createOne({
    ...exam,
    title: `${exam.title} (copy)`,
    teacherId,
  });

  const questions = exam.Question;

  questions.map(async (q) => {
    let question = await questionService.createOne({
      ...q,
      examId: +newExam.id,
    });

    const answers = q.Answer.map((answer) => ({
      ...omit(answer, ["id"]),
      questionId: +question.id,
    }));

    await answerService.createMany(answers);
  });

  res.status(httpStatus.OK).json({
    content: newExam,
    message: `Tạo bản sao từ đề thi "${exam.title}" thành công`,
  });
});

const getManyByTeacherId = catchAsync(async (req, res) => {
  const { id, isTeacher } = req.user;
  const { classCode } = req.query;

  let exam = null;

  if (classCode)
    exam = await examService.getManyByClassCode(classCode, !isTeacher && +id);
  else exam = await examService.getManyByTeacherId(+id);

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
