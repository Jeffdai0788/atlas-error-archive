
import React, { useState } from 'react';
import { Mail, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../hooks/useAuth';
import { toast } from "@/hooks/use-toast";

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'email' | 'verify'>('email');
  const { login, verify2FA, isLoading } = useAuth();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    await login(email);
    setStep('verify');
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    const success = await verify2FA(verificationCode);
    if (!success) {
      toast({
        title: "Verification Failed",
        description: "Invalid code. Please try again. (Hint: use 123456)",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to EdAtlas</h1>
          <p className="text-gray-600">Secure access to your learning journey</p>
        </div>

        {/* Email Step */}
        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Email Authentication</span>
              </div>
              
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  🔒 We'll send a verification code to your email. No password required!
                </p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending code...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>
        )}

        {/* Verification Step */}
        {step === 'verify' && (
          <form onSubmit={handleVerificationSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-gray-900">Verify Your Email</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                We've sent a 6-digit code to <strong>{email}</strong>
              </p>
              
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full h-12 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 text-center text-lg font-mono tracking-widest"
                disabled={isLoading}
                maxLength={6}
              />
              
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                <p className="text-sm text-emerald-800">
                  💡 Demo code: <strong>123456</strong>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Verify & Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-blue-600 hover:text-blue-700"
                onClick={() => setStep('email')}
                disabled={isLoading}
              >
                ← Back to email
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
