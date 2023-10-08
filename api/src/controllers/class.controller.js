const { userService, userClassService, classService } = require("../services");
const { catchAsync } = require("../utils");
const _ = require("lodash");
const httpStatus = require("http-status");

const createOne = catchAsync(async (req, res) => {
  const { id } = req.user;
  const {
    isStudentApprovalJoin,
    isStudentApprovalLeave,
    name,
    description,
    grade,
    imageUrl,
    password,
  } = req.body;
  let _class = await classService.createOne({
    teacherId: id,
    isStudentApprovalJoin,
    isStudentApprovalLeave,
    name,
    description,
    grade,
    imageUrl,
    password,
  });
  res
    .status(httpStatus.OK)
    .json({ content: { class: _class }, message: "Tạo lớp học thành công!" });
});

const getManyByUserId = catchAsync(async (req, res) => {
  const { id, is_teacher } = req.user;
  let classes = null;

  if (is_teacher) classes = await classService.getManyByTeacherId(+id);
  else classService.getManyByStudentId(+id);
  res.status(httpStatus.OK).json({ content: { classes } });
});

const getOneByCode = catchAsync(async (req, res) => {
  const { userId } = req.params;
  let user = await userService.getOneByCode(+userId);
  user = _.omit(user, ["password"]);
  res.status(httpStatus.OK).json({ content: { user } });
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
  // const { email, password, name, avatar_url } = req.body;
  const { id } = req.params;
  let _class = await classService.updateOneByCode(id, req.body);

  res.status(httpStatus.OK).json({
    message: "Class updated successfully",
    content: _class,
  });
});

const deleteOneByCode = catchAsync(async (req, res) => {
  const { id } = req.params;
  await classService.deleteOneByCode(id);

  res.status(httpStatus.OK).json({
    message: "Class deleted successfully",
  });
});

module.exports = {
  createOne,
  getOneByCode,
  getUsersByClassCode,
  getManyByUserId,
  updateOneByCode,
  deleteOneByCode,
};
