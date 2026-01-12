import { create } from 'zustand';
import type { Column, Priority, Task } from '../types';
import { arrayMove } from '@dnd-kit/sortable';

interface KanbanStore {
  columns: Column[];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  moveTask: (activeId: string, overId: string) => void;
  
  addTask: (columnId: string, title: string) => void;
  deleteTask: (taskId: string) => void;
}

export const useKanbanStore = create<KanbanStore>((set) => ({
  columns: [
    {
        id: 'col-1',
        title: 'Backlog',
        tasks: [
          { id: '1', title: 'Investigar nuevas librerías', priority: 'Low' as Priority, comments: 1 },
          { id: '2', title: 'Crear endpoints de auth', priority: 'High' as Priority, comments: 5 },
        ]
    },
    {
        id: 'col-2',
        title: 'In Progress',
        tasks: [
            { id: '3', title: 'Configurar CI/CD', priority: 'High' as Priority, comments: 8 },
        ]
    },
    {
        id: 'col-3',
        title: 'Done',
        tasks: [
            { id: '4', title: 'Reunión inicial', priority: 'Low' as Priority, comments: 0 },
        ]
    }
  ],
  
  activeId: null,

  setActiveId: (id) => set({ activeId: id }),

  moveTask: (activeId, overId) => set((state) => {
    const activeColumnIndex = state.columns.findIndex((col) => 
      col.tasks.some((task) => task.id === activeId)
    );

    let overColumnIndex = state.columns.findIndex((col) => 
      col.tasks.some((task) => task.id === overId)
    );

    if (overColumnIndex === -1) {
      overColumnIndex = state.columns.findIndex((col) => col.id === overId);
    }
    
    if (activeColumnIndex === -1 || overColumnIndex === -1) return state;

    const activeColumn = state.columns[activeColumnIndex];
    const overColumn = state.columns[overColumnIndex];
    
    const activeTaskIndex = activeColumn.tasks.findIndex((t) => t.id === activeId);
    const overTaskIndex = overColumn.tasks.findIndex((t) => t.id === overId);

    if (activeColumnIndex === overColumnIndex) {
      if (activeTaskIndex === overTaskIndex) return state;
      const newTasks = arrayMove(activeColumn.tasks, activeTaskIndex, overTaskIndex);
      const newColumns = [...state.columns];
      newColumns[activeColumnIndex] = { ...activeColumn, tasks: newTasks };
      return { columns: newColumns };
    }

    const newColumns = [...state.columns];
    const [movedTask] = newColumns[activeColumnIndex].tasks.splice(activeTaskIndex, 1);
    
    const targetIndex = overTaskIndex >= 0 ? overTaskIndex : overColumn.tasks.length;
    
    newColumns[overColumnIndex].tasks.splice(targetIndex, 0, movedTask);

    return { columns: newColumns };
  }),

  addTask: (columnId, title) => set((state) => {
    const newColumns = [...state.columns];
    const columnIndex = newColumns.findIndex((col) => col.id === columnId);
    
    if (columnIndex === -1) return state;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title,
      priority: 'Low',
      comments: 0
    };

    newColumns[columnIndex].tasks.push(newTask);
    return { columns: newColumns };
  }),

  deleteTask: (taskId) => set((state) => {
    const newColumns = state.columns.map((col) => ({
      ...col,
      tasks: col.tasks.filter((task) => task.id !== taskId)
    }));
    return { columns: newColumns };
  }),
}));