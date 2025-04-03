import React from 'react';
import { Input, Select, Button } from 'antd';
import { getInstructors } from '@/models/course';

interface SearchFilterProps {
  searchText: string;
  filterStatus?: string;
  filterInstructor?: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value?: string) => void;
  onInstructorChange: (value?: string) => void;
  onAddCourse: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchText,
  filterStatus,
  filterInstructor,
  onSearchChange,
  onStatusChange,
  onInstructorChange,
  onAddCourse,
}) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Input.Search 
        placeholder="Tìm kiếm khóa học" 
        value={searchText}
        onChange={e => onSearchChange(e.target.value)}
        style={{ width: 200, marginRight: 16 }}
      />
      <Select 
        placeholder="Lọc theo trạng thái" 
        value={filterStatus}
        onChange={onStatusChange}
        style={{ width: 200, marginRight: 16 }}
        allowClear
      >
        <Select.Option value="OPEN">Đang mở</Select.Option>
        <Select.Option value="ENDED">Đã kết thúc</Select.Option>
        <Select.Option value="PAUSED">Tạm dừng</Select.Option>
      </Select>
      <Select 
        placeholder="Lọc theo giảng viên" 
        value={filterInstructor}
        onChange={onInstructorChange}
        style={{ width: 200, marginRight: 16 }}
        allowClear
      >
        {getInstructors().map(instructor => (
          <Select.Option key={instructor} value={instructor}>
            {instructor}
          </Select.Option>
        ))}
      </Select>
      <Button type="primary" onClick={onAddCourse}>
        Thêm khóa học
      </Button>
    </div>
  );
};

export default SearchFilter;