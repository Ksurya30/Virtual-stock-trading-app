import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUp, ArrowDown, Info, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

// Mock stock detail data
const mockStockData = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 182.52,
    change: 1.25,
    changePercent: 0.69,
    marketCap: '2.87T',
    peRatio: 30.1,
    dividend: 0.58,
    volume: '56.2M',
    avgVolume: '59.4M',
    dayRange: '180.17 - 184.95',
    yearRange: '154.76 - 199.62',
    about: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, iPad, Mac, Apple Watch, and services like Apple Music, iCloud, and Apple Pay.',
    chartData: [
      { date: '2023-01-01', value: 130.20 },
      { date: '2023-02-01', value: 143.50 },
      { date: '2023-03-01', value: 157.82 },
      { date: '2023-04-01', value: 169.59 },
      { date: '2023-05-01', value: 172.42 },
      { date: '2023-06-01', value: 185.01 },
      { date: '2023-07-01', value: 190.23 },
      { date: '2023-08-01', value: 187.87 },
      { date: '2023-09-01', value: 178.32 },
      { date: '2023-10-01', value: 173.57 },
      { date: '2023-11-01', value: 176.65 },
      { date: '2023-12-01', value: 185.59 },
      { date: '2024-01-01', value: 188.63 },
      { date: '2024-02-01', value: 180.75 },
      { date: '2024-03-01', value: 178.08 },
      { date: '2024-04-01', value: 182.52 },
    ]
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 417.88,
    change: -2.32,
    changePercent: -0.55,
    marketCap: '3.11T',
    peRatio: 35.3,
    dividend: 0.75,
    volume: '22.8M',
    avgVolume: '24.5M',
    dayRange: '415.26 - 421.15',
    yearRange: '309.47 - 430.82',
    about: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates through three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.',
    chartData: [
      { date: '2023-01-01', value: 239.58 },
      { date: '2023-02-01', value: 249.22 },
      { date: '2023-03-01', value: 279.43 },
      { date: '2023-04-01', value: 304.83 },
      { date: '2023-05-01', value: 328.39 },
      { date: '2023-06-01', value: 339.71 },
      { date: '2023-07-01', value: 345.11 },
      { date: '2023-08-01', value: 326.78 },
      { date: '2023-09-01', value: 318.96 },
      { date: '2023-10-01', value: 334.51 },
      { date: '2023-11-01', value: 370.95 },
      { date: '2023-12-01', value: 376.04 },
      { date: '2024-01-01', value: 405.38 },
      { date: '2024-02-01', value: 410.34 },
      { date: '2024-03-01', value: 415.42 },
      { date: '2024-04-01', value: 417.88 },
    ]
  },
  // More stocks can be added here...
};

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const { user } = useAuth();
  const [stockData, setStockData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shares, setShares] = useState('1');
  const [tradeType, setTradeType] = useState('buy');
  const [timeRange, setTimeRange] = useState('1Y');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (symbol && mockStockData[symbol as keyof typeof mockStockData]) {
      setStockData(mockStockData[symbol as keyof typeof mockStockData]);
      setIsLoading(false);
    } else {
      // Handle case where stock is not found
      setIsLoading(false);
    }
  }, [symbol]);

  const handleTrade = () => {
    const shareCount = parseInt(shares);
    const totalCost = shareCount * stockData.price;
    
    if (isNaN(shareCount) || shareCount <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid number of shares.' });
      return;
    }
    
    if (tradeType === 'buy' && user?.balance < totalCost) {
      setMessage({ type: 'error', text: 'Insufficient funds for this purchase.' });
      return;
    }
    
    // In a real app, this would call an API to execute the trade
    setMessage({ 
      type: 'success', 
      text: `Successfully ${tradeType === 'buy' ? 'purchased' : 'sold'} ${shareCount} shares of ${stockData.symbol} at $${stockData.price.toFixed(2)} per share.` 
    });
    
    // Reset form
    setShares('1');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!stockData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Stock Not Found</h2>
        <p className="mb-6">We couldn't find data for the symbol "{symbol}".</p>
        <Link to="/stocks" className="btn-primary">
          Browse All Stocks
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <Link to="/stocks" className="text-primary-500 hover:text-primary-600">
          ← Back to Stocks
        </Link>
      </div>
      
      {/* Stock header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {stockData.name} ({stockData.symbol})
          </h1>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold mr-3">${stockData.price.toFixed(2)}</span>
            <span className={`inline-flex items-center ${
              stockData.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stockData.change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              ${Math.abs(stockData.change).toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Price History</h3>
            <div className="flex space-x-2">
              {['1W', '1M', '3M', '6M', '1Y', 'All'].map((range) => (
                <button
                  key={range}
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    timeRange === range
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-neutral-500 hover:bg-neutral-100'
                  }`}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stockData.chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { month: 'short' });
                  }}
                />
                <YAxis 
                  domain={['dataMin - 5', 'dataMax + 5']}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    });
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={stockData.change >= 0 ? '#36B37E' : '#EF4444'}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Trade Form */}
        <div className="card">
          <h3 className="font-bold mb-4">Trade {stockData.symbol}</h3>
          
          {message.text && (
            <div className={`mb-4 p-3 rounded-md ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message.text}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Trade Type
              </label>
              <div className="flex">
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 text-center text-sm font-medium ${
                    tradeType === 'buy'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-neutral-700 border border-neutral-300'
                  } rounded-l-md`}
                  onClick={() => setTradeType('buy')}
                >
                  Buy
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 text-center text-sm font-medium ${
                    tradeType === 'sell'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-neutral-700 border border-neutral-300'
                  } rounded-r-md`}
                  onClick={() => setTradeType('sell')}
                >
                  Sell
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="shares" className="block text-sm font-medium text-neutral-700 mb-1">
                Number of Shares
              </label>
              <input
                type="number"
                id="shares"
                min="1"
                step="1"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Market Price
              </label>
              <div className="input bg-neutral-50 flex items-center">
                <DollarSign className="h-4 w-4 text-neutral-500 mr-1" />
                {stockData.price.toFixed(2)}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Estimated Cost
              </label>
              <div className="input bg-neutral-50 flex items-center font-medium">
                <DollarSign className="h-4 w-4 text-neutral-500 mr-1" />
                {(parseFloat(shares) * stockData.price || 0).toFixed(2)}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Available Cash
              </label>
              <div className="input bg-neutral-50 flex items-center">
                <DollarSign className="h-4 w-4 text-neutral-500 mr-1" />
                {user?.balance.toLocaleString() || '0.00'}
              </div>
            </div>
            
            <button
              type="button"
              className={`w-full ${tradeType === 'buy' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={handleTrade}
            >
              {tradeType === 'buy' ? 'Buy Shares' : 'Sell Shares'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Stock Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-neutral-500" />
            About {stockData.symbol}
          </h3>
          <p className="text-neutral-700">{stockData.about}</p>
        </div>
        
        <div className="card">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-neutral-500" />
            Key Statistics
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-500">Market Cap</p>
              <p className="font-medium">{stockData.marketCap}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">P/E Ratio</p>
              <p className="font-medium">{stockData.peRatio}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Dividend Yield</p>
              <p className="font-medium">{stockData.dividend}%</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Volume</p>
              <p className="font-medium">{stockData.volume}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Avg. Volume</p>
              <p className="font-medium">{stockData.avgVolume}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">52-Week Range</p>
              <p className="font-medium">{stockData.yearRange}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;