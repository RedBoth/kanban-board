import { MessageSquare, Trash2 } from 'lucide-react';
import type { Task } from '../../types/index';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useKanbanStore } from '../../store/useKanbanStore';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

const priorityColors = {
  High: 'bg-red-500/10 text-red-400 border-red-500/20',
  Medium: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const deleteTask = useKanbanStore((state) => state.deleteTask);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-card-bg opacity-30 p-4 rounded-xl border border-primary/50 h-[100px]"
      />
    );
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(task)}
      className="bg-card-bg p-4 rounded-xl border border-border-color shadow-sm hover:border-primary/50 cursor-grab active:cursor-grabbing group transition-colors touch-none"
    >
      
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-1 rounded text-xs font-medium border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <button 
            onPointerDown={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
            }}
            className="text-text-secondary hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
        >
            <Trash2 size={16} />
        </button>
      </div>

      <h3 className="text-text-main font-medium text-sm mb-4 leading-relaxed">
        {task.title}
      </h3>

      <div className="flex justify-between items-center border-t border-border-color/50 pt-3 mt-3">
        <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold border-2 border-card-bg">
                AM
            </div>
        </div>

        <div className="flex items-center gap-1 text-text-secondary text-xs">
          <MessageSquare size={14} />
          <span>{task.comments}</span>
        </div>
      </div>
    </div>
  );
};