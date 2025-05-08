import { useState, useEffect } from 'react';
import { Newspaper, Search, Filter, Calendar, ExternalLink } from 'lucide-react';

// Mock news data
const newsData = [
  {
    id: 1,
    title: 'Federal Reserve Raises Interest Rates by 0.25%',
    summary: 'The Federal Reserve announced a quarter-point interest rate hike today, marking the tenth increase since early 2022 as it continues to fight inflation.',
    source: 'Financial Times',
    date: '2023-07-26',
    url: '#',
    category: 'Economy',
    image: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'Tesla Reports Record Quarterly Earnings',
    summary: 'Tesla exceeded Wall Street expectations with record deliveries and earnings in Q2, pushing the stock price up by 8% in after-hours trading.',
    source: 'Reuters',
    date: '2023-07-25',
    url: '#',
    category: 'Earnings',
    image: 'https://images.pexels.com/photos/1472128/pexels-photo-1472128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    title: 'Apple Unveils New AI Strategy at Developer Conference',
    summary: 'Apple announced major AI initiatives at its annual developer conference, focusing on privacy-first machine learning capabilities across its ecosystem.',
    source: 'TechCrunch',
    date: '2023-07-24',
    url: '#',
    category: 'Technology',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    title: 'Oil Prices Surge Amid Middle East Tensions',
    summary: 'Crude oil prices jumped 3% today as geopolitical tensions in the Middle East raised concerns about potential supply disruptions.',
    source: 'Bloomberg',
    date: '2023-07-23',
    url: '#',
    category: 'Commodities',
    image: 'https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 5,
    title: 'Amazon Acquires AI Startup for $1.2 Billion',
    summary: 'Amazon announced the acquisition of a leading AI startup specializing in natural language processing, in a deal valued at $1.2 billion.',
    source: 'CNBC',
    date: '2023-07-22',
    url: '#',
    category: 'M&A',
    image: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 6,
    title: 'Global Markets Rally on Positive Economic Data',
    summary: 'Stock markets worldwide surged today following better-than-expected employment and manufacturing data from major economies.',
    source: 'The Wall Street Journal',
    date: '2023-07-21',
    url: '#',
    category: 'Markets',
    image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 7,
    title: 'Pfizer Announces Breakthrough in Cancer Treatment',
    summary: 'Pharmaceutical giant Pfizer revealed promising Phase 3 trial results for its new cancer immunotherapy drug, sending healthcare stocks higher.',
    source: 'Reuters',
    date: '2023-07-20',
    url: '#',
    category: 'Healthcare',
    image: 'https://images.pexels.com/photos/139398/himalayas-mountains-nepal-himalaya-139398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 8,
    title: 'Retail Sales Drop Unexpectedly in June',
    summary: 'U.S. retail sales fell 0.3% in June, contradicting economist forecasts and raising concerns about consumer spending amid persistent inflation.',
    source: 'Financial Times',
    date: '2023-07-19',
    url: '#',
    category: 'Economy',
    image: 'https://images.pexels.com/photos/264502/pexels-photo-264502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const categories = ['All', 'Economy', 'Markets', 'Technology', 'Earnings', 'Commodities', 'Healthcare', 'M&A'];

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredNews, setFilteredNews] = useState(newsData);
  
  useEffect(() => {
    let result = newsData;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(news => 
        news.title.toLowerCase().includes(query) || 
        news.summary.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(news => news.category === selectedCategory);
    }
    
    setFilteredNews(result);
  }, [searchQuery, selectedCategory]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Newspaper className="h-6 w-6 text-primary-500" />
        Financial News
      </h1>
      
      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Featured news */}
      {filteredNews.length > 0 && (
        <div className="card p-0 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 h-64 md:h-auto">
              <img 
                src={filteredNews[0].image} 
                alt={filteredNews[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full">
                  {filteredNews[0].category}
                </span>
                <span className="text-neutral-500 text-xs flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(filteredNews[0].date)}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">{filteredNews[0].title}</h2>
              <p className="text-neutral-600 mb-4">{filteredNews[0].summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Source: {filteredNews[0].source}</span>
                <a 
                  href={filteredNews[0].url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center"
                >
                  Read more
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* News list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.length > 1 ? (
          filteredNews.slice(1).map((news) => (
            <div key={news.id} className="card hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full">
                    {news.category}
                  </span>
                  <span className="text-neutral-500 text-xs flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(news.date)}
                  </span>
                </div>
                <h3 className="font-bold mb-2">{news.title}</h3>
                <p className="text-sm text-neutral-600 mb-3">{news.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">Source: {news.source}</span>
                  <a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center"
                  >
                    Read more
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          filteredNews.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <Newspaper className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">No news found</h3>
              <p className="text-neutral-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default News;