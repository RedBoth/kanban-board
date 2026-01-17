import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Search } from 'lucide-react';
import { useKanbanStore } from '../../store/useKanbanStore';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { searchTerm, setSearchTerm } = useKanbanStore();
  return (
    <div className="flex h-screen bg-main-bg text-text-main overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 flex items-center justify-between px-8 border-b border-border-color bg-main-bg/50 backdrop-blur-sm z-10">
          <div className="flex items-center text-sm">
            <span className="text-text-secondary">Project Alpha</span>
            <span className="mx-2 text-text-secondary">/</span>
            <span className="text-text-main font-medium">Sprint 24</span>
          </div>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input 
              type="text" 
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-column-bg border border-border-color rounded-lg pl-10 pr-4 py-1.5 text-sm text-text-main focus:outline-none focus:border-primary placeholder:text-text-secondary/50 transition-colors"
            />
          </div>
        </header>

        <div className="flex-1 overflow-x-auto overflow-y-hidden p-8">
          {children}
        </div>
      </main>
    </div>
  );
};