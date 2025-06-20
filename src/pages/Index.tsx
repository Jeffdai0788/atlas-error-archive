
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Logbook from '../components/Logbook';
import Calendar from '../components/Calendar';
import AddMistake from '../components/AddMistake';
import ReviewMistake from '../components/ReviewMistake';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logbook" element={<Logbook />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/add-mistake" element={<AddMistake />} />
          <Route path="/review/:id" element={<ReviewMistake />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Index;
