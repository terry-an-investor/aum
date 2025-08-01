function FundList({ funds, setFunds }) {
  try {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filterStatus, setFilterStatus] = React.useState('all');

    const filteredFunds = funds.filter(fund => {
      const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || fund.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    const handleStatusChange = async (fundId, newStatus) => {
      try {
        const fund = funds.find(f => f.id === fundId);
        const updatedData = { 
          ...fund, 
          status: newStatus,
          netValue: parseFloat(fund.netValue) || 0,
          returnRate: parseFloat(fund.returnRate) || 0,
          totalAssets: parseFloat(fund.totalAssets) || 0
        };
        delete updatedData.id; // Remove id from objectData
        
        await trickleUpdateObject('fund', fundId, updatedData);
        
        setFunds(prevFunds => 
          prevFunds.map(fund => 
            fund.id === fundId ? { ...fund, status: newStatus } : fund
          )
        );
      } catch (error) {
        console.error('Error updating fund status:', error);
        alert('更新基金状态失败，请重试');
      }
    };

    const getStatusBadge = (status) => {
      const styles = {
        active: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        closed: 'bg-red-100 text-red-800'
      };
      const labels = {
        active: '运行中',
        pending: '待启动',
        closed: '已关闭'
      };
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${styles[status]}`}>
          {labels[status]}
        </span>
      );
    };

    return (
      <div className="space-y-6" data-name="fund-list" data-file="components/FundList.js">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">基金管理</h1>
          <button className="btn btn-primary">
            <div className="icon-plus text-sm mr-2"></div>
            添加基金
          </button>
        </div>

        <div className="card">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="搜索基金名称..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            >
              <option value="all">全部状态</option>
              <option value="active">运行中</option>
              <option value="pending">待启动</option>
              <option value="closed">已关闭</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-3 px-4">基金名称</th>
                  <th className="text-left py-3 px-4">类型</th>
                  <th className="text-left py-3 px-4">净值</th>
                  <th className="text-left py-3 px-4">收益率</th>
                  <th className="text-left py-3 px-4">资产规模</th>
                  <th className="text-left py-3 px-4">状态</th>
                  <th className="text-left py-3 px-4">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredFunds.map(fund => (
                  <tr key={fund.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{fund.name}</p>
                        <p className="text-sm text-[var(--text-secondary)]">代码: {fund.code}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{fund.type}</td>
                    <td className="py-3 px-4">¥{fund.netValue.toFixed(4)}</td>
                    <td className="py-3 px-4">
                      <span className={fund.returnRate >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {fund.returnRate >= 0 ? '+' : ''}{fund.returnRate.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">¥{(fund.totalAssets / 100000000).toFixed(2)}亿</td>
                    <td className="py-3 px-4">{getStatusBadge(fund.status)}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="btn-secondary text-xs px-2 py-1">详情</button>
                        <button className="btn-primary text-xs px-2 py-1">编辑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('FundList component error:', error);
    return null;
  }
}