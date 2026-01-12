import { useState } from 'react';
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
import { AddTaskModal } from './addTaskModal';

export const Board = () => {
  const { columns, activeId, setActiveId, moveTask, addTask } = useKanbanStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

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
    
    const isOverColumn = columns.some(col => col.id === overId);

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
        const activeColumn = columns.find(col => col.tasks.some(t => t.id === activeId));
        const overColumn = columns.find(col => col.tasks.some(t => t.id === overId));
        
        if (activeColumn !== overColumn) {
            moveTask(activeId, overId);
        }
    }

    if (isActiveTask && isOverColumn) {
        const activeColumn = columns.find(col => col.tasks.some(t => t.id === activeId));
        const overColumn = columns.find(col => col.id === overId);
        
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

  const handleOpenModal = (columnId: string) => {
    setActiveColumnId(columnId);
    setIsModalOpen(true);
  };

  const handleCreateTask = (title: string) => {
    if (activeColumnId) {
      addTask(activeColumnId, title);
    }
  };

  const activeColumnTitle = columns.find(c => c.id === activeColumnId)?.title || '';

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
          <ColumnContainer key={col.id} column={col} onAddTask={handleOpenModal}/>
        ))}
      </div>

      {createPortal(
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>,
        document.body
      )}

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreateTask}
        columnTitle={activeColumnTitle}
      />
    </DndContext>
  );
};