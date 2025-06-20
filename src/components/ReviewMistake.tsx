
import React, { useState } from 'react';
import { ArrowLeft, ThumbsUp, ThumbsDown, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { useMistakes } from '../hooks/useMistakes';

const ReviewMistake = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mistakes, updateMistakeReview } = useMistakes();
  const [showSolution, setShowSolution] = useState(false);
  
  const mistake = mistakes.find(m => m.id === id);
  
  if (!mistake) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mistake not found</h2>
            <Button onClick={() => navigate('/logbook')}>
              Back to Logbook
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleReviewComplete = (result: 'easy' | 'medium' | 'hard' | 'failed') => {
    updateMistakeReview(mistake.id, result);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/logbook')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Review Mistake</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mistake Details */}
        <Card className="bg-white shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{mistake.subject}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Added: {new Date(mistake.createdAt).toLocaleDateString()}</span>
              <span>Reviews: {mistake.reviewCount}</span>
              <span>Next review: {new Date(mistake.nextReviewDate).toLocaleDateString()}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{mistake.description}</p>
            
            {/* Problem Image */}
            {mistake.problemImage && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Problem:</h3>
                <img 
                  src={mistake.problemImage} 
                  alt="Problem" 
                  className="w-full max-w-2xl rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            )}

            {/* Solution Toggle */}
            {mistake.solutionImage && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Solution:</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowSolution(!showSolution)}
                  >
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                  </Button>
                </div>
                
                {showSolution && (
                  <img 
                    src={mistake.solutionImage} 
                    alt="Solution" 
                    className="w-full max-w-2xl rounded-lg border border-gray-200 shadow-sm animate-fade-in"
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Review Actions */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>How did you do?</span>
            </CardTitle>
            <p className="text-gray-600">Your response will adjust the spaced repetition schedule.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                onClick={() => handleReviewComplete('easy')}
                className="h-20 bg-green-500 hover:bg-green-600 text-white flex flex-col items-center justify-center space-y-2"
              >
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Easy</span>
                <span className="text-xs opacity-90">Understood perfectly</span>
              </Button>
              
              <Button 
                onClick={() => handleReviewComplete('medium')}
                className="h-20 bg-blue-500 hover:bg-blue-600 text-white flex flex-col items-center justify-center space-y-2"
              >
                <ThumbsUp className="w-6 h-6" />
                <span className="font-semibold">Good</span>
                <span className="text-xs opacity-90">Got it with some thought</span>
              </Button>
              
              <Button 
                onClick={() => handleReviewComplete('hard')}
                className="h-20 bg-yellow-500 hover:bg-yellow-600 text-white flex flex-col items-center justify-center space-y-2"
              >
                <Clock className="w-6 h-6" />
                <span className="font-semibold">Hard</span>
                <span className="text-xs opacity-90">Struggled but got it</span>
              </Button>
              
              <Button 
                onClick={() => handleReviewComplete('failed')}
                className="h-20 bg-red-500 hover:bg-red-600 text-white flex flex-col items-center justify-center space-y-2"
              >
                <ThumbsDown className="w-6 h-6" />
                <span className="font-semibold">Failed</span>
                <span className="text-xs opacity-90">Need to review again soon</span>
              </Button>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Spaced Repetition Guide:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Easy:</strong> Longer interval before next review</li>
                <li>• <strong>Good:</strong> Standard progression in schedule</li>
                <li>• <strong>Hard:</strong> Same interval or slightly shorter</li>
                <li>• <strong>Failed:</strong> Reset to shorter review interval</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewMistake;
