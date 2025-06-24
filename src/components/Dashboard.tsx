
import React from 'react';
import { BookOpen, Calendar, TrendingUp, Plus, Bell, User, LogOut, Sparkles, Target, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">EdAtlas</h1>
                <p className="text-xs text-gray-500">Elite Learning</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative group">
                <Bell className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                {dueForReview.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center font-medium shadow-lg">
                    {dueForReview.length}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={logout} className="group">
                <LogOut className="w-4 h-4 mr-2 group-hover:text-red-500 transition-colors" />
                <span className="group-hover:text-red-500 transition-colors">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
            Welcome back, {user?.name}! ✨
          </h2>
          <p className="text-gray-600 text-lg">
            Transform your learning journey with intelligent mistake tracking
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen className="w-4 h-4" />
                </div>
                Total Mistakes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{totalMistakes}</div>
              <p className="text-blue-100 text-sm">Logged for mastery</p>
              <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: `${Math.min(totalMistakes * 10, 100)}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <Target className="w-4 h-4" />
                </div>
                Due for Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{dueForReview.length}</div>
              <p className="text-emerald-100 text-sm">Ready to practice</p>
              <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: `${Math.min(dueForReview.length * 20, 100)}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <Zap className="w-4 h-4" />
                </div>
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">
                {mistakes.filter(m => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(m.createdAt) > weekAgo;
                }).length}
              </div>
              <p className="text-purple-100 text-sm">New insights gained</p>
              <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button 
            onClick={() => navigate('/add-mistake')}
            className="h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">Add Mistake</span>
            </div>
          </Button>

          <Button 
            onClick={() => navigate('/logbook')}
            className="h-20 bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-blue-200/50 hover:border-blue-300 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-blue-600">View Logbook</span>
            </div>
          </Button>

          <Button 
            onClick={() => navigate('/calendar')}
            className="h-20 bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-emerald-200/50 hover:border-emerald-300 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm font-semibold text-emerald-600">Calendar</span>
            </div>
          </Button>

          <Button 
            className="h-20 bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-purple-200/50 hover:border-purple-300 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
            disabled={dueForReview.length === 0}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-purple-600">Review</span>
            </div>
          </Button>
        </div>

        {/* Recent Mistakes */}
        {recentMistakes.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-xl shadow-xl border border-gray-100/50 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                Recent Learning Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMistakes.map((mistake, index) => (
                  <div key={mistake.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50/80 to-blue-50/80 rounded-xl hover:from-gray-100/80 hover:to-blue-100/80 transition-all duration-200 border border-gray-100/50">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      index === 0 ? 'bg-gradient-to-br from-blue-500 to-purple-600' :
                      index === 1 ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
                      'bg-gradient-to-br from-purple-500 to-pink-600'
                    }`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{mistake.subject}</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{mistake.description}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
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
