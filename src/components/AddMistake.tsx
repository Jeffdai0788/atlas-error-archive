
import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Upload, Plus, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useMistakes } from '../hooks/useMistakes';
import { toast } from "@/hooks/use-toast";

const AddMistake = () => {
  const navigate = useNavigate();
  const { addMistake } = useMistakes();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState<1 | 2 | 3>(2);
  const [problemImage, setProblemImage] = useState<string>('');
  const [solutionImage, setSolutionImage] = useState<string>('');
  
  const problemFileRef = useRef<HTMLInputElement>(null);
  const solutionFileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File, type: 'problem' | 'solution') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'problem') {
        setProblemImage(result);
      } else {
        setSolutionImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both subject and description.",
        variant: "destructive",
      });
      return;
    }

    addMistake({
      subject: subject.trim(),
      description: description.trim(),
      difficultyLevel,
      problemImage: problemImage || undefined,
      solutionImage: solutionImage || undefined,
    });

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
              onClick={() => navigate('/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Add New Mistake</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Mistake Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject/Topic
                </label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Calculus - Integration by Parts"
                  className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description of Mistake
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what went wrong and what you learned..."
                  rows={4}
                  className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Difficulty Level
                </label>
                <Select value={difficultyLevel.toString()} onValueChange={(value) => setDifficultyLevel(parseInt(value) as 1 | 2 | 3)}>
                  <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">🟢 Easy - I understand now</SelectItem>
                    <SelectItem value="2">🟡 Medium - Need some practice</SelectItem>
                    <SelectItem value="3">🔴 Hard - Very challenging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Problem Image */}
          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                <span>Problem Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {problemImage ? (
                  <div className="relative">
                    <img 
                      src={problemImage} 
                      alt="Problem" 
                      className="w-full h-64 object-cover rounded-xl border border-gray-200"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setProblemImage('')}
                      className="absolute top-2 right-2"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div 
                    onClick={() => problemFileRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200"
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload problem image</p>
                    </div>
                  </div>
                )}
                <input
                  ref={problemFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'problem')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Solution Image */}
          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-purple-600" />
                <span>Solution Image</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {solutionImage ? (
                  <div className="relative">
                    <img 
                      src={solutionImage} 
                      alt="Solution" 
                      className="w-full h-64 object-cover rounded-xl border border-gray-200"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setSolutionImage('')}
                      className="absolute top-2 right-2"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div 
                    onClick={() => solutionFileRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload solution image</p>
                    </div>
                  </div>
                )}
                <input
                  ref={solutionFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'solution')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <Button 
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add to Logbook
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="px-8 h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMistake;
