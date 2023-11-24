const { attemptService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { examId } = req.body;
  let attempt = await attemptService.createOne({
    studentId: id,
    examId: examId,
  });
  res
    .status(httpStatus.CREATED)
    .json({ message: "Bắt đầu làm bài thi!", content: attempt });
});

const getOneOngoing = catchAsync(async (req, res) => {
  const { id } = req.user;
  let attempt = await attemptService.getOneOngoing(id);
  res.status(httpStatus.OK).json({ content: attempt });
});

const getManyByExamId = catchAsync(async (req, res) => {
  const { examId } = req.query;
  const { id, isTeacher } = req.user;
  let attempts = await attemptService.getManyByExamId(
    +examId,
    !isTeacher && id
  );
  res.status(httpStatus.OK).json({ content: attempts });
});

const updateOneOngoing = catchAsync(async (req, res) => {
  const { id } = req.params;
  let attempt = await attemptService.updateOneById(+id);
  res
    .status(httpStatus.OK)
    .json({ content: attempt, message: "Nộp bài thành công!" });
});

const patchOneOnGoing = catchAsync(async (req, res) => {
  const { id } = req.params;
  await attemptService.patchTaboutById(+id);
  res.status(httpStatus.OK).json();
});

module.exports = {
  createOne,
  getOneOngoing,
  getManyByExamId,
  updateOneOngoing,
  patchOneOnGoing,
};
