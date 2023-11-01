const { answerService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const deleteOneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await answerService.deleteOneById(+id);
  res.status(httpStatus.OK);
});

module.exports = {
  deleteOneById,
};
