
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

export interface Mistake {
  id: string;
  subject: string;
  description: string;
  problemImage?: string;
  solutionImage?: string;
  createdAt: string;
  nextReviewDate: string;
  reviewCount: number;
  difficultyLevel: 1 | 2 | 3; // 1=easy, 2=medium, 3=hard
  lastReviewResult?: 'easy' | 'medium' | 'hard' | 'failed';
}

interface MistakesContextType {
  mistakes: Mistake[];
  addMistake: (mistake: Omit<Mistake, 'id' | 'createdAt' | 'nextReviewDate' | 'reviewCount'>) => void;
  updateMistakeReview: (id: string, result: 'easy' | 'medium' | 'hard' | 'failed') => void;
  getDueForReview: () => Mistake[];
  deleteMistake: (id: string) => void;
}

const MistakesContext = createContext<MistakesContextType | undefined>(undefined);

export const MistakesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mistakes, setMistakes] = useState<Mistake[]>([]);

  useEffect(() => {
    const savedMistakes = localStorage.getItem('edatlas_mistakes');
    if (savedMistakes) {
      setMistakes(JSON.parse(savedMistakes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('edatlas_mistakes', JSON.stringify(mistakes));
  }, [mistakes]);

  const calculateNextReviewDate = (reviewCount: number, difficultyLevel: number, lastResult?: string): string => {
    let days = 1; // Default 1 day
    
    // Base intervals: 1, 3, 7, 14, 30 days
    const intervals = [1, 3, 7, 14, 30];
    
    if (lastResult === 'failed' || lastResult === 'hard') {
      // Reset to beginning or previous interval
      days = reviewCount > 0 ? intervals[Math.max(0, reviewCount - 1)] : 1;
    } else if (lastResult === 'easy') {
      // Skip ahead or use longer interval
      days = intervals[Math.min(intervals.length - 1, reviewCount + 1)] || 30;
    } else {
      // Normal progression
      days = intervals[Math.min(intervals.length - 1, reviewCount)] || 30;
    }
    
    // Adjust based on difficulty level
    if (difficultyLevel === 3) days = Math.max(1, Math.floor(days * 0.7)); // Harder concepts review sooner
    if (difficultyLevel === 1) days = Math.floor(days * 1.3); // Easier concepts can wait longer
    
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + days);
    return nextDate.toISOString();
  };

  const addMistake = (mistakeData: Omit<Mistake, 'id' | 'createdAt' | 'nextReviewDate' | 'reviewCount'>) => {
    const now = new Date().toISOString();
    const newMistake: Mistake = {
      ...mistakeData,
      id: Date.now().toString(),
      createdAt: now,
      nextReviewDate: calculateNextReviewDate(0, mistakeData.difficultyLevel),
      reviewCount: 0,
    };
    
    setMistakes(prev => [newMistake, ...prev]);
    
    // Schedule notifications (mock - in real app would use proper notification system)
    console.log(`Scheduling review notification for ${newMistake.nextReviewDate}`);
    
    toast({
      title: "Mistake Added",
      description: `Added to your learning logbook. First review scheduled for ${new Date(newMistake.nextReviewDate).toLocaleDateString()}.`,
    });
  };

  const updateMistakeReview = (id: string, result: 'easy' | 'medium' | 'hard' | 'failed') => {
    setMistakes(prev => prev.map(mistake => {
      if (mistake.id === id) {
        const newReviewCount = result === 'failed' ? Math.max(0, mistake.reviewCount - 1) : mistake.reviewCount + 1;
        return {
          ...mistake,
          reviewCount: newReviewCount,
          lastReviewResult: result,
          nextReviewDate: calculateNextReviewDate(newReviewCount, mistake.difficultyLevel, result),
        };
      }
      return mistake;
    }));
    
    toast({
      title: "Review Completed",
      description: `Spaced repetition schedule updated based on your performance.`,
    });
  };

  const getDueForReview = (): Mistake[] => {
    const now = new Date();
    return mistakes.filter(mistake => new Date(mistake.nextReviewDate) <= now);
  };

  const deleteMistake = (id: string) => {
    setMistakes(prev => prev.filter(mistake => mistake.id !== id));
    toast({
      title: "Mistake Deleted",
      description: "Mistake has been removed from your logbook.",
    });
  };

  return (
    <MistakesContext.Provider value={{
      mistakes,
      addMistake,
      updateMistakeReview,
      getDueForReview,
      deleteMistake,
    }}>
      {children}
    </MistakesContext.Provider>
  );
};

export const useMistakes = () => {
  const context = useContext(MistakesContext);
  if (context === undefined) {
    throw new Error('useMistakes must be used within a MistakesProvider');
  }
  return context;
};
