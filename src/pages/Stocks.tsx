import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUp, ArrowDown } from 'lucide-react';

// Mock stock data
const allStocksData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 182.52, change: 1.25, changePercent: 0.69, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 417.88, change: -2.32, changePercent: -0.55, sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 165.27, change: 3.58, changePercent: 2.21, sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.75, change: 2.92, changePercent: 1.66, sector: 'Consumer Discretionary' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 178.04, change: -3.55, changePercent: -1.95, sector: 'Consumer Discretionary' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 852.08, change: 15.75, changePercent: 1.88, sector: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 501.32, change: 7.86, changePercent: 1.59, sector: 'Communication Services' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', price: 415.40, change: -1.20, changePercent: -0.29, sector: 'Financials' },
  { symbol: 'V', name: 'Visa Inc.', price: 268.01, change: 0.88, changePercent: 0.33, sector: 'Financials' },
  { symbol: 'WMT', name: 'Walmart Inc.', price: 68.89, change: 0.57, changePercent: 0.83, sector: 'Consumer Staples' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 158.67, change: -0.92, changePercent: -0.58, sector: 'Healthcare' },
  { symbol: 'PG', name: 'Procter & Gamble Co.', price: 169.23, change: 1.05, changePercent: 0.62, sector: 'Consumer Staples' },
  { symbol: 'XOM', name: 'Exxon Mobil Corp.', price: 115.46, change: -1.23, changePercent: -1.05, sector: 'Energy' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 201.50, change: 3.42, changePercent: 1.73, sector: 'Financials' },
  { symbol: 'UNH', name: 'UnitedHealth Group Inc.', price: 538.02, change: -5.78, changePercent: -1.06, sector: 'Healthcare' },
];

const sectors = [
  'All',
  'Technology',
  'Consumer Discretionary',
  'Communication Services',
  'Financials',
  'Consumer Staples',
  'Healthcare',
  'Energy',
];

const Stocks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [filteredStocks, setFilteredStocks] = useState(allStocksData);

  useEffect(() => {
    let result = allStocksData;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(stock => 
        stock.symbol.toLowerCase().includes(query) || 
        stock.name.toLowerCase().includes(query)
      );
    }
    
    // Filter by sector
    if (selectedSector !== 'All') {
      result = result.filter(stock => stock.sector === selectedSector);
    }
    
    setFilteredStocks(result);
  }, [searchQuery, selectedSector]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Stocks</h1>
      
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search stocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-auto">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="input"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Stocks table */}
      <div className="card">
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
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Sector
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
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">{stock.symbol}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-700">{stock.name}</div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-500">{stock.sector}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-neutral-900">${stock.price.toFixed(2)}</div>
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-neutral-500">
                    No stocks found. Try a different search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stocks;