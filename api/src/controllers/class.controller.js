const { userService, userClassService, classService } = require("../services");
const { catchAsync } = require("../utils");
const _ = require("lodash");
const httpStatus = require("http-status");

const getOneById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  let user = await userService.getOneById(+userId);
  user = _.omit(user, ["password"]);
  res.status(httpStatus.OK).json({ content: { user } });
});

// TODO: Check this
const getUsersByClassId = catchAsync(async (req, res) => {
  const { id } = req.params;
  let users = await userClassService.getManyById(userClassId);

  // user = _.omit(user, ["password"]);
  res.status(httpStatus.OK).json({ content: { users } });
});

// TODO: getManyBy? // (so hs lam bai kiem tra)

const updateOneById = catchAsync(async (req, res) => {
  // const { email, password, name, avatar_url } = req.body;
  const { id } = req.params;
  let _class = await classService.updateOneById(id, req.body);

  res.status(httpStatus.OK).json({
    message: "Class updated successfully",
    content: _class,
  });
});

const deleteOneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await classService.deleteOneById(id);

  res.status(httpStatus.OK).json({
    message: "Class deleted successfully",
  });
});

module.exports = {
  getOneById,
  getUsersByClassId,
  updateOneById,
  deleteOneById,
};
