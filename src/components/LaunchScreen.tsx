
import React from 'react';
import { GraduationCap, BookOpen, Target } from 'lucide-react';

const LaunchScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-800 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-emerald-300 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-300 rounded-full animate-ping"></div>
      </div>

      <div className="text-center z-10 px-8">
        {/* Logo */}
        <div className="mb-8 relative">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-2xl mb-4 animate-scale-in">
            <GraduationCap className="w-12 h-12 text-blue-800" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full animate-bounce">
            <Target className="w-4 h-4 text-white m-2" />
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-5xl font-bold text-white mb-2 animate-fade-in">
          EdAtlas
        </h1>
        <p className="text-blue-100 text-lg mb-8 animate-fade-in">
          Elite Learning Companion
        </p>

        {/* Loading indicator */}
        <div className="flex items-center justify-center space-x-2">
          <BookOpen className="w-5 h-5 text-emerald-300 animate-spin" />
          <span className="text-white text-sm">Loading your learning journey...</span>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-blue-700 rounded-full mt-4 mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-blue-300 rounded-full animate-[loading_2.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default LaunchScreen;
