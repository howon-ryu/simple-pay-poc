import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { SAMPLE_CARDS, SAMPLE_PRODUCT, PAYMENT_DETAILS, PIN_SETTINGS, STORAGE_KEYS } from '../utils/constants';
import { generateOrderNumber } from '../utils/formatters';

export const usePayment = () => {
  const [selectedCard, setSelectedCard] = useLocalStorage(STORAGE_KEYS.SELECTED_CARD, null);
  const [userCards, setUserCards] = useLocalStorage(STORAGE_KEYS.USER_CARDS, SAMPLE_CARDS);
  
  const [currentPin, setCurrentPin] = useState('');
  const [pinAttempts, setPinAttempts] = useState(0);
  const [paymentResult, setPaymentResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [product] = useState(SAMPLE_PRODUCT);
  const totalAmount = product.price * product.count + PAYMENT_DETAILS.SHIPPING_FEE - PAYMENT_DETAILS.DISCOUNT;

  const selectCard = useCallback((cardId) => {
    const card = userCards.find(c => c.id === cardId);
    if (card && card.isActive) {
      setSelectedCard(card);
      return true;
    }
    return false;
  }, [userCards, setSelectedCard]);

  const inputPin = useCallback((digit) => {
    if (currentPin.length < PIN_SETTINGS.LENGTH) {
      setCurrentPin(prev => prev + digit);
    }
  }, [currentPin]);

  const clearPin = useCallback(() => {
    setCurrentPin(prev => prev.slice(0, -1));
  }, []);

  const clearAllPin = useCallback(() => {
    setCurrentPin('');
  }, []);

  const processPayment = useCallback(async () => {
    if (!selectedCard) {
      throw new Error('결제할 카드를 선택해주세요.');
    }

    if (currentPin.length !== PIN_SETTINGS.LENGTH) {
      throw new Error('PIN을 모두 입력해주세요.');
    }

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (currentPin === PIN_SETTINGS.TEST_PIN) {
        const result = {
          success: true,
          orderNumber: generateOrderNumber(),
          amount: totalAmount,
          card: selectedCard,
          timestamp: new Date().toISOString()
        };
        setPaymentResult(result);
        setCurrentPin('');
        setPinAttempts(0);
        return result;
      } else {
        const newAttempts = pinAttempts + 1;
        setPinAttempts(newAttempts);
        setCurrentPin('');
        
        if (newAttempts >= 3) {
          throw new Error('PIN 입력 횟수를 초과했습니다. 나중에 다시 시도해주세요.');
        }
        
        throw new Error(`PIN이 올바르지 않습니다. (${newAttempts}/3)`);
      }
    } catch (error) {
      const result = {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
      setPaymentResult(result);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [selectedCard, currentPin, totalAmount, pinAttempts]);

  const resetPayment = useCallback(() => {
    setCurrentPin('');
    setPinAttempts(0);
    setPaymentResult(null);
    setIsProcessing(false);
  }, []);

  return {
    selectedCard,
    userCards,
    currentPin,
    pinAttempts,
    paymentResult,
    isProcessing,
    product,
    totalAmount,
    selectCard,
    inputPin,
    clearPin,
    clearAllPin,
    processPayment,
    resetPayment,
    canPay: selectedCard && selectedCard.isActive,
    isPinComplete: currentPin.length === PIN_SETTINGS.LENGTH,
    shippingFee: PAYMENT_DETAILS.SHIPPING_FEE,
    discount: PAYMENT_DETAILS.DISCOUNT
  };
};