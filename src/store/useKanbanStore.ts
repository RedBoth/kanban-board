import { create } from 'zustand';
import type { Column, Priority } from '../types';

interface KanbanStore {
  columns: Column[];
}

export const useKanbanStore = create<KanbanStore>((_set) => ({
  columns: [
    {
        id: 'col-1',
        title: 'Backlog',
        tasks: [
          { 
            id: '1', 
            title: 'Investigar nuevas librerías de gráficos', 
            priority: 'Low' as Priority, 
            comments: 1 
          },
          { 
            id: '2', 
            title: 'Crear endpoints de autenticación', 
            priority: 'High' as Priority, 
            comments: 5 
          },
        ]
      },
      {
        id: 'col-2',
        title: 'In Progress',
        tasks: [
          { 
            id: '3', 
            title: 'Configurar CI/CD', 
            priority: 'High' as Priority, 
            comments: 8 
          },
        ]
      },
      {
        id: 'col-3',
        title: 'Done',
        tasks: [
          { 
            id: '4', 
            title: 'Reunión inicial', 
            priority: 'Low' as Priority, 
            comments: 0 
          },
        ]
      }
  ],
}));