import { MoreHorizontal, Plus } from 'lucide-react';
import type { Column } from '../../types';
import { TaskCard } from './TaskCard';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

interface ColumnContainerProps {
  column: Column;
  onAddTask: (columnId: string) => void;
}

export const ColumnContainer = ({ column, onAddTask }: ColumnContainerProps) => {
  const taskIds = column.tasks.map(task => task.id);

  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: column.id,
    data: {
        type: 'Column',
        column
    }
  });

  return (
    <div ref={setDroppableNodeRef} className="w-[350px] h-full flex flex-col flex-shrink-0">
      
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
            <h2 className="text-text-main font-semibold text-sm">{column.title}</h2>
            <span className="text-xs text-text-secondary bg-white/5 px-2 py-0.5 rounded-full">
                {column.tasks.length}
            </span>
        </div>
        <div className="flex gap-1">
            <button onClick={() => onAddTask(column.id)} className="p-1 hover:bg-white/5 rounded text-text-secondary hover:text-text-main transition-colors">
                <Plus size={18} />
            </button>
            <button className="p-1 hover:bg-white/5 rounded text-text-secondary hover:text-text-main transition-colors">
                <MoreHorizontal size={18} />
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </SortableContext>
        
        <button onClick={() => onAddTask(column.id)} className="w-full py-3 rounded-xl border border-dashed border-border-color text-text-secondary text-sm hover:bg-white/5 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 opacity-50 hover:opacity-100">
            <Plus size={16} />
            Add Task
        </button>
      </div>
    </div>
  );
};