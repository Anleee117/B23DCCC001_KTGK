import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { Course } from '@/services/OnlineCourse/course';
import { getInstructors } from '@/models/course';

interface CourseFormProps {
  initialValues?: Course;
  onSubmit: (values: Course) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Tên khóa học"
        rules={[
          { required: true, message: 'Vui lòng nhập tên khóa học' },
          { max: 100, message: 'Tên khóa học không được vượt quá 100 ký tự' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="instructor"
        label="Giảng viên"
        rules={[{ required: true, message: 'Vui lòng chọn giảng viên' }]}
      >
        <Select>
          {getInstructors().map(instructor => (
            <Select.Option key={instructor} value={instructor}>
              {instructor}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="studentCount"
        label="Số lượng học viên"
        rules={[{ required: true, message: 'Vui lòng nhập số lượng học viên' }]}
      >
        <Input type="number" min={0} />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="status"
        label="Trạng thái"
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
      >
        <Select>
          <Select.Option value="OPEN">Đang mở</Select.Option>
          <Select.Option value="ENDED">Đã kết thúc</Select.Option>
          <Select.Option value="PAUSED">Tạm dừng</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseForm;
