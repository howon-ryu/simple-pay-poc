/**
 * 숫자를 한국 통화 형식으로 포맷팅합니다.
 * @param {number} amount - 포맷팅할 금액
 * @returns {string} 포맷팅된 금액 문자열
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ko-KR').format(amount);
};

/**
 * 카드 번호를 마스킹 처리합니다.
 * @param {string} cardNumber - 원본 카드 번호
 * @returns {string} 마스킹된 카드 번호
 */
export const maskCardNumber = (cardNumber) => {
  if (!cardNumber) return '';
  
  // 숫자만 추출
  const numbers = cardNumber.replace(/\D/g, '');
  
  // 마지막 4자리만 보여주고 나머지는 마스킹
  if (numbers.length >= 4) {
    const lastFour = numbers.slice(-4);
    return `**** **** **** ${lastFour}`;
  }
  
  return cardNumber;
};

/**
 * 전화번호를 포맷팅합니다.
 * @param {string} phoneNumber - 원본 전화번호
 * @returns {string} 포맷팅된 전화번호
 */
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  const numbers = phoneNumber.replace(/\D/g, '');
  
  if (numbers.length === 11) {
    return numbers.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  
  return phoneNumber;
};

/**
 * 날짜를 한국 형식으로 포맷팅합니다.
 * @param {Date|string} date - 포맷팅할 날짜
 * @returns {string} 포맷팅된 날짜 문자열
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};

/**
 * 카드 만료일을 포맷팅합니다.
 * @param {string} expiry - MM/YY 형식의 만료일
 * @returns {string} 포맷팅된 만료일
 */
export const formatCardExpiry = (expiry) => {
  if (!expiry) return '';
  
  const cleaned = expiry.replace(/\D/g, '');
  
  if (cleaned.length >= 4) {
    const month = cleaned.substring(0, 2);
    const year = cleaned.substring(2, 4);
    return `${month}/${year}`;
  }
  
  return expiry;
};

/**
 * 주문 번호를 생성합니다.
 * @returns {string} 생성된 주문 번호
 */
export const generateOrderNumber = () => {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${dateStr}-${randomNum}`;
};

/**
 * 카드 회사명을 단축 형태로 변환합니다.
 * @param {string} company - 카드 회사명
 * @returns {string} 단축된 회사명
 */
export const getShortCardCompany = (company) => {
  const shortNames = {
    'KB국민카드': 'KB',
    '신한카드': '신한',
    '삼성카드': '삼성',
    '현대카드': '현대',
    '롯데카드': '롯데',
    '하나카드': '하나',
    'BC카드': 'BC',
    '우리카드': '우리'
  };
  
  return shortNames[company] || company;
};