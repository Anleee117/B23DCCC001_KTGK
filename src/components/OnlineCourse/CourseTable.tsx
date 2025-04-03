import React from 'react';
import { Table, Button } from 'antd';
import { Course } from '@/services/OnlineCourse/course';

interface CourseTableProps {
  courses: Course[];
  onViewDetail: (course: Course) => void;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({
  courses,
  onViewDetail,
  onEdit,
  onDelete,
}) => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên khóa học', dataIndex: 'name', key: 'name' },
    { title: 'Giảng viên', dataIndex: 'instructor', key: 'instructor' },
    { 
      title: 'Số học viên', 
      dataIndex: 'studentCount', 
      key: 'studentCount',
      sorter: (a: Course, b: Course) => a.studentCount - b.studentCount,
    },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Course) => (
        <>
          <Button 
            onClick={() => onViewDetail(record)}
            style={{ marginRight: 8 }}
          >
            Xem chi tiết
          </Button>
          <Button 
            onClick={() => onEdit(record)}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Button 
            danger 
            onClick={() => onDelete(record)}
            disabled={record.studentCount > 0}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={courses} 
      rowKey="id"
    />
  );
};

export default CourseTable;