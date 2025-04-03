export interface Course {
    id: string;
    name: string;
    instructor: string;
    studentCount: number;
    description: string;
    status: 'OPEN' | 'ENDED' | 'PAUSED';
  }
  
  export interface Instructor {
    id: string;
    name: string;
  }