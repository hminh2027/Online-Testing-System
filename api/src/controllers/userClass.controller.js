const { userClassService, classService } = require("../services");
const { catchAsync } = require("../utils");
const _ = require("lodash");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { classCode, studentId } = req.body;

  const classRoom = await classService.getOneByCode(classCode);

  if (!classRoom)
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "Lớp học không tồn tại" });

  let userClass = await userClassService.createOne({
    classCode,
    studentId,
    isPending: classRoom.isStudentApprovalEnter,
  });
  res
    .status(httpStatus.OK)
    .json({ content: userClass, message: "Tạo lớp học thành công!" });
});

const getManyByClassCode = catchAsync(async (req, res) => {
  const { classCode } = req.query;

  let userClass = await userClassService.getManyByClassCode({
    classCode,
  });
  res.status(httpStatus.OK).json({ content: userClass });
});

module.exports = {
  createOne,
  getManyByClassCode,
};
