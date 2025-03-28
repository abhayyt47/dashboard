import { useState } from 'react';
import Head from 'next/head';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Head>
        <title>{isLogin ? 'Login' : 'Sign Up'}</title>
      </Head>
      
      {isLogin ? (
        <LoginForm switchToSignup={() => setIsLogin(false)} />
      ) : (
        <SignupForm switchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}