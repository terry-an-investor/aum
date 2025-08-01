function TradingPanel({ funds }) {
  try {
    const [selectedFund, setSelectedFund] = React.useState('');
    const [tradeType, setTradeType] = React.useState('buy');
    const [amount, setAmount] = React.useState('');
    const [trades, setTrades] = React.useState([]);

    React.useEffect(() => {
      const loadTransactions = async () => {
        try {
          const result = await trickleListObjects('transaction', 100, true);
          const transactionData = result.items.map(item => ({
            id: item.objectId,
            fundName: item.objectData.fundName,
            type: item.objectData.type,
            amount: parseFloat(item.objectData.amount) || 0,
            price: parseFloat(item.objectData.price) || 0,
            time: item.objectData.transactionTime
          }));
          setTrades(transactionData);
        } catch (error) {
          console.error('Error loading transactions:', error);
          // Fallback to sample data
          setTrades([
            { id: 1, fundName: '稳健增长基金', type: 'buy', amount: 1000000, price: 1.2345, time: '2024-01-15 09:30:00' },
            { id: 2, fundName: '科技创新基金', type: 'sell', amount: 500000, price: 1.5678, time: '2024-01-15 10:15:00' },
            { id: 3, fundName: '价值投资基金', type: 'buy', amount: 2000000, price: 1.1234, time: '2024-01-15 11:00:00' }
          ]);
        }
      };
      
      loadTransactions();
    }, []);

    const handleTrade = async () => {
      if (!selectedFund || !amount) return;
      
      try {
        const fund = funds.find(f => f.id === selectedFund);
        const newTradeData = {
          fundId: selectedFund,
          fundName: fund.name,
          type: tradeType,
          amount: parseFloat(amount),
          price: fund.netValue,
          transactionTime: new Date().toLocaleString('zh-CN')
        };
        
        const createdTrade = await trickleCreateObject('transaction', newTradeData);
        
        const newTrade = {
          id: createdTrade.objectId,
          ...createdTrade.objectData
        };
        
        setTrades([newTrade, ...trades]);
        setAmount('');
      } catch (error) {
        console.error('Error creating transaction:', error);
        alert('创建交易失败，请重试');
      }
    };

    return (
      <div className="space-y-6" data-name="trading-panel" data-file="components/TradingPanel.js">
        <h1 className="text-2xl font-bold">交易管理</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">新建交易</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">选择基金</label>
                <select
                  value={selectedFund}
                  onChange={(e) => setSelectedFund(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                >
                  <option value="">请选择基金</option>
                  {funds.map(fund => (
                    <option key={fund.id} value={fund.id}>
                      {fund.name} (¥{fund.netValue.toFixed(4)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">交易类型</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="buy"
                      checked={tradeType === 'buy'}
                      onChange={(e) => setTradeType(e.target.value)}
                      className="mr-2"
                    />
                    申购
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="sell"
                      checked={tradeType === 'sell'}
                      onChange={(e) => setTradeType(e.target.value)}
                      className="mr-2"
                    />
                    赎回
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">交易金额 (元)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="请输入交易金额"
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              </div>

              <button
                onClick={handleTrade}
                className={`btn w-full ${tradeType === 'buy' ? 'btn-success' : 'btn-warning'}`}
              >
                <div className={`icon-${tradeType === 'buy' ? 'trending-up' : 'trending-down'} text-sm mr-2`}></div>
                {tradeType === 'buy' ? '确认申购' : '确认赎回'}
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">交易统计</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {trades.filter(t => t.type === 'buy').length}
                </p>
                <p className="text-sm text-green-700">今日申购</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">
                  {trades.filter(t => t.type === 'sell').length}
                </p>
                <p className="text-sm text-yellow-700">今日赎回</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">交易记录</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-3 px-4">基金名称</th>
                  <th className="text-left py-3 px-4">交易类型</th>
                  <th className="text-left py-3 px-4">交易金额</th>
                  <th className="text-left py-3 px-4">净值</th>
                  <th className="text-left py-3 px-4">交易时间</th>
                </tr>
              </thead>
              <tbody>
                {trades.map(trade => (
                  <tr key={trade.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{trade.fundName}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        trade.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {trade.type === 'buy' ? '申购' : '赎回'}
                      </span>
                    </td>
                    <td className="py-3 px-4">¥{trade.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">¥{trade.price.toFixed(4)}</td>
                    <td className="py-3 px-4">{trade.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('TradingPanel component error:', error);
    return null;
  }
}