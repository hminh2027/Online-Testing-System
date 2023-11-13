export enum REQUEST_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export enum MODE {
  ADD,
  EDIT,
  DETAIL,
}

export enum EXAM_STATUS {
  NOT_AVAILABLE = 'không khả dụng',
  OUT_OF_ATTEMPT = 'hết lượt làm bài',
  AVAILABLE = 'chưa làm',
  ATTEMPTED = 'đã làm',
}
