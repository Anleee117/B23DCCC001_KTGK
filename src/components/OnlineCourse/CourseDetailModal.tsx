import React from 'react';
import { Modal, Button, Descriptions } from 'antd';
import { Course } from '@/services/OnlineCourse/course';

interface CourseDetailModalProps {
  visible: boolean;
  course: Course | null;
  onClose: () => void;
}

const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  visible,
  course,
  onClose,
}) => {
  return (
    <Modal
      title="Chi tiết khóa học"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      width={600}
    >
      {course && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="ID">{course.id}</Descriptions.Item>
          <Descriptions.Item label="Tên khóa học">{course.name}</Descriptions.Item>
          <Descriptions.Item label="Giảng viên">{course.instructor}</Descriptions.Item>
          <Descriptions.Item label="Số học viên">{course.studentCount}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {course.status === 'OPEN' ? 'Đang mở' : 
             course.status === 'ENDED' ? 'Đã kết thúc' : 'Tạm dừng'}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            <div dangerouslySetInnerHTML={{ __html: course.description }} />
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default CourseDetailModal;