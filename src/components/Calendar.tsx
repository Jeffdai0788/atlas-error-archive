
import React, { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useMistakes } from '../hooks/useMistakes';

const Calendar = () => {
  const navigate = useNavigate();
  const { mistakes, getDueForReview } = useMistakes();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const dueForReview = getDueForReview();

  // Get calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(month - 1);
    } else {
      newDate.setMonth(month + 1);
    }
    setCurrentDate(newDate);
  };

  const getMistakesForDate = (date: Date) => {
    const dateStr = date.toDateString();
    return mistakes.filter(mistake => 
      new Date(mistake.createdAt).toDateString() === dateStr ||
      new Date(mistake.nextReviewDate).toDateString() === dateStr
    );
  };

  const getReviewsForDate = (date: Date) => {
    const dateStr = date.toDateString();
    return mistakes.filter(mistake => 
      new Date(mistake.nextReviewDate).toDateString() === dateStr
    );
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const mistakesOnDate = getMistakesForDate(date);
      const reviewsOnDate = getReviewsForDate(date);
      const isCurrentDay = isToday(date);
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-100 p-2 hover:bg-gray-50 transition-colors duration-150 ${
            isCurrentDay ? 'bg-blue-50 border-blue-200' : ''
          }`}
        >
          <div className={`text-sm font-semibold mb-1 ${
            isCurrentDay ? 'text-blue-600' : 'text-gray-700'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {mistakesOnDate.slice(0, 2).map((mistake) => (
              <div 
                key={mistake.id} 
                className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded truncate"
                title={mistake.subject}
              >
                {mistake.subject}
              </div>
            ))}
            {reviewsOnDate.length > 0 && (
              <div className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Review ({reviewsOnDate.length})
              </div>
            )}
            {mistakesOnDate.length > 2 && (
              <div className="text-xs text-gray-500">
                +{mistakesOnDate.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
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
              <h1 className="text-xl font-bold text-gray-900">Learning Calendar</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Calendar Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-2xl font-bold text-gray-900">
              {monthNames[month]} {year}
            </h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
            <span className="text-sm text-gray-600">Mistake Added</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-emerald-100 border border-emerald-200 rounded"></div>
            <span className="text-sm text-gray-600">Review Due</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
            <span className="text-sm text-gray-600">Today</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{dueForReview.length}</div>
              <div className="text-sm text-gray-600">Due for Review</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {mistakes.filter(m => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(m.createdAt) > weekAgo;
                }).length}
              </div>
              <div className="text-sm text-gray-600">This Week</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {mistakes.filter(m => {
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return new Date(m.createdAt) > monthAgo;
                }).length}
              </div>
              <div className="text-sm text-gray-600">This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Grid */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              <span>Monthly Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-0 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-sm font-semibold text-gray-600 border-b border-gray-200">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-0 border-l border-t border-gray-100">
              {renderCalendarDays()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
