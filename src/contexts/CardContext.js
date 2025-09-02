import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { SAMPLE_CARDS, STORAGE_KEYS } from '../utils/constants';

// 카드 관련 액션 타입 정의
export const CARD_ACTIONS = {
  SET_CARDS: 'SET_CARDS',
  ADD_CARD: 'ADD_CARD',
  DELETE_CARD: 'DELETE_CARD',
  SELECT_CARD: 'SELECT_CARD',
  UPDATE_CARD: 'UPDATE_CARD'
};

// 초기 상태
const initialState = {
  cards: SAMPLE_CARDS,
  selectedCard: null
};

// 카드 리듀서 함수
const cardReducer = (state, action) => {
  console.log('🔄 Reducer 액션 실행:', {
    액션타입: action.type,
    액션데이터: action.payload,
    현재상태: {
      카드개수: state.cards.length,
      선택된카드: state.selectedCard?.id || 'none'
    }
  });

  switch (action.type) {
    case CARD_ACTIONS.SET_CARDS:
      return {
        ...state,
        cards: action.payload
      };
      
    case CARD_ACTIONS.ADD_CARD:
      const newCard = {
        ...action.payload,
        id: Date.now(), // 임시 ID 생성
        isActive: true
      };
      const updatedCards = [...state.cards, newCard];
      return {
        ...state,
        cards: updatedCards
      };
      
    case CARD_ACTIONS.DELETE_CARD:
      const filteredCards = state.cards.filter(card => card.id !== action.payload);
      return {
        ...state,
        cards: filteredCards,
        // 삭제된 카드가 선택된 카드였다면 선택 해제
        selectedCard: state.selectedCard?.id === action.payload ? null : state.selectedCard
      };
      
    case CARD_ACTIONS.SELECT_CARD:
      const cardToSelect = state.cards.find(card => card.id === action.payload);
      return {
        ...state,
        selectedCard: cardToSelect && cardToSelect.isActive ? cardToSelect : null
      };
      
    case CARD_ACTIONS.UPDATE_CARD:
      const updatedCardsArray = state.cards.map(card =>
        card.id === action.payload.id ? { ...card, ...action.payload.updates } : card
      );
      return {
        ...state,
        cards: updatedCardsArray,
        // 선택된 카드가 업데이트된 경우 선택된 카드도 업데이트
        selectedCard: state.selectedCard?.id === action.payload.id 
          ? { ...state.selectedCard, ...action.payload.updates }
          : state.selectedCard
      };
      
    default:
      console.log('⚠️ 알 수 없는 액션 타입:', action.type);
      return state;
  }
};

// CardContext 생성
const CardContext = createContext();

// CardProvider 컴포넌트
export const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState);
  const [hasInitialized, setHasInitialized] = React.useState(false);

  // localStorage에서 카드 데이터 로드
  useEffect(() => {
    try {
      const storedCards = localStorage.getItem(STORAGE_KEYS.USER_CARDS);
      const storedSelectedCard = localStorage.getItem(STORAGE_KEYS.SELECTED_CARD);
      
      if (storedCards) {
        const parsedCards = JSON.parse(storedCards);
        dispatch({ type: CARD_ACTIONS.SET_CARDS, payload: parsedCards });
      }
      
      if (storedSelectedCard) {
        const parsedSelectedCard = JSON.parse(storedSelectedCard);
        // 저장된 선택 카드가 현재 카드 목록에 있는지 확인 후 선택
        const cardExists = (storedCards ? JSON.parse(storedCards) : SAMPLE_CARDS)
          .some(card => card.id === parsedSelectedCard.id && card.isActive);
        
        if (cardExists) {
          dispatch({ type: CARD_ACTIONS.SELECT_CARD, payload: parsedSelectedCard.id });
        }
      }
    } catch (error) {
      console.error('카드 데이터 로드 중 오류:', error);
    } finally {
      setHasInitialized(true);
    }
  }, []);

  // 상태 변경시 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_CARDS, JSON.stringify(state.cards));
    } catch (error) {
      console.error('카드 데이터 저장 중 오류:', error);
    }
  }, [state.cards]);

  useEffect(() => {
    try {
      if (state.selectedCard) {
        localStorage.setItem(STORAGE_KEYS.SELECTED_CARD, JSON.stringify(state.selectedCard));
      } else {
        localStorage.removeItem(STORAGE_KEYS.SELECTED_CARD);
      }
    } catch (error) {
      console.error('선택된 카드 저장 중 오류:', error);
    }
  }, [state.selectedCard]);

  // 액션 함수들
  const addCard = (cardData) => {
    dispatch({ type: CARD_ACTIONS.ADD_CARD, payload: cardData });
  };

  const deleteCard = (cardId) => {
    dispatch({ type: CARD_ACTIONS.DELETE_CARD, payload: cardId });
  };

  const selectCard = (cardId) => {
    dispatch({ type: CARD_ACTIONS.SELECT_CARD, payload: cardId });
    return state.cards.find(card => card.id === cardId && card.isActive) ? true : false;
  };

  const updateCard = (cardId, updates) => {
    dispatch({ type: CARD_ACTIONS.UPDATE_CARD, payload: { id: cardId, updates } });
  };

  const value = {
    // 상태
    cards: state.cards,
    selectedCard: state.selectedCard,
    
    // 액션 함수들
    addCard,
    deleteCard,
    selectCard,
    updateCard,
    
    // 유틸리티
    canPay: state.selectedCard && state.selectedCard.isActive
  };

  // 초기화 완료 후 첫 번째 렌더링에서만 로그 출력
  if (hasInitialized && !window.providerLogShown) {
    console.log('🏪 Provider 초기 상태:', {
      제공되는값: {
        카드개수: value.cards.length,
        선택된카드: value.selectedCard ? `${value.selectedCard.company} ${value.selectedCard.number}` : 'none',
        결제가능: value.canPay,
        함수들: ['addCard', 'deleteCard', 'selectCard', 'updateCard']
      }
    });
    window.providerLogShown = true;
  }

  return (
    <CardContext.Provider value={value}>
      {children}
    </CardContext.Provider>
  );
};

// CardContext를 사용하기 위한 커스텀 훅
export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard는 CardProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};