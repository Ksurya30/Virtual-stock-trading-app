import { useState } from 'react';
import { Lightbulb, BookOpen, Search, GraduationCap, Clock, ArrowRight } from 'lucide-react';

// Mock tutorial data
const tutorialsData = [
  {
    id: 1,
    title: 'Introduction to Stock Trading',
    description: 'Learn the basics of stock trading, key terminology, and how the market works.',
    level: 'Beginner',
    duration: '30 min',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Basics'
  },
  {
    id: 2,
    title: 'Understanding Market Orders',
    description: 'Explore different types of orders and when to use them for optimal trading.',
    level: 'Beginner',
    duration: '25 min',
    image: 'https://images.pexels.com/photos/4968386/pexels-photo-4968386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Basics'
  },
  {
    id: 3,
    title: 'Fundamental Analysis Explained',
    description: 'Learn how to analyze company financials and make informed investment decisions.',
    level: 'Intermediate',
    duration: '45 min',
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Analysis'
  },
  {
    id: 4,
    title: 'Technical Analysis Basics',
    description: 'Understand how to read charts and use technical indicators for better trading.',
    level: 'Intermediate',
    duration: '40 min',
    image: 'https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Analysis'
  },
  {
    id: 5,
    title: 'Risk Management Strategies',
    description: 'Learn essential risk management techniques to protect your portfolio.',
    level: 'Intermediate',
    duration: '35 min',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Strategy'
  },
  {
    id: 6,
    title: 'Building a Diversified Portfolio',
    description: 'Discover how to create a balanced portfolio across different sectors and assets.',
    level: 'Intermediate',
    duration: '30 min',
    image: 'https://images.pexels.com/photos/7567460/pexels-photo-7567460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Strategy'
  },
  {
    id: 7,
    title: 'Advanced Trading Patterns',
    description: 'Master complex chart patterns and advanced technical analysis techniques.',
    level: 'Advanced',
    duration: '50 min',
    image: 'https://images.pexels.com/photos/6774434/pexels-photo-6774434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Analysis'
  },
  {
    id: 8,
    title: 'Options Trading for Beginners',
    description: 'Learn the basics of options trading and strategies for generating income.',
    level: 'Intermediate',
    duration: '45 min',
    image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Advanced'
  }
];

const categories = ['All', 'Basics', 'Analysis', 'Strategy', 'Advanced'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const Education = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  
  // Filter tutorials based on search, category and level
  const filteredTutorials = tutorialsData.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || tutorial.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <GraduationCap className="h-6 w-6 text-primary-500" />
        Trading Education
      </h1>
      
      {/* Hero section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8 md:py-12 md:px-10">
          <div className="max-w-3xl">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
              Learn to Trade Like a Pro
            </h2>
            <p className="text-primary-100 mb-6">
              Browse our collection of trading tutorials and resources to improve your skills and 
              maximize your virtual portfolio's performance.
            </p>
            <div className="flex gap-3">
              <button className="btn bg-white text-primary-600 hover:bg-primary-50">
                Start Learning
              </button>
              <button className="btn border border-white text-white hover:bg-primary-500">
                View Curriculum
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
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
          
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="input"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Tutorials grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.length > 0 ? (
          filteredTutorials.map((tutorial) => (
            <div 
              key={tutorial.id} 
              className="card overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={tutorial.image} 
                  alt={tutorial.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    tutorial.level === 'Beginner' 
                      ? 'bg-green-100 text-green-800' 
                      : tutorial.level === 'Intermediate'
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-purple-100 text-purple-800'
                  }`}>
                    {tutorial.level}
                  </span>
                  <span className="inline-flex items-center text-xs text-neutral-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {tutorial.duration}
                  </span>
                </div>
                <h3 className="font-bold mb-2">{tutorial.title}</h3>
                <p className="text-sm text-neutral-600 mb-4">{tutorial.description}</p>
                <button className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
                  Start Tutorial
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">No tutorials found</h3>
            <p className="text-neutral-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
      
      {/* Quick tips section */}
      <div className="bg-secondary-50 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-secondary-500" />
          Quick Trading Tips
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded p-4 border border-secondary-100">
            <h4 className="font-medium mb-2">Diversify Your Portfolio</h4>
            <p className="text-sm text-neutral-600">
              Don't put all your eggs in one basket. Spread your investments across different sectors and asset classes.
            </p>
          </div>
          
          <div className="bg-white rounded p-4 border border-secondary-100">
            <h4 className="font-medium mb-2">Use Stop-Loss Orders</h4>
            <p className="text-sm text-neutral-600">
              Protect your investments by setting stop-loss orders to automatically sell when a stock falls below a certain price.
            </p>
          </div>
          
          <div className="bg-white rounded p-4 border border-secondary-100">
            <h4 className="font-medium mb-2">Research Before Investing</h4>
            <p className="text-sm text-neutral-600">
              Always do your homework before buying a stock. Look at the company's financials, news, and industry trends.
            </p>
          </div>
          
          <div className="bg-white rounded p-4 border border-secondary-100">
            <h4 className="font-medium mb-2">Don't Chase Trends</h4>
            <p className="text-sm text-neutral-600">
              By the time you hear about a hot stock in the news, it might be too late. Focus on value rather than hype.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;