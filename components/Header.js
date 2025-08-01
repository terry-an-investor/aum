function Header() {
  try {
    const currentTime = new Date().toLocaleString('zh-CN');

    return (
      <header className="header" data-name="header" data-file="components/Header.js">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">基金管理系统</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-[var(--text-secondary)]">{currentTime}</span>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
              <div className="icon-user text-sm text-white"></div>
            </div>
            <span className="text-sm font-medium">基金经理</span>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}