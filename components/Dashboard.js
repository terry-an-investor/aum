function Dashboard({ funds }) {
  try {
    const totalAssets = funds.reduce((sum, fund) => sum + fund.totalAssets, 0);
    const totalFunds = funds.length;
    const activeFunds = funds.filter(f => f.status === 'active').length;
    const avgReturn = funds.reduce((sum, fund) => sum + fund.returnRate, 0) / funds.length || 0;

    const stats = [
      { label: '总资产管理规模', value: `¥${(totalAssets / 100000000).toFixed(2)}亿`, icon: 'banknote', color: 'blue' },
      { label: '基金总数', value: totalFunds, icon: 'trending-up', color: 'green' },
      { label: '活跃基金', value: activeFunds, icon: 'activity', color: 'yellow' },
      { label: '平均收益率', value: `${avgReturn.toFixed(2)}%`, icon: 'percent', color: 'purple' }
    ];

    return (
      <div className="space-y-6" data-name="dashboard" data-file="components/Dashboard.js">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">仪表盘</h1>
          <button className="btn btn-primary">
            <div className="icon-plus text-sm mr-2"></div>
            创建新基金
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                  <div className={`icon-${stat.icon} text-xl text-${stat.color}-600`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">最新基金动态</h3>
            <div className="space-y-3">
              {funds.slice(0, 5).map(fund => (
                <div key={fund.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{fund.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{fund.type}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${fund.returnRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund.returnRate >= 0 ? '+' : ''}{fund.returnRate.toFixed(2)}%
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">净值: ¥{fund.netValue.toFixed(4)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">风险分析</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>低风险基金</span>
                <span className="font-medium">{funds.filter(f => f.riskLevel === 'low').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>中等风险基金</span>
                <span className="font-medium">{funds.filter(f => f.riskLevel === 'medium').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>高风险基金</span>
                <span className="font-medium">{funds.filter(f => f.riskLevel === 'high').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Dashboard component error:', error);
    return null;
  }
}