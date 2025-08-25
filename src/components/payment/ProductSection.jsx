import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const ProductSection = ({ product }) => {
  const totalPrice = product.price * product.count;

  return (
    <div className="card">
      <h2 className="section-title">주문상품</h2>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: '#f0f0f0',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          {product.image}
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: 'var(--font-md)',
            fontWeight: 'var(--font-semibold)',
            marginBottom: '8px',
            color: 'var(--text-primary)'
          }}>
            {product.name}
          </h3>
          
          <div style={{
            fontSize: 'var(--font-lg)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--primary-color)',
            marginBottom: '4px'
          }}>
            {formatCurrency(totalPrice)}원
          </div>
          
          <div style={{
            fontSize: 'var(--font-sm)',
            color: 'var(--text-secondary)'
          }}>
            {product.option}, {product.count}개
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;