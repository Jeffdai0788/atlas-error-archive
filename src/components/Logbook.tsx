
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Calendar, Eye, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useMistakes } from '../hooks/useMistakes';

const Logbook = () => {
  const navigate = useNavigate();
  const { mistakes, deleteMistake } = useMistakes();
  const [sortBy, setSortBy] = useState<'recent' | 'subject' | 'difficulty'>('recent');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | '1' | '2' | '3'>('all');

  const filteredAndSortedMistakes = mistakes
    .filter(mistake => filterDifficulty === 'all' || mistake.difficultyLevel.toString() === filterDifficulty)
    .sort((a, b) => {
      switch (sortBy) {
        case 'subject':
          return a.subject.localeCompare(b.subject);
        case 'difficulty':
          return b.difficultyLevel - a.difficultyLevel;
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-100 text-green-800 border-green-200';
      case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 3: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyLabel = (level: number) => {
    switch (level) {
      case 1: return '🟢 Easy';
      case 2: return '🟡 Medium';
      case 3: return '🔴 Hard';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-bold text-gray-900">My Learning Logbook</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recent</SelectItem>
                    <SelectItem value="subject">Subject</SelectItem>
                    <SelectItem value="difficulty">Difficulty</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterDifficulty} onValueChange={(value: any) => setFilterDifficulty(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="1">🟢 Easy</SelectItem>
                    <SelectItem value="2">🟡 Medium</SelectItem>
                    <SelectItem value="3">🔴 Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{mistakes.length}</div>
              <div className="text-sm text-gray-600">Total Mistakes</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {mistakes.filter(m => m.difficultyLevel === 1).length}
              </div>
              <div className="text-sm text-gray-600">Easy</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {mistakes.filter(m => m.difficultyLevel === 2).length}
              </div>
              <div className="text-sm text-gray-600">Medium</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {mistakes.filter(m => m.difficultyLevel === 3).length}
              </div>
              <div className="text-sm text-gray-600">Hard</div>
            </CardContent>
          </Card>
        </div>

        {/* Mistakes List */}
        {filteredAndSortedMistakes.length === 0 ? (
          <Card className="bg-white shadow-sm">
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No mistakes yet!</h3>
              <p className="text-gray-600 mb-6">Start building your learning logbook by adding your first mistake.</p>
              <Button 
                onClick={() => navigate('/add-mistake')}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
              >
                Add Your First Mistake
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedMistakes.map((mistake) => (
              <Card key={mistake.id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {mistake.subject}
                      </h3>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(mistake.difficultyLevel)}`}>
                        {getDifficultyLabel(mistake.difficultyLevel)}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMistake(mistake.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {mistake.description}
                  </p>

                  {(mistake.problemImage || mistake.solutionImage) && (
                    <div className="flex space-x-2 mb-4">
                      {mistake.problemImage && (
                        <img 
                          src={mistake.problemImage} 
                          alt="Problem" 
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                      )}
                      {mistake.solutionImage && (
                        <img 
                          src={mistake.solutionImage} 
                          alt="Solution" 
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(mistake.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      Reviews: {mistake.reviewCount}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/review/${mistake.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Logbook;
