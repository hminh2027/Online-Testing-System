const { notificationService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const getManyByUserId = catchAsync(async (req, res) => {
  const { id } = req.user;
  let notis = await notificationService.getManyByUserId(id);
  res.status(httpStatus.OK).json({ content: notis });
});

const createOne = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { content, url, recipents } = req.body;
  const noti = await notificationService.createOne({
    userId: id,
    content,
    url,
    recipents,
  });
  res.status(httpStatus.OK).json({ content: noti });
});

module.exports = {
  getManyByUserId,
  createOne,
};
