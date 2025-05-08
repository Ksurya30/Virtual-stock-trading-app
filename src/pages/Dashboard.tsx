import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, DollarSign, Briefcase, BarChart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
const portfolioChartData = [
  { date: 'Jan', value: 10000 },
  { date: 'Feb', value: 12000 },
  { date: 'Mar', value: 11500 },
  { date: 'Apr', value: 13500 },
  { date: 'May', value: 14200 },
  { date: 'Jun', value: 16000 },
  { date: 'Jul', value: 15500 },
];

const stockData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 182.52, change: 1.25, changePercent: 0.69 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 417.88, change: -2.32, changePercent: -0.55 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 165.27, change: 3.58, changePercent: 2.21 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.75, change: 2.92, changePercent: 1.66 },
];

interface PortfolioSummary {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  totalGain: number;
  totalGainPercent: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary>({
    totalValue: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
    totalGain: 0,
    totalGainPercent: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to get portfolio summary
    setTimeout(() => {
      setPortfolioSummary({
        totalValue: 16000,
        dailyChange: 250,
        dailyChangePercent: 1.59,
        totalGain: 6000,
        totalGainPercent: 60
      });
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link to="/stocks" className="btn-primary">
          Trade Stocks
        </Link>
      </div>

      {/* Portfolio summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Total Portfolio Value</p>
              <h3 className="text-2xl font-bold">${portfolioSummary.totalValue.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-primary-100 rounded-full">
              <Briefcase className="h-5 w-5 text-primary-500" />
            </div>
          </div>
          <div className="mt-2">
            <span className={`inline-flex items-center text-sm ${
              portfolioSummary.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {portfolioSummary.dailyChange >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              ${Math.abs(portfolioSummary.dailyChange).toLocaleString()} ({portfolioSummary.dailyChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Available Cash</p>
              <h3 className="text-2xl font-bold">${user?.balance.toLocaleString() || '0'}</h3>
            </div>
            <div className="p-2 bg-secondary-100 rounded-full">
              <DollarSign className="h-5 w-5 text-secondary-500" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-neutral-500">
              Available for trading
            </span>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Total Gain/Loss</p>
              <h3 className="text-2xl font-bold">${portfolioSummary.totalGain.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-accent-100 rounded-full">
              <BarChart className="h-5 w-5 text-accent-500" />
            </div>
          </div>
          <div className="mt-2">
            <span className={`inline-flex items-center text-sm ${
              portfolioSummary.totalGain >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {portfolioSummary.totalGain >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {portfolioSummary.totalGainPercent.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">Open Positions</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
            <div className="p-2 bg-primary-100 rounded-full">
              <TrendingUp className="h-5 w-5 text-primary-500" />
            </div>
          </div>
          <div className="mt-2">
            <Link to="/portfolio" className="text-sm text-primary-500 hover:text-primary-600">
              View all positions
            </Link>
          </div>
        </div>
      </div>

      {/* Portfolio chart */}
      <div className="card">
        <h3 className="font-bold mb-4">Portfolio Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={portfolioChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="date" />
              <YAxis 
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                width={80}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#0F52BA" 
                fill="#e6f0ff" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Watchlist */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Market Movers</h3>
          <Link to="/stocks" className="text-sm text-primary-500 hover:text-primary-600">
            View all stocks
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {stockData.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-900">{stock.symbol}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-700">{stock.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-neutral-900">${stock.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`inline-flex items-center text-sm ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                      ${Math.abs(stock.change).toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </span>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;