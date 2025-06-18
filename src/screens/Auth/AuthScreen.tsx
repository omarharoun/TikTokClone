import React, { useState } from 'react';
import { StatusBar } from '../../components/common/StatusBar';
import { LoginForm } from '../../components/auth/LoginForm';
import { RegisterForm } from '../../components/auth/RegisterForm';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-black w-[414px] h-[896px] relative flex flex-col">
      <StatusBar />
      
      <div className="flex-1 flex items-center justify-center px-4">
        {isLogin ? (
          <LoginForm
            onSuccess={onAuthSuccess}
            onSwitchToRegister={() => setIsLogin(false)}
          />
        ) : (
          <RegisterForm
            onSuccess={onAuthSuccess}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
};