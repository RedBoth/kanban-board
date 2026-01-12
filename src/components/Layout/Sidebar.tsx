import { 
  Home, 
  FolderKanban, 
  Users, 
  BarChart3, 
  Settings, 
  Zap 
} from 'lucide-react';

export const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: FolderKanban, label: 'Projects', active: true },
    { icon: Users, label: 'Team', active: false },
    { icon: BarChart3, label: 'Reports', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <aside className="w-64 bg-column-bg border-r border-border-color flex flex-col h-full transition-all">
      <div className="h-16 flex items-center px-6 border-b border-border-color/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
            <Zap size={20} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-text-main">Kanban Board</h1>
            <p className="text-xs text-text-secondary">Pro Plan</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${item.active 
                ? 'bg-primary/10 text-primary'
                : 'text-text-secondary hover:bg-white/5 hover:text-text-main'
              }
            `}
          >
            <item.icon size={20} />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-border-color/50">
        <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg cursor-pointer transition-colors">
          <img 
            src="https://ui-avatars.com/api/?name=Alex+Morgan&background=27272a&color=fff" 
            alt="User" 
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-main truncate">Alex Morgan</p>
            <p className="text-xs text-text-secondary truncate">Product Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
};