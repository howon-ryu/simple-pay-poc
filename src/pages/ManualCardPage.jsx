import React, { useState } from 'react';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { CARD_COMPANIES } from '../utils/constants';

const ManualCardPage = ({ onBack, onAddCard }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    cardName: '',
    cardCompany: ''
  });

  const [errors, setErrors] = useState({});

  // 카드번호 포맷팅 (4자리씩 나누기)
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formatted = formatCardNumber(value);
      if (formatted.replace(/\s/g, '').length <= 16) {
        setFormData(prev => ({ ...prev, [name]: formatted }));
      }
    } else if (name === 'expiryMonth') {
      if (value === '' || (/^\d{1,2}$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 12)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else if (name === 'expiryYear') {
      if (value === '' || (/^\d{1,2}$/.test(value) && parseInt(value) >= 0)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else if (name === 'cvc') {
      if (value === '' || (/^\d{1,3}$/.test(value))) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // 에러 초기화
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = '카드번호 16자리를 입력해주세요';
    }
    
    if (!formData.expiryMonth || parseInt(formData.expiryMonth) < 1 || parseInt(formData.expiryMonth) > 12) {
      newErrors.expiryMonth = '유효한 월(01-12)을 입력해주세요';
    }
    
    if (!formData.expiryYear || formData.expiryYear.length !== 2) {
      newErrors.expiryYear = '유효기간 년도 2자리를 입력해주세요';
    }
    
    if (!formData.cvc || formData.cvc.length < 3) {
      newErrors.cvc = 'CVC 3자리를 입력해주세요';
    }
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = '소유자 이름을 입력해주세요';
    }
    
    if (!formData.cardCompany.trim()) {
      newErrors.cardCompany = '카드사를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const currentYear = new Date().getFullYear();
      const expiry = `${formData.expiryMonth.padStart(2, '0')}/${formData.expiryYear}`;
      const expiryYear = parseInt(`20${formData.expiryYear}`);
      const expiryMonth = parseInt(formData.expiryMonth);
      const currentMonth = new Date().getMonth() + 1;
      
      // 유효기간 체크
      const isActive = expiryYear > currentYear || 
                      (expiryYear === currentYear && expiryMonth >= currentMonth);

      // 카드번호를 마스킹 처리
      const maskedCardNumber = formData.cardNumber.replace(/(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/, '**** **** **** $4');
      
      const newCard = {
        company: formData.cardCompany,
        type: 'credit', // 기본값으로 신용카드 설정
        number: maskedCardNumber,
        holder: formData.cardName,
        expiry,
        isActive
      };

      onAddCard(newCard);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #e1e5e9',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-md)',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#ff4757'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: 'var(--font-sm)',
    fontWeight: 'var(--font-semibold)',
    color: 'var(--text-primary)'
  };

  const errorStyle = {
    color: '#ff4757',
    fontSize: 'var(--font-xs)',
    marginTop: '4px'
  };

  return (
    <>
      <Header 
        title="카드 정보 입력"
        onBack={onBack}
        onClose={() => {}}
      />
      
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 카드번호 */}
            <div>
              <label style={labelStyle}>카드번호</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                style={errors.cardNumber ? errorInputStyle : inputStyle}
              />
              {errors.cardNumber && <div style={errorStyle}>{errors.cardNumber}</div>}
            </div>

            {/* 유효기간과 CVC */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>유효기간 (월)</label>
                <input
                  type="text"
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleInputChange}
                  placeholder="12"
                  maxLength="2"
                  style={errors.expiryMonth ? errorInputStyle : inputStyle}
                />
                {errors.expiryMonth && <div style={errorStyle}>{errors.expiryMonth}</div>}
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>유효기간 (년)</label>
                <input
                  type="text"
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleInputChange}
                  placeholder="28"
                  maxLength="2"
                  style={errors.expiryYear ? errorInputStyle : inputStyle}
                />
                {errors.expiryYear && <div style={errorStyle}>{errors.expiryYear}</div>}
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>CVC</label>
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="3"
                  style={errors.cvc ? errorInputStyle : inputStyle}
                />
                {errors.cvc && <div style={errorStyle}>{errors.cvc}</div>}
              </div>
            </div>

            {/* 소유자 */}
            <div>
              <label style={labelStyle}>소유자</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                placeholder="예: 홍길동, 김철수"
                style={errors.cardName ? errorInputStyle : inputStyle}
              />
              {errors.cardName && <div style={errorStyle}>{errors.cardName}</div>}
            </div>

            {/* 카드사 */}
            <div>
              <label style={labelStyle}>카드사</label>
              <select
                name="cardCompany"
                value={formData.cardCompany}
                onChange={handleInputChange}
                style={errors.cardCompany ? errorInputStyle : inputStyle}
              >
                <option value="">카드사를 선택해주세요</option>
                {Object.entries(CARD_COMPANIES).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              {errors.cardCompany && <div style={errorStyle}>{errors.cardCompany}</div>}
            </div>
          </div>
        </form>
      </div>

      {/* 하단 버튼 */}
      <div className="bottom-btn">
        <Button onClick={handleSubmit}>
          카드 등록
        </Button>
      </div>
    </>
  );
};

export default ManualCardPage;