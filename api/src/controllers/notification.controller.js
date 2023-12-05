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
  const { content, url, recipents, notiType } = req.body;
  const noti = await notificationService.createOne({
    userId: id,
    content,
    url,
    recipents,
    notiType,
  });
  res.status(httpStatus.OK).json({ content: noti });
});

const patchOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { isRead } = req.body;
  const noti = await notificationService.patchOneById(+id, {
    isRead,
  });
  res.status(httpStatus.OK).json({ content: noti });
});

const deleteOneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const noti = await notificationService.deleteOneById(+id);
  res
    .status(httpStatus.OK)
    .json({ content: noti, message: "Xoá thông báo thành công" });
});

module.exports = {
  getManyByUserId,
  createOne,
  patchOne,
  deleteOneById,
};
