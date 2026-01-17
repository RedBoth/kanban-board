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
import { createPortal } from 'react-dom';
import { TaskModal } from './TaskModal';
import type { Task, Priority } from '../../types';

export const Board = () => {
  const { columns, activeId, setActiveId, moveTask, addTask, updateTask, searchTerm } = useKanbanStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

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

  const handleOpenCreateModal = (columnId: string) => {
    setActiveColumnId(columnId);
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setTaskToEdit(task);
    setActiveColumnId(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = (data: { title: string; description: string; priority: Priority }) => {
    if (taskToEdit) {
        updateTask(taskToEdit.id, data);
    } else if (activeColumnId) {
        addTask(activeColumnId, data);
    }
  };

  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter((task) => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) // Opcional: buscar también en descripción
    )
  }));

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
        {filteredColumns.map((col) => (
          <ColumnContainer 
            key={col.id} 
            column={col} 
            onAddTask={handleOpenCreateModal} 
            onEditTask={handleOpenEditModal}
          />
        ))}
      </div>

      {createPortal(
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} onClick={() => {}}/> : null}
        </DragOverlay>,
        document.body
      )}

      <TaskModal
        key={taskToEdit?.id ?? 'create-modal'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSaveTask}
        taskToEdit={taskToEdit}
        columnTitle={activeColumnTitle}
      />
    </DndContext>
  );
};