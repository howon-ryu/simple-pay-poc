import React from 'react';

const CreditCard = ({ 
  card, 
  isSelected = false, 
  onClick,
  onDelete,
  className = '' 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(card.id);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // 카드 선택을 방지
    if (onDelete && window.confirm('정말로 이 카드를 삭제하시겠습니까?')) {
      onDelete(card.id);
    }
  };

  const cardClasses = [
    'credit-card',
    isSelected ? 'selected' : '',
    !card.isActive ? 'expired' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClasses}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {/* 삭제 버튼 */}
      {onDelete && (
        <button
          className="card-delete-btn"
          onClick={handleDelete}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '24px',
            height: '24px',
            border: 'none',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#dc3545',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
          title="카드 삭제"
        >
          ×
        </button>
      )}
      
      <div className="card-company">{card.company}</div>
      <div className="card-number">{card.number}</div>
      <div className="card-holder">{card.holder}</div>
      <div className="card-expiry">{card.expiry}</div>
      
      {!card.isActive && (
        <div className="card-expired-overlay">
          <span>만료된 카드</span>
        </div>
      )}
    </div>
  );
};

export default CreditCard;
