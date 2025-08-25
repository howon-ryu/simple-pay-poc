import React from 'react';
import Button from '../components/common/Button';

const IntroPage = ({ onNext }) => {
  return (
    <div className="intro-wrapper">
      <div className="intro-content">
        <div className="intro-title">AM Pay</div>
        <div className="intro-description">
          앰페이는<br />
          <strong>신용/체크 카드</strong> 또는 <strong>계좌 등록</strong>을 통해<br />
          쉽고 간편한 결제를 돕기 위해 만들어졌어요.
        </div>
        <div className="intro-image">💳</div>
      </div>
      
      <div>
        <Button onClick={onNext}>
          PoC 체크포인트 보기
        </Button>
      </div>
    </div>
  );
};

export default IntroPage;