
import React from 'react';
import { BookOpen, Calendar, TrendingUp, Plus, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../hooks/useAuth';
import { useMistakes } from '../hooks/useMistakes';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { mistakes, getDueForReview } = useMistakes();
  const navigate = useNavigate();
  
  const dueForReview = getDueForReview();
  const totalMistakes = mistakes.length;
  const recentMistakes = mistakes.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">EdAtlas</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {dueForReview.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {dueForReview.length}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-gray-600">
            Track your learning journey and master your mistakes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Total Mistakes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalMistakes}</div>
              <p className="text-blue-100 text-sm">Logged for review</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Due for Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{dueForReview.length}</div>
              <p className="text-emerald-100 text-sm">Ready to practice</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mistakes.filter(m => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(m.createdAt) > weekAgo;
                }).length}
              </div>
              <p className="text-purple-100 text-sm">New mistakes added</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button 
            onClick={() => navigate('/add-mistake')}
            className="h-16 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="flex flex-col items-center space-y-1">
              <Plus className="w-6 h-6" />
              <span className="text-sm font-semibold">Add Mistake</span>
            </div>
          </Button>

          <Button 
            onClick={() => navigate('/logbook')}
            variant="outline"
            className="h-16 border-2 border-blue-200 hover:border-blue-300 rounded-xl hover:bg-blue-50 transition-all duration-200"
          >
            <div className="flex flex-col items-center space-y-1">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">View Logbook</span>
            </div>
          </Button>

          <Button 
            onClick={() => navigate('/calendar')}
            variant="outline"
            className="h-16 border-2 border-emerald-200 hover:border-emerald-300 rounded-xl hover:bg-emerald-50 transition-all duration-200"
          >
            <div className="flex flex-col items-center space-y-1">
              <Calendar className="w-6 h-6 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-600">Calendar</span>
            </div>
          </Button>

          <Button 
            variant="outline"
            className="h-16 border-2 border-purple-200 hover:border-purple-300 rounded-xl hover:bg-purple-50 transition-all duration-200"
            disabled={dueForReview.length === 0}
          >
            <div className="flex flex-col items-center space-y-1">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600">Review</span>
            </div>
          </Button>
        </div>

        {/* Recent Mistakes */}
        {recentMistakes.length > 0 && (
          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Recent Mistakes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMistakes.map((mistake) => (
                  <div key={mistake.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{mistake.subject}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{mistake.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Added {new Date(mistake.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
