function Sidebar({ activeView, setActiveView }) {
  try {
    const menuItems = [
      { id: 'dashboard', label: '仪表盘', icon: 'chart-bar' },
      { id: 'funds', label: '基金管理', icon: 'trending-up' },
      { id: 'trading', label: '交易管理', icon: 'arrow-right-left' },
      { id: 'lifecycle', label: '生命周期', icon: 'rotate-cw' }
    ];

    return (
      <div className="sidebar" data-name="sidebar" data-file="components/Sidebar.js">
        <div className="p-6 border-b border-[var(--border-color)]">
          <h1 className="text-xl font-bold text-[var(--primary-color)]">基金管理系统</h1>
        </div>
        
        <nav className="mt-6">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeView === item.id ? 'bg-blue-50 text-[var(--primary-color)] border-r-2 border-[var(--primary-color)]' : 'text-[var(--text-secondary)]'
              }`}
            >
              <div className={`icon-${item.icon} text-lg mr-3`}></div>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    );
  } catch (error) {
    console.error('Sidebar component error:', error);
    return null;
  }
}