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

const updateOneById = catchAsync(async (req, res) => {
  const { testCode } = req.params;
  const { id } = req.user;
  const data = { ...req.user, userId: id };
  const test = await examService.updateOneById(testCode, data);

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

module.exports = {
  createOne,
  getOneById,
  getManyByTeacherId,
  updateOneById,
  deleteOneById,
};
