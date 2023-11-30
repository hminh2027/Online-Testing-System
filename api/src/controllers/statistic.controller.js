const { omit, isEmpty } = require("lodash");
const { userClassService, attemptService } = require("../services");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const getStatisticByExamId = catchAsync(async (req, res) => {
  const { id } = req.params;

  let rank = {
    excellent: 0,
    average: 0,
    ordinary: 0,
  };

  let attempt = {
    done: 0,
    todo: 0,
  };

  const at = await attemptService.getManyByExamId(+id);

  if (isEmpty(at))
    return res.status(httpStatus.OK).json({ content: { rank, attempt } });

  const uc = await userClassService.getManyByClassCode(at[0].Exam.classCode);

  if (isEmpty(uc))
    return res.status(httpStatus.OK).json({ content: { rank, attempt } });

  // Attempt
  const studentInClass = uc.filter((req) => !req.isPending);
  studentInClass.forEach((s) => {
    const curAttempt = at.find((a) => a.studentId === s.studentId);
    if (!curAttempt) attempt.todo++;
    else attempt.done++;
  });

  // Rank
  at.forEach((a) => {
    if (!a.point) return;
    let totalPoint = 0;
    a.Exam.Question.forEach((q) => (totalPoint += q.point));
    if (a.point >= (totalPoint * 80) / 100) rank.excellent++;
    else if (
      a.point >= (totalPoint * 50) / 100 &&
      a.point < (totalPoint * 80) / 100
    )
      rank.average++;
    else rank.ordinary++;
  });

  res.status(httpStatus.OK).json({ content: { rank, attempt } });
});

module.exports = {
  getStatisticByExamId,
};
