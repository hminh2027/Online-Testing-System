enum StorageKey {
  Token,
  ExamQuestionOrder,
}

type StorageKeyProps = keyof typeof StorageKey;

export const storage = {
  get: (type: StorageKeyProps) => localStorage.getItem(type),
  set: (type: StorageKeyProps, value: string) => {
    localStorage.setItem(type, value);
  },
  clear: (type: StorageKeyProps) => {
    localStorage.removeItem(type);
  },
};
