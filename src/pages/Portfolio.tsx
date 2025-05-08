import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowDown, Filter, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Mock portfolio data
const mockPortfolioData = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.', shares: 10, avgPrice: 170.25, currentPrice: 182.52, change: 12.27, changePercent: 7.21, marketValue: 1825.20 },
  { id: 2, symbol: 'MSFT', name: 'Microsoft Corp.', shares: 5, avgPrice: 390.12, currentPrice: 417.88, change: 27.76, changePercent: 7.12, marketValue: 2089.40 },
  { id: 3, symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 8, avgPrice: 150.78, currentPrice: 165.27, change: 14.49, changePercent: 9.61, marketValue: 1322.16 },
  { id: 4, symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 7, avgPrice: 185.63, currentPrice: 178.75, change: -6.88, changePercent: -3.71, marketValue: 1251.25 },
  { id: 5, symbol: 'TSLA', name: 'Tesla Inc.', shares: 15, avgPrice: 190.21, currentPrice: 178.04, change: -12.17, changePercent: -6.40, marketValue: 2670.60 }
];

const COLORS = ['#0F52BA', '#36B37E', '#FF8C00', '#9333EA', '#EF4444', '#10B981', '#F59E0B', '#6366F1'];

const Portfolio = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(mockPortfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [filterGainers, setFilterGainers] = useState(false);
  
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  
  const totalValue = portfolio.reduce((sum, stock) => sum + stock.marketValue, 0);
  
  const pieChartData = portfolio.map(stock => ({
    name: stock.symbol,
    value: stock.marketValue,
    color: COLORS[portfolio.indexOf(stock) % COLORS.length]
  }));
  
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };
  
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return 'cursor-pointer';
    }
    return sortConfig.key === name 
      ? `cursor-pointer ${sortConfig.direction === 'ascending' ? 'text-primary-500' : 'text-primary-500'}` 
      : 'cursor-pointer';
  };
  
  // Sort the portfolio data
  const sortedPortfolio = [...portfolio];
  if (sortConfig !== null) {
    sortedPortfolio.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }
  
  // Filter gainers/losers if selected
  const filteredPortfolio = filterGainers 
    ? sortedPortfolio.filter(stock => stock.change > 0)
    : sortedPortfolio;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Portfolio</h1>
      
      {portfolio.length === 0 ? (
        <div className="card text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">Your portfolio is empty</h2>
          <p className="text-neutral-500 mb-6">Start building your portfolio by buying stocks.</p>
          <Link to="/stocks" className="btn-primary">
            Browse Stocks
          </Link>
        </div>
      ) : (
        <>
          {/* Portfolio summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card md:col-span-2">
              <h3 className="font-bold mb-4">Portfolio Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-neutral-500">Total Value</p>
                  <p className="text-xl font-bold">${totalValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Cash Available</p>
                  <p className="text-xl font-bold">${user?.balance.toLocaleString() || '0'}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Open Positions</p>
                  <p className="text-xl font-bold">{portfolio.length}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Total Return</p>
                  <p className="text-xl font-bold text-green-600">+$1,523.45 (8.2%)</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="font-bold mb-4">Allocation</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Portfolio holdings */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Holdings</h3>
              <button
                onClick={() => setFilterGainers(!filterGainers)}
                className={`flex items-center gap-1 text-sm ${
                  filterGainers ? 'text-primary-500' : 'text-neutral-500'
                }`}
              >
                <Filter className="h-4 w-4" />
                {filterGainers ? 'Show All' : 'Show Gainers Only'}
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th 
                      className={`px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider ${getClassNamesFor('symbol')}`}
                      onClick={() => requestSort('symbol')}
                    >
                      Symbol
                    </th>
                    <th 
                      className={`px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider ${getClassNamesFor('shares')}`}
                      onClick={() => requestSort('shares')}
                    >
                      Shares
                    </th>
                    <th 
                      className={`px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider ${getClassNamesFor('avgPrice')}`}
                      onClick={() => requestSort('avgPrice')}
                    >
                      Avg Price
                    </th>
                    <th 
                      className={`px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider ${getClassNamesFor('currentPrice')}`}
                      onClick={() => requestSort('currentPrice')}
                    >
                      Current
                    </th>
                    <th 
                      className={`px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider ${getClassNamesFor('changePercent')}`}
                      onClick={() => requestSort('changePercent')}
                    >
                      Change
                    </th>
                    <th 
                      className={`px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider ${getClassNamesFor('marketValue')}`}
                      onClick={() => requestSort('marketValue')}
                    >
                      Market Value
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {filteredPortfolio.length > 0 ? (
                    filteredPortfolio.map((stock) => (
                      <tr key={stock.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/stocks/${stock.symbol}`} className="text-primary-500 hover:text-primary-600 font-medium">
                            {stock.symbol}
                          </Link>
                          <div className="text-xs text-neutral-500">{stock.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">{stock.shares}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm">${stock.avgPrice.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium">${stock.currentPrice.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`inline-flex items-center text-sm ${
                            stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                            {Math.abs(stock.changePercent).toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium">${stock.marketValue.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Link 
                            to={`/stocks/${stock.symbol}`}
                            className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                          >
                            Trade
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-neutral-500">
                        No stocks found. {filterGainers && 'Try disabling the "Show Gainers Only" filter.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Portfolio;