import { useState } from 'react';

/**
 * localStorage를 React state처럼 사용할 수 있는 커스텀 훅
 * @param {string} key - localStorage 키
 * @param {*} initialValue - 초기값
 * @returns {[*, function]} [값, 설정함수]
 */
export const useLocalStorage = (key, initialValue) => {
  // State 초기화
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 값을 설정하는 함수
  const setValue = (value) => {
    try {
      // value가 함수인 경우 실행하여 새 값을 얻음
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // state 업데이트
      setStoredValue(valueToStore);
      
      // localStorage에 저장
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * 세션 스토리지를 사용하는 커스텀 훅
 * @param {string} key - sessionStorage 키
 * @param {*} initialValue - 초기값
 * @returns {[*, function]} [값, 설정함수]
 */
export const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (valueToStore === undefined) {
        window.sessionStorage.removeItem(key);
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};