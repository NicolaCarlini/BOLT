import React from 'react';
import { Wrench, Briefcase, CheckCircle, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const menuItems = [
    { id: 'jobs', label: 'Lavori', icon: Briefcase },
    { id: 'completed-jobs', label: 'Lavori completati', icon: CheckCircle },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Wrench className="h-8 w-8 text-teal-500" />
          <span className="text-xl font-semibold text-black">ABACO E.V.</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User info and logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="mb-3">
          <p className="text-sm text-gray-600">Connesso come:</p>
          <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Esci</span>
        </button>
      </div>
    </div>
  );
}