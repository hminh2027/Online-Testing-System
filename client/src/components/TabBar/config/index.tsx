export type TabBarCustomConfig = {
  label: string;
  path: string;
};

export const teacherTabs: TabBarCustomConfig[] = [
  {
    label: 'Tổng quan',
    path: 'overview',
  },
  {
    label: 'Lớp học',
    path: 'class',
  },
  {
    label: 'Bài kiểm tra',
    path: 'exam',
  },
  {
    label: 'Lời mời',
    path: 'request',
  },
];

export const studentTabs: TabBarCustomConfig[] = [
  {
    label: 'Tổng quan',
    path: 'overview',
  },
  {
    label: 'Lớp học',
    path: 'class',
  },
  {
    label: 'Lịch thi',
    path: 'schedule',
  },
  {
    label: 'Lời mời',
    path: 'request',
  },
];
