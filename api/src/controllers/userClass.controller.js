const { userClassService, classService } = require("../services");
const { catchAsync } = require("../utils");
const _ = require("lodash");
const httpStatus = require("http-status");
const { RequestStatus } = require("@prisma/client");

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
    status: classRoom.isStudentApprovalEnter
      ? RequestStatus.pending
      : RequestStatus.accepted,
  });
  res
    .status(httpStatus.OK)
    .json({ content: userClass, message: "Tạo lớp học thành công!" });
});

const getManyByStatus = catchAsync(async (req, res) => {
  const { classCode, status } = req.query;

  let userClass = await userClassService.getManyByStatus({
    status,
    classCode,
  });
  res.status(httpStatus.OK).json({ content: userClass });
});

module.exports = {
  createOne,
  getManyByStatus,
};
