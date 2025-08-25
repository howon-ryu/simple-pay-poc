import React from 'react';
import Button from '../components/common/Button';

const PaymentFailPage = ({ paymentResult, onRetry, onHome }) => {
  const errorMessage = paymentResult?.error || '알 수 없는 오류가 발생했습니다.';

  return (
    <div className="result-page">
      <div className="result-icon fail">✗</div>
      <div className="result-title">결제에 실패했습니다</div>
      <div className="result-description">
        {errorMessage}<br />
        다시 시도해 주세요.
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button onClick={onRetry}>
          다시 시도
        </Button>
        <Button variant="secondary" onClick={onHome}>
          처음으로
        </Button>
      </div>
    </div>
  );
};

export default PaymentFailPage;