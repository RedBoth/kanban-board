import { ColumnContainer } from './ColumnContainer';
import type { Column, Priority } from '../../types';

const MOCK_COLUMNS: Column[] = [
  {
    id: 'col-1',
    title: 'Backlog',
    tasks: [
      { 
        id: '1', 
        title: 'Investigar nuevas librerías de gráficos para el dashboard', 
        priority: 'Low' as Priority, 
        comments: 1 
      },
      { 
        id: '2', 
        title: 'Crear endpoints de autenticación en backend', 
        priority: 'High' as Priority, 
        comments: 5 
      },
      { 
        id: '3', 
        title: 'Optimizar imágenes de la landing page', 
        priority: 'Medium' as Priority, 
        comments: 2 
      },
    ]
  },
  {
    id: 'col-2',
    title: 'In Progress',
    tasks: [
      { 
        id: '4', 
        title: 'Configurar CI/CD en GitHub Actions', 
        priority: 'High' as Priority, 
        comments: 8 
      },
      { 
        id: '5', 
        title: 'Refactorizar componente de Tabla', 
        priority: 'Medium' as Priority, 
        comments: 0 
      },
    ]
  },
  {
    id: 'col-3',
    title: 'Review',
    tasks: [
        { 
            id: '6', 
            title: 'Corregir espaciado en vista móvil', 
            priority: 'Low' as Priority, 
            comments: 3 
        },
    ]
  },
  {
    id: 'col-4',
    title: 'Done',
    tasks: [
      { 
        id: '7', 
        title: 'Reunión inicial de proyecto', 
        priority: 'Low' as Priority, 
        comments: 0 
      },
    ]
  }
];

export const Board = () => {
  return (
    <div className="flex h-full gap-6 overflow-x-auto pb-4 items-start">
      {MOCK_COLUMNS.map((col) => (
        <ColumnContainer key={col.id} column={col} />
      ))}
    </div>
  );
};