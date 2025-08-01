// Sample fund data for the fund management system
function getSampleFunds() {
  return [
    {
      id: '1',
      name: '稳健增长基金',
      code: 'ZJ001',
      type: '混合型基金',
      netValue: 1.2345,
      returnRate: 8.56,
      totalAssets: 1500000000,
      status: 'active',
      riskLevel: 'medium',
      lifecycleStage: 'operation',
      establishDate: '2023-03-15',
      manager: '张基金'
    },
    {
      id: '2',
      name: '科技创新基金',
      code: 'KJ002',
      type: '股票型基金',
      netValue: 1.5678,
      returnRate: 15.23,
      totalAssets: 2800000000,
      status: 'active',
      riskLevel: 'high',
      lifecycleStage: 'operation',
      establishDate: '2023-01-20',
      manager: '李投资'
    },
    {
      id: '3',
      name: '价值投资基金',
      code: 'JZ003',
      type: '股票型基金',
      netValue: 1.1234,
      returnRate: 6.78,
      totalAssets: 980000000,
      status: 'active',
      riskLevel: 'medium',
      lifecycleStage: 'operation',
      establishDate: '2022-11-10',
      manager: '王价值'
    },
    {
      id: '4',
      name: '货币市场基金',
      code: 'HB004',
      type: '货币型基金',
      netValue: 1.0045,
      returnRate: 2.34,
      totalAssets: 5600000000,
      status: 'active',
      riskLevel: 'low',
      lifecycleStage: 'operation',
      establishDate: '2023-05-08',
      manager: '赵货币'
    },
    {
      id: '5',
      name: '新兴市场基金',
      code: 'XM005',
      type: '股票型基金',
      netValue: 0.9876,
      returnRate: -3.45,
      totalAssets: 750000000,
      status: 'pending',
      riskLevel: 'high',
      lifecycleStage: 'raising',
      establishDate: '2024-02-01',
      manager: '孙新兴'
    },
    {
      id: '6',
      name: '债券稳健基金',
      code: 'ZQ006',
      type: '债券型基金',
      netValue: 1.0789,
      returnRate: 4.12,
      totalAssets: 1200000000,
      status: 'active',
      riskLevel: 'low',
      lifecycleStage: 'operation',
      establishDate: '2023-09-12',
      manager: '周债券'
    }
  ];
}

// Utility functions for fund data manipulation
function calculatePortfolioValue(funds) {
  return funds.reduce((total, fund) => total + fund.totalAssets, 0);
}

function getFundsByRiskLevel(funds, riskLevel) {
  return funds.filter(fund => fund.riskLevel === riskLevel);
}


function getFundsByStatus(funds, status) {
  return funds.filter(fund => fund.status === status);
}

function getTopPerformingFunds(funds, limit = 5) {
  return funds
    .sort((a, b) => b.returnRate - a.returnRate)
    .slice(0, limit);
}