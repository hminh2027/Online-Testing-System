const { userClassService, classService } = require("../services");
const { catchAsync } = require("../utils");
const _ = require("lodash");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { id } = req.user;

  let _class = await classService.createOne({
    teacherId: id,
    ...req.body,
  });
  res
    .status(httpStatus.OK)
    .json({ content: { class: _class }, message: "Tạo lớp học thành công!" });
});

const getManyByUserId = catchAsync(async (req, res) => {
  const { id, isTeacher } = req.user;
  const { name } = req.query;
  let classes = null;

  if (isTeacher) classes = await classService.getManyByTeacherId(+id, name);
  else classes = await classService.getManyByStudentId(+id, name);
  res.status(httpStatus.OK).json({ content: classes });
});

const getOneByCode = catchAsync(async (req, res) => {
  const { code } = req.params;
  let classRoom = await classService.getOneByCode(code);
  if (!classRoom)
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "Không tìm thấy lớp học" });
  res.status(httpStatus.OK).json({ content: classRoom });
});

// TODO: Check this
const getUsersByClassCode = catchAsync(async (req, res) => {
  const { code } = req.params;
  let users = await userClassService.getManyById(code);

  // user = _.omit(user, ["password"]);
  res.status(httpStatus.OK).json({ content: { users } });
});

// TODO: getManyBy? // (so hs lam bai kiem tra)

const updateOneByCode = catchAsync(async (req, res) => {
  const { code } = req.params;
  let _class = await classService.updateOneByCode(code, req.body);

  res.status(httpStatus.OK).json({
    message: "Cập nhật lớp học thành công",
    content: _class,
  });
});

const patchStatusByCode = catchAsync(async (req, res) => {
  const { code } = req.params;
  let _class = await classService.updateOneByCode(code, {
    isActive: req.body.isActive,
  });

  res.status(httpStatus.OK).json({
    message: "Cập nhật lớp học thành công",
    content: _class,
  });
});

const deleteOneByCode = catchAsync(async (req, res) => {
  const { code } = req.params;
  await classService.deleteOneByCode(code);

  res.status(httpStatus.OK).json({
    message: "Xóa lớp học thành công",
  });
});

module.exports = {
  createOne,
  getOneByCode,
  getUsersByClassCode,
  getManyByUserId,
  updateOneByCode,
  patchStatusByCode,
  deleteOneByCode,
};
