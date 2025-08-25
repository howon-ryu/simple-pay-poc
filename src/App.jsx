import React, { useState, useEffect } from 'react';
import './styles/variables.css';
import './styles/components.css';
import './App.css';

// Pages
import SplashPage from './pages/SplashPage';
import IntroPage from './pages/IntroPage';
import CheckpointPage from './pages/CheckpointPage';
import PaymentPage from './pages/PaymentPage';
import PinInputPage from './pages/PinInputPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailPage from './pages/PaymentFailPage';

// Constants
import { STEPS } from './utils/constants';

// Hooks
import { usePayment } from './hooks/usePayment';

function App() {
  const [currentStep, setCurrentStep] = useState(STEPS.SPLASH);
  const paymentHook = usePayment();

  useEffect(() => {
    // 스플래시 화면을 2초 후 인트로로 전환
    if (currentStep === STEPS.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentStep(STEPS.INTRO);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleReset = () => {
    paymentHook.resetPayment();
    setCurrentStep(STEPS.SPLASH);
    
    // 1초 후 인트로로 이동
    setTimeout(() => {
      setCurrentStep(STEPS.INTRO);
    }, 1000);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.SPLASH:
        return <SplashPage />;
        
      case STEPS.INTRO:
        return (
          <IntroPage 
            onNext={() => handleStepChange(STEPS.CHECKPOINT)}
          />
        );
        
      case STEPS.CHECKPOINT:
        return (
          <CheckpointPage 
            onBack={() => handleStepChange(STEPS.INTRO)}
            onNext={() => handleStepChange(STEPS.PAYMENT)}
          />
        );
        
      case STEPS.PAYMENT:
        return (
          <PaymentPage 
            paymentData={paymentHook}
            onBack={() => handleStepChange(STEPS.CHECKPOINT)}
            onNext={() => handleStepChange(STEPS.PIN_INPUT)}
          />
        );
        
      case STEPS.PIN_INPUT:
        return (
          <PinInputPage 
            paymentData={paymentHook}
            onBack={() => handleStepChange(STEPS.PAYMENT)}
            onSuccess={() => handleStepChange(STEPS.SUCCESS)}
            onFail={() => handleStepChange(STEPS.FAIL)}
          />
        );
        
      case STEPS.SUCCESS:
        return (
          <PaymentSuccessPage 
            paymentResult={paymentHook.paymentResult}
            onConfirm={handleReset}
          />
        );
        
      case STEPS.FAIL:
        return (
          <PaymentFailPage 
            paymentResult={paymentHook.paymentResult}
            onRetry={() => handleStepChange(STEPS.PAYMENT)}
            onHome={handleReset}
          />
        );
        
      default:
        return <SplashPage />;
    }
  };

  return (
    <div className="app-container">
      {renderCurrentStep()}
    </div>
  );
}

export default App;