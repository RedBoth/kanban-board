export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  comments: number;
  image?: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}