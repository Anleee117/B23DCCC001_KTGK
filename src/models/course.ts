import { Course } from "@/services/OnlineCourse/course";

export const getCourses = (): Course[] => {
  return JSON.parse(localStorage.getItem('courses') || '[]');
};

export const saveCourse = (course: Course) => {
  const courses = getCourses();
  const existingIndex = courses.findIndex(c => c.id === course.id);
  
  if (existingIndex >= 0) {
    courses[existingIndex] = course;
  } else {
    courses.push({ ...course, id: Date.now().toString() });
  }
  
  localStorage.setItem('courses', JSON.stringify(courses));
};

export const deleteCourse = (id: string) => {
  const courses = getCourses().filter(c => c.id !== id);
  localStorage.setItem('courses', JSON.stringify(courses));
};

export const getInstructors = (): string[] => {
  return ['Nguyen Van A', 'Tran Thi B', 'Le Van C']; 
};