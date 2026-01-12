import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
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
        </header>

        <div className="flex-1 overflow-x-auto overflow-y-hidden p-8">
          {children}
        </div>
      </main>
    </div>
  );
};