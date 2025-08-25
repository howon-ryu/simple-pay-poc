import React from 'react';

const CreditCard = ({ 
  card, 
  isSelected = false, 
  onClick,
  className = '' 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(card.id);
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
