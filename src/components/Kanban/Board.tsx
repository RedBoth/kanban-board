import { 
  DndContext, 
  type DragEndEvent, 
  DragOverlay, 
  type DragStartEvent, 
  PointerSensor, 
  useSensor, 
  useSensors,
  type DragOverEvent,
  closestCorners
} from '@dnd-kit/core';
import { ColumnContainer } from './ColumnContainer';
import { useKanbanStore } from '../../store/useKanbanStore';
import { TaskCard } from './TaskCard';
import { arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

export const Board = () => {
  const { columns, activeId, setActiveId, moveTask } = useKanbanStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const isActiveTask = columns.some(col => col.tasks.some(task => task.id === activeId));
    const isOverTask = columns.some(col => col.tasks.some(task => task.id === overId));

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
        const activeColumn = columns.find(col => col.tasks.some(t => t.id === activeId));
        const overColumn = columns.find(col => col.tasks.some(t => t.id === overId));
        
        if (activeColumn !== overColumn) {
            moveTask(activeId, overId);
        }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
        setActiveId(null);
        return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId !== overId) {
        moveTask(activeId, overId);
    }

    setActiveId(null);
  };

  const activeTask = columns
    .flatMap((col) => col.tasks)
    .find((task) => task.id === activeId);

  return (
    <DndContext 
        sensors={sensors} 
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
    >
      <div className="flex h-full gap-6 overflow-x-auto pb-4 items-start">
        {columns.map((col) => (
          <ColumnContainer key={col.id} column={col} />
        ))}
      </div>

      {createPortal(
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};