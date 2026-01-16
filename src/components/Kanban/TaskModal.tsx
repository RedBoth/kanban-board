import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { Priority, Task } from '../../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit: Task | null; 
  onConfirm: (data: { title: string; description: string; priority: Priority }) => void;
  columnTitle?: string;
}

const priorities: Priority[] = ['Low', 'Medium', 'High'];

export const TaskModal = ({ isOpen, onClose, taskToEdit, onConfirm, columnTitle }: TaskModalProps) => {
  const [title, setTitle] = useState(taskToEdit?.title ?? '');
  const [description, setDescription] = useState(taskToEdit?.description ?? '');
  const [priority, setPriority] = useState<Priority>(taskToEdit?.priority ?? 'Low');

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-column-bg border border-border-color rounded-xl shadow-2xl">
        
        <div className="flex items-center justify-between p-6 border-b border-border-color">
          <div>
            <h2 className="text-xl font-semibold text-text-main">
                {taskToEdit ? 'Edit Task' : 'New Task'}
            </h2>
            <p className="text-sm text-text-secondary mt-1">
                {taskToEdit ? 'Make changes to your task here.' : `Add a new item to ${columnTitle}`}
            </p>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-main transition-colors p-2 hover:bg-white/5 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">Title</label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="w-full bg-main-bg border border-border-color rounded-lg px-4 py-2.5 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-text-secondary/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">Priority</label>
            <div className="flex gap-3">
                {priorities.map((p) => (
                    <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`
                            flex-1 py-2 text-sm font-medium rounded-lg border transition-all
                            ${priority === p 
                                ? getPriorityStyles(p, true)
                                : 'border-border-color text-text-secondary hover:bg-white/5' // Estilo Inactivo
                            }
                        `}
                    >
                        {p}
                    </button>
                ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows={4}
              className="w-full bg-main-bg border border-border-color rounded-lg px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-text-secondary/30 resize-none"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-border-color bg-main-bg/30 rounded-b-xl">
            <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-text-secondary hover:text-text-main transition-colors">
                Cancel
            </button>
            <button
              onClick={() => {
                  if (!title.trim()) return;
                  onConfirm({ title, description, priority });
                  onClose();
              }}
              className="px-5 py-2.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
            >
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

const getPriorityStyles = (priority: Priority, active: boolean) => {
    switch (priority) {
        case 'High': return active ? 'bg-red-500/20 text-red-400 border-red-500/50' : '';
        case 'Medium': return active ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : '';
        case 'Low': return active ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : '';
    }
};