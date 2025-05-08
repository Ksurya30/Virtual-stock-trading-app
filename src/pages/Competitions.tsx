import { useState, useEffect } from 'react';
import { Trophy, Users, Calendar, ArrowUp, TrendingUp, PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

// Mock competitions data
const competitionsData = [
  {
    id: 1,
    name: 'Summer Stock Challenge',
    description: 'Compete with other traders in our summer stock trading competition. Start with $100k in virtual cash and build the best portfolio.',
    startDate: '2023-06-01',
    endDate: '2023-08-31',
    participants: 342,
    status: 'active',
    joined: true,
    rank: 15,
    portfolioValue: 124680,
    returnPercent: 24.68
  },
  {
    id: 2,
    name: 'Beginner Trading League',
    description: 'A friendly competition for new traders. Learn the basics of trading while competing for prizes.',
    startDate: '2023-07-15',
    endDate: '2023-09-15',
    participants: 187,
    status: 'active',
    joined: false,
    rank: null,
    portfolioValue: null,
    returnPercent: null
  },
  {
    id: 3,
    name: 'Tech Stocks Showdown',
    description: 'Competition focused on technology stocks only. Put your tech industry knowledge to the test!',
    startDate: '2023-08-01',
    endDate: '2023-10-31',
    participants: 156,
    status: 'upcoming',
    joined: false,
    rank: null,
    portfolioValue: null,
    returnPercent: null
  }
];

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, name: 'StockMaster', portfolioValue: 168570, returnPercent: 68.57 },
  { rank: 2, name: 'InvestorPro', portfolioValue: 153920, returnPercent: 53.92 },
  { rank: 3, name: 'TradingGuru', portfolioValue: 146250, returnPercent: 46.25 },
  { rank: 4, name: 'WallStreetWizard', portfolioValue: 138740, returnPercent: 38.74 },
  { rank: 5, name: 'MarketMaker', portfolioValue: 132680, returnPercent: 32.68 },
  { rank: 6, name: 'BullishBaron', portfolioValue: 130120, returnPercent: 30.12 },
  { rank: 7, name: 'StockSage', portfolioValue: 127840, returnPercent: 27.84 },
  { rank: 8, name: 'InvestmentKing', portfolioValue: 126590, returnPercent: 26.59 },
  { rank: 9, name: 'TradingTiger', portfolioValue: 125740, returnPercent: 25.74 },
  { rank: 10, name: 'MarketMaven', portfolioValue: 125180, returnPercent: 25.18 },
  // Current user
  { rank: 15, name: 'You', portfolioValue: 124680, returnPercent: 24.68, isCurrentUser: true }
];

const Competitions = () => {
  const { user } = useAuth();
  const [competitions, setCompetitions] = useState(competitionsData);
  const [leaderboard, setLeaderboard] = useState(leaderboardData);
  const [activeCompetition, setActiveCompetition] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      // Set the first active and joined competition as active
      const activeJoined = competitions.find(comp => comp.status === 'active' && comp.joined);
      if (activeJoined) {
        setActiveCompetition(activeJoined);
      }
      setIsLoading(false);
    }, 500);
  }, []);
  
  const handleJoinCompetition = (id: number) => {
    // In a real app, this would make an API call to join the competition
    setCompetitions(prevCompetitions => 
      prevCompetitions.map(comp => 
        comp.id === id 
          ? { ...comp, joined: true, rank: comp.participants + 1, portfolioValue: 100000, returnPercent: 0 }
          : comp
      )
    );
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Trading Competitions</h1>
      
      {/* Active competition */}
      {activeCompetition && (
        <div className="card bg-primary-50 border-primary-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-primary-700 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-primary-500" />
                {activeCompetition.name}
              </h2>
              <p className="text-primary-600 text-sm mt-1">
                {formatDate(activeCompetition.startDate)} - {formatDate(activeCompetition.endDate)}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-neutral-500">Your Rank</p>
                <p className="text-lg font-bold">{activeCompetition.rank} / {activeCompetition.participants}</p>
              </div>
              
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-neutral-500">Portfolio Value</p>
                <p className="text-lg font-bold">${activeCompetition.portfolioValue.toLocaleString()}</p>
              </div>
              
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-neutral-500">Return</p>
                <p className="text-lg font-bold text-green-600 flex items-center">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  {activeCompetition.returnPercent}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Leaderboard */}
      <div className="card">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary-500" />
          Leaderboard
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Trader
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Portfolio Value
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Return
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {leaderboard.map((entry) => (
                <tr 
                  key={entry.rank} 
                  className={`${
                    entry.isCurrentUser ? 'bg-primary-50 hover:bg-primary-100' : 'hover:bg-neutral-50'
                  } transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      entry.rank <= 3 ? 'text-primary-500' : 'text-neutral-900'
                    }`}>
                      {entry.rank <= 3 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-100 rounded-full">
                          {entry.rank}
                        </span>
                      ) : (
                        entry.rank
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      entry.isCurrentUser ? 'text-primary-700' : 'text-neutral-900'
                    }`}>
                      {entry.name}
                      {entry.isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium">${entry.portfolioValue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="inline-flex items-center text-sm text-green-600">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      {entry.returnPercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Available competitions */}
      <div className="card">
        <h3 className="font-bold mb-4">Available Competitions</h3>
        
        <div className="space-y-4">
          {competitions.map((competition) => (
            <div key={competition.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h4 className="font-bold text-lg">{competition.name}</h4>
                  <p className="text-neutral-600 text-sm">{competition.description}</p>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                    <div className="flex items-center text-sm text-neutral-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
                    </div>
                    <div className="flex items-center text-sm text-neutral-500">
                      <Users className="h-4 w-4 mr-1" />
                      {competition.participants} participants
                    </div>
                    <div className="flex items-center text-sm">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        competition.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {competition.status === 'active' ? 'Active' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  {competition.joined ? (
                    <button className="btn-outline" disabled>
                      Joined
                    </button>
                  ) : (
                    <button 
                      className="btn-primary flex items-center gap-1"
                      onClick={() => handleJoinCompetition(competition.id)}
                    >
                      <PlusCircle className="h-4 w-4" />
                      Join Competition
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Competitions;