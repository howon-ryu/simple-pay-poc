// App Steps
export const STEPS = {
  SPLASH: 'splash',
  INTRO: 'intro',
  CHECKPOINT: 'checkpoint',
  PAYMENT: 'payment',
  PIN_INPUT: 'pinInput',
  SUCCESS: 'success',
  FAIL: 'fail'
};

// Card Types
export const CARD_TYPES = {
  CREDIT: 'credit',
  DEBIT: 'debit',
  CHECK: 'check'
};

// Card Companies
export const CARD_COMPANIES = {
  KB: 'KB국민카드',
  SHINHAN: '신한카드',
  SAMSUNG: '삼성카드',
  HYUNDAI: '현대카드',
  LOTTE: '롯데카드',
  HANA: '하나카드',
  BC: 'BC카드',
  WOORI: '우리카드'
};

// Sample Cards Data
export const SAMPLE_CARDS = [
  {
    id: 1,
    company: CARD_COMPANIES.KB,
    type: CARD_TYPES.CREDIT,
    number: '**** **** **** 1234',
    holder: '김앰원',
    expiry: '12/26',
    isActive: true
  },
  {
    id: 2,
    company: CARD_COMPANIES.SHINHAN,
    type: CARD_TYPES.DEBIT,
    number: '**** **** **** 5678',
    holder: '김앰원',
    expiry: '08/25',
    isActive: true
  }
];

// Sample Product Data
export const SAMPLE_PRODUCT = {
  id: 1,
  name: '갤럭시 S24 Ultra',
  price: 1398000,
  option: '256GB, 티타늄 그레이',
  count: 1,
  image: '📱'
};

// Payment Details
export const PAYMENT_DETAILS = {
  SHIPPING_FEE: 3000,
  DISCOUNT: 1000
};

// PIN Settings
export const PIN_SETTINGS = {
  LENGTH: 6,
  TEST_PIN: '123456'
};

// Add Card Methods
export const ADD_CARD_METHODS = {
  SCAN: 'scan',
  MANUAL: 'manual',
  APP: 'app'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  SELECTED_CARD: 'selectedCard',
  PIN_ATTEMPTS: 'pinAttempts',
  USER_CARDS: 'userCards'
};