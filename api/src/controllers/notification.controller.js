const { notificationService } = require("../services");
const { catchAsync } = require("../utils");
const _ = require("lodash");
const httpStatus = require("http-status");

const getManyByUserId = catchAsync(async (req, res) => {
  const { id } = req.user;
  let notifications = await notificationService.getManyByUserId(id);
  res.status(httpStatus.OK).json({ content: { notifications } });
});

module.exports = {
  getManyByUserId,
};
