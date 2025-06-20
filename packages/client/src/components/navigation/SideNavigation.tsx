import React from 'react';

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  description?: string;
  badge?: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface SideNavigationProps {
  isOpen: boolean;
  items: NavigationItem[];
  userRole: 'host' | 'participant';
  onClose?: () => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ isOpen, items, userRole, onClose }) => {
  const roleConfig = {
    host: {
      title: '🎯 Host Dashboard',
      subtitle: 'Manage your meetings and polls',
      gradient: 'from-blue-600 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50'
    },
    participant: {
      title: '🎓 Student Dashboard', 
      subtitle: 'Join meetings and answer polls',
      gradient: 'from-green-600 to-blue-600',
      bgGradient: 'from-green-50 to-blue-50'
    }
  };

  const config = roleConfig[userRole];

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-lg border-r border-gray-200/50 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Header */}
        <div className={`p-6 bg-gradient-to-r ${config.gradient} text-white`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-heading">{config.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
          <p className="text-sm opacity-90">{config.subtitle}</p>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer stagger-${index + 1} fade-in-up ${
                item.isActive 
                  ? `bg-gradient-to-r ${config.bgGradient} border-2 border-blue-200 shadow-lg` 
                  : 'hover:bg-gray-50 border-2 border-transparent'
              }`}
              onClick={item.onClick}
            >
              <div className="p-4 flex items-center space-x-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
                  item.isActive 
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg` 
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  {item.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold text-base truncate ${
                      item.isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {item.label}
                    </h3>
                    {item.badge && (
                      <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-1 truncate">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <div className={`transition-transform duration-300 ${
                  item.isActive ? 'transform rotate-90' : 'group-hover:translate-x-1'
                }`}>
                  <span className="text-gray-400 text-sm">→</span>
                </div>
              </div>

              {/* Active Indicator */}
              {item.isActive && (
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${config.gradient}`}></div>
              )}

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/50">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">💡</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Pro Tip</p>
                <p className="text-xs text-gray-600">Use keyboard shortcuts for faster navigation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 fade-in"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default SideNavigation;
