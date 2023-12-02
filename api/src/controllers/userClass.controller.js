const { userClassService, classService } = require("../services");
const { catchAsync } = require("../utils");
const _ = require("lodash");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { classCode, studentId, isStudentRequested } = req.body;

  const classRoom = await classService.getOneByCode(classCode);

  if (!classRoom)
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "Lớp học không tồn tại" });

  const existed = await userClassService.getOneByStudentIdAndClassCode(
    +studentId,
    classCode
  );

  if (existed)
    return res
      .status(httpStatus.CONFLICT)
      .json({ message: "Lời mời đã tồn tại" });

  let userClass = await userClassService.createOne({
    classCode,
    studentId,
    isPending: classRoom.isStudentApprovalEnter,
    isStudentRequested,
  });
  res.status(httpStatus.OK).json({
    content: userClass,
    message: classRoom.isStudentApprovalEnter
      ? "Tạo lời mời thành công"
      : "Tham gia lớp học thành công",
  });
});

const createManyByStudentId = catchAsync(async (req, res) => {
  const requests = req.body;
  requests.map(async (request) => {
    const { classCode, isStudentRequested, studentId } = request;

    await userClassService.createOne({
      classCode,
      studentId,
      isPending: true,
      isStudentRequested,
    });
  });
  res.status(httpStatus.OK).json({
    message: "Đã gửi yêu cầu tới các học sinh",
  });
});

const getMany = catchAsync(async (req, res) => {
  const { classCode, studentId } = req.query;
  let userClass = null;
  if (!studentId)
    userClass = await userClassService.getManyByClassCode(classCode);
  else userClass = await userClassService.getManyByStudentId(+studentId);
  res.status(httpStatus.OK).json({ content: userClass });
});

const patchStatusById = catchAsync(async (req, res) => {
  const { id } = req.params;

  let userClass = await userClassService.patchStatusById(+id, {
    isPending: false,
  });
  res
    .status(httpStatus.OK)
    .json({ content: userClass, message: "Đã chấp thuận lời mời" });
});

const deleteOneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { id: teacherId } = req.user;

  let userClass = await userClassService.deleteOneById(+id, {
    teacherId,
  });
  res.status(httpStatus.OK).json({ content: userClass, message: "Đã từ chối" });
});

module.exports = {
  createOne,
  createManyByStudentId,
  getMany,
  patchStatusById,
  deleteOneById,
};
