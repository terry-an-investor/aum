function LifecycleManager({ funds, setFunds }) {
  try {
    const [selectedFund, setSelectedFund] = React.useState('');
    const [newStage, setNewStage] = React.useState('');

    const lifecycleStages = [
      { id: 'planning', name: '规划设计', description: '基金产品设计和策略制定' },
      { id: 'approval', name: '审批备案', description: '监管机构审批和备案流程' },
      { id: 'raising', name: '募集期', description: '向投资者募集资金' },
      { id: 'establishment', name: '成立', description: '基金正式成立并开始运作' },
      { id: 'operation', name: '运作期', description: '基金投资运作和管理' },
      { id: 'liquidation', name: '清算', description: '基金清算和资产分配' }
    ];

    const handleStageUpdate = async () => {
      if (!selectedFund || !newStage) return;
      
      try {
        const fund = funds.find(f => f.id === selectedFund);
        const updatedData = { 
          ...fund, 
          lifecycleStage: newStage,
          netValue: parseFloat(fund.netValue) || 0,
          returnRate: parseFloat(fund.returnRate) || 0,
          totalAssets: parseFloat(fund.totalAssets) || 0
        };
        delete updatedData.id; // Remove id from objectData
        
        await trickleUpdateObject('fund', selectedFund, updatedData);
        
        setFunds(prevFunds => 
          prevFunds.map(fund => 
            fund.id === selectedFund 
              ? { ...fund, lifecycleStage: newStage } 
              : fund
          )
        );
        
        setSelectedFund('');
        setNewStage('');
      } catch (error) {
        console.error('Error updating lifecycle stage:', error);
        alert('更新生命周期阶段失败，请重试');
      }
    };

    const getStageColor = (stage) => {
      const colors = {
        planning: 'bg-blue-100 text-blue-800',
        approval: 'bg-yellow-100 text-yellow-800',
        raising: 'bg-purple-100 text-purple-800',
        establishment: 'bg-green-100 text-green-800',
        operation: 'bg-emerald-100 text-emerald-800',
        liquidation: 'bg-red-100 text-red-800'
      };
      return colors[stage] || 'bg-gray-100 text-gray-800';
    };

    return (
      <div className="space-y-6" data-name="lifecycle-manager" data-file="components/LifecycleManager.js">
        <h1 className="text-2xl font-bold">生命周期管理</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">更新生命周期阶段</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">选择基金</label>
                <select
                  value={selectedFund}
                  onChange={(e) => setSelectedFund(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg"
                >
                  <option value="">请选择基金</option>
                  {funds.map(fund => (
                    <option key={fund.id} value={fund.id}>{fund.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">新阶段</label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg"
                >
                  <option value="">请选择阶段</option>
                  {lifecycleStages.map(stage => (
                    <option key={stage.id} value={stage.id}>{stage.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleStageUpdate}
                className="btn btn-primary w-full"
              >
                更新阶段
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">生命周期阶段说明</h3>
            <div className="space-y-3">
              {lifecycleStages.map(stage => (
                <div key={stage.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{stage.name}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{stage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">基金生命周期状态</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-3 px-4">基金名称</th>
                  <th className="text-left py-3 px-4">当前阶段</th>
                  <th className="text-left py-3 px-4">成立日期</th>
                  <th className="text-left py-3 px-4">状态</th>
                </tr>
              </thead>
              <tbody>
                {funds.map(fund => (
                  <tr key={fund.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{fund.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStageColor(fund.lifecycleStage)}`}>
                        {lifecycleStages.find(s => s.id === fund.lifecycleStage)?.name || '未设置'}
                      </span>
                    </td>
                    <td className="py-3 px-4">{fund.establishDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        fund.status === 'active' ? 'bg-green-100 text-green-800' : 
                        fund.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {fund.status === 'active' ? '运行中' : 
                         fund.status === 'pending' ? '待启动' : '已关闭'}
                      </span>
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
    console.error('LifecycleManager component error:', error);
    return null;
  }
}
