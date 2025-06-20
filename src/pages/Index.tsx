
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LaunchScreen from '../components/LaunchScreen';
import AuthScreen from '../components/AuthScreen';
import Dashboard from '../components/Dashboard';
import Logbook from '../components/Logbook';
import Calendar from '../components/Calendar';
import AddMistake from '../components/AddMistake';
import ReviewMistake from '../components/ReviewMistake';
import { useAuth } from '../hooks/useAuth';

const Index = () => {
  const { user, isLoading } = useAuth();
  const [showLaunch, setShowLaunch] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLaunch(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || showLaunch) {
    return <LaunchScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" /> : <AuthScreen />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/logbook" 
            element={user ? <Logbook /> : <Navigate to="/" />} 
          />
          <Route 
            path="/calendar" 
            element={user ? <Calendar /> : <Navigate to="/" />} 
          />
          <Route 
            path="/add-mistake" 
            element={user ? <AddMistake /> : <Navigate to="/" />} 
          />
          <Route 
            path="/review/:id" 
            element={user ? <ReviewMistake /> : <Navigate to="/" />} 
          />
        </Routes>
      </Router>
    </div>
  );
};

export default Index;
