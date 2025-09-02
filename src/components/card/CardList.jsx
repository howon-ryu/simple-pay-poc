import React from 'react';
import CreditCard from './CreditCard';

const CardList = ({ 
  cards, 
  selectedCardId, 
  onCardSelect, 
  onDeleteCard,
  onAddCard,
  className = '' 
}) => {
  return (
    <div className={`card-list ${className}`}>
      {cards.map(card => (
        <CreditCard
          key={card.id}
          card={card}
          isSelected={selectedCardId === card.id}
          onClick={onCardSelect}
          onDelete={onDeleteCard}
        />
      ))}
      
      <div 
        className="card-add" 
        onClick={onAddCard}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onAddCard();
          }
        }}
      >
        <div className="card-add-icon">+</div>
        <div>카드 추가</div>
      </div>
    </div>
  );
};

export default CardList;
