import React, { useState } from 'react';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import ProductSection from '../components/payment/ProductSection';
import PaymentSummary from '../components/payment/PaymentSummary';
import CardList from '../components/card/CardList';
import AddCardDialog from '../components/card/AddCardDialog';
import ManualCardPage from './ManualCardPage';
import { formatCurrency } from '../utils/formatters';
import { ADD_CARD_METHODS } from '../utils/constants';
import { useCard } from '../contexts/CardContext';

const PaymentPage = ({ paymentData, onBack, onNext }) => {
  const [showAddCardDialog, setShowAddCardDialog] = useState(false);
  const [showManualCardPage, setShowManualCardPage] = useState(false);
  
  // CardContext에서 카드 관련 데이터 가져오기
  const { cards, selectedCard, selectCard, deleteCard, canPay, addCard } = useCard();

  const {
    product,
    totalAmount,
    shippingFee,
    discount
  } = paymentData;

  const productAmount = product.price * product.count;

  const handlePayment = () => {
    if (!selectedCard) {
      alert('결제할 카드를 선택해주세요.');
      return;
    }
    
    if (!selectedCard.isActive) {
      alert('유효기간이 만료된 카드입니다.');
      return;
    }
    
    onNext();
  };

  const handleAddCardMethod = (method) => {
    switch(method) {
      case ADD_CARD_METHODS.MANUAL:
        setShowManualCardPage(true);
        break;
      case ADD_CARD_METHODS.SCAN:
        alert('카드 스캔 기능을 실행합니다.');
        break;
      case ADD_CARD_METHODS.APP:
        alert('앱카드 등록 페이지로 이동합니다.');
        break;
    }
  };

  const handleAddCard = (cardData) => {
    addCard(cardData);
    setShowManualCardPage(false);
    alert('카드가 성공적으로 등록되었습니다.');
  };

  const handleBackFromManualCard = () => {
    setShowManualCardPage(false);
  };

  // 카드 추가 페이지가 활성화된 경우
  if (showManualCardPage) {
    return (
      <ManualCardPage 
        onBack={handleBackFromManualCard}
        onAddCard={handleAddCard}
      />
    );
  }

  return (
    <>
      <Header 
        title="결제하기"
        onBack={onBack}
        onClose={() => {}}
      />
      
      <div className="content">
        {/* 주문상품 */}
        <ProductSection product={product} />
        
        {/* 결제수단 선택 */}
        <div className="card">
          <h2 className="section-title">결제 수단 선택</h2>
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              padding: '12px 16px',
              background: '#f8f9ff',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--primary-color)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <input 
                type="radio" 
                id="ktpay" 
                name="paymentMethod" 
                checked={true} 
                readOnly
              />
              <label 
                htmlFor="ktpay" 
                style={{
                  fontSize: 'var(--font-lg)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--primary-color)',
                  cursor: 'pointer'
                }}
              >
                AM Pay
              </label>
            </div>
            
            <CardList
              cards={cards}
              selectedCardId={selectedCard?.id}
              onCardSelect={selectCard}
              onDeleteCard={deleteCard}
              onAddCard={() => setShowAddCardDialog(true)}
            />
          </div>
          
          {/* 다른 결제 수단 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            opacity: 0.5
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
              <input type="radio" name="paymentMethod" disabled />
              <span>카드 결제</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
              <input type="radio" name="paymentMethod" disabled />
              <span>계좌 이체</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
              <input type="radio" name="paymentMethod" disabled />
              <span>휴대폰 결제</span>
            </label>
          </div>
        </div>
        
        {/* 결제금액 */}
        <PaymentSummary
          productAmount={productAmount}
          shippingFee={shippingFee}
          discount={discount}
          totalAmount={totalAmount}
        />
        
        {/* 약관 동의 */}
        <div className="card">
          <div style={{
            padding: '16px',
            background: '#f8f9fa',
            borderRadius: 'var(--radius-md)',
            marginBottom: '16px'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 'var(--font-semibold)',
              marginBottom: '12px'
            }}>
              <input type="checkbox" defaultChecked />
              [필수] 아래 내용에 모두 동의합니다.
            </label>
            
            <div style={{ fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
              <div style={{ marginBottom: '4px' }}>• 서비스 표준 이용약관 동의</div>
              <div style={{ marginBottom: '4px' }}>• 개인정보 제3자 제공 동의</div>
              <div>• 본인은 만 14세 이상이고, 주문 내용을 확인했습니다.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 결제 버튼 */}
      <div className="bottom-btn">
        <Button 
          onClick={handlePayment}
          disabled={!canPay}
        >
          {formatCurrency(totalAmount)}원 결제하기
        </Button>
      </div>

      {/* 카드 추가 다이얼로그 */}
      <AddCardDialog
        isOpen={showAddCardDialog}
        onClose={() => setShowAddCardDialog(false)}
        onSelectMethod={handleAddCardMethod}
      />
    </>
  );
};

export default PaymentPage;