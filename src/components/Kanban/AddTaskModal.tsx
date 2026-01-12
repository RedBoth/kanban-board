import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (title: string) => void;
  columnTitle: string;
}

export const AddTaskModal = ({ isOpen, onClose, onConfirm, columnTitle }: AddTaskModalProps) => {
  const [title, setTitle] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onConfirm(title);
    setTitle('');
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      <div className="w-full max-w-md bg-column-bg border border-border-color rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between p-4 border-b border-border-color">
          <h2 className="text-text-main font-semibold">New Issue</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-main transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-xs text-text-secondary mb-2 uppercase font-bold tracking-wider">
              Title
            </label>
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full bg-main-bg border border-border-color rounded-lg px-3 py-2 text-text-main focus:outline-none focus:border-primary placeholder:text-text-secondary/50"
            />
            <p className="mt-2 text-xs text-text-secondary">
              Adding to <span className="text-primary font-medium">{columnTitle}</span>
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-main transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};