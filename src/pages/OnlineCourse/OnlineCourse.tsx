import React, { useState, useEffect } from 'react';
import { Modal, message } from 'antd';
import { Course  } from '@/services/OnlineCourse/course';
import { getCourses, saveCourse, deleteCourse } from '@/models/course';
import CourseForm from '../../components/OnlineCourse/CourseForm';
import SearchFilter from '../../components/OnlineCourse/SearchFilter';
import CourseTable from '../../components/OnlineCourse/CourseTable';
import CourseDetailModal from '../../components/OnlineCourse/CourseDetailModal';

const OnlineCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [filterInstructor, setFilterInstructor] = useState<string | undefined>(undefined);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const handleViewDetail = (course: Course) => {
    setSelectedCourse(course);
    setDetailModalVisible(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setIsModalVisible(true);
  };

  const handleDelete = (course: Course) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc muốn xóa khóa học "${course.name}"?`,
      onOk: () => {
        deleteCourse(course.id);
        setCourses(getCourses());
        message.success('Xóa khóa học thành công');
      },
    });
  };

  const handleSave = (values: Course) => {
    if (!editingCourse && courses.some(c => c.name === values.name)) {
      message.error('Tên khóa học đã tồn tại');
      return;
    }
    
    saveCourse({ ...values, id: editingCourse?.id || Date.now().toString() });
    setCourses(getCourses());
    setIsModalVisible(false);
    setEditingCourse(null);
    message.success('Lưu khóa học thành công');
  };

  const filteredCourses = courses
    .filter(course => course.name.toLowerCase().includes(searchText.toLowerCase()))
    .filter(course => !filterStatus || course.status === filterStatus)
    .filter(course => !filterInstructor || course.instructor === filterInstructor);

  return (
    <div>
      <SearchFilter
        searchText={searchText}
        filterStatus={filterStatus}
        filterInstructor={filterInstructor}
        onSearchChange={setSearchText}
        onStatusChange={setFilterStatus}
        onInstructorChange={setFilterInstructor}
        onAddCourse={() => setIsModalVisible(true)}
      />

      <CourseTable
        courses={filteredCourses}
        onViewDetail={handleViewDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={editingCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingCourse(null);
        }}
        footer={null}
      >
        <CourseForm 
          initialValues={editingCourse} 
          onSubmit={handleSave}
        />
      </Modal>

      <CourseDetailModal
        visible={detailModalVisible}
        course={selectedCourse}
        onClose={() => setDetailModalVisible(false)}
      />
    </div>
  );
};

export default OnlineCourse;