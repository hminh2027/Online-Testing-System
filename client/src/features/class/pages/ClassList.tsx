import { Pagination } from 'antd';
import { GRADE } from '@/constants';
import { CustomSpace } from '@/components/CustomSpace';
import ClassCard from '../components/ClassCard/ClassCard';

const dataSource = [
  {
    id: 1,
    name: 'Lớp toán thầy Minh ôn luyện 2k5',
    teacherName: 'Minh',
    studentCount: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    grade: GRADE.highschool,
  },
  {
    id: 2,
    name: 'Lớp học chứng khoán lùa gà cục tác',
    teacherName: 'Minh',
    imageUrl:
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    studentCount: 32,
    grade: GRADE.other,
  },
];

export default function ClassList() {
  return (
    <>
      <CustomSpace direction="vertical" isFullWidth>
        {dataSource.map((c) => (
          <ClassCard
            key={c.id}
            isActive
            name={c.name}
            teacherName={c.teacherName}
            thumbnail={c.imageUrl}
          />
        ))}
      </CustomSpace>
      <Pagination defaultCurrent={1} total={dataSource.length} />
    </>
  );
}
