import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const PaymentSummary = ({ 
  productAmount, 
  shippingFee, 
  discount, 
  totalAmount 
}) => {
  return (
    <div className="card">
      <h2 className="section-title">결제 금액</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 'var(--font-sm)',
          color: 'var(--text-secondary)'
        }}>
          <span>총 상품 금액</span>
          <span>{formatCurrency(productAmount)}원</span>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 'var(--font-sm)',
          color: 'var(--text-secondary)'
        }}>
          <span>배송비</span>
          <span>{formatCurrency(shippingFee)}원</span>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 'var(--font-sm)',
          color: 'var(--error-color)'
        }}>
          <span>상품 할인</span>
          <span>-{formatCurrency(discount)}원</span>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 'var(--font-md)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--primary-color)',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-light)'
        }}>
          <span>총 결제 금액</span>
          <span>{formatCurrency(totalAmount)}원</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;