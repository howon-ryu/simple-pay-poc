import React from 'react';
import Header from '../components/common/Header';
import Button from '../components/common/Button';

const CheckpointPage = ({ onBack, onNext }) => {
  return (
    <>
      <Header 
        onBack={onBack}
        onClose={onNext}
        showBackButton={true}
        showCloseButton={true}
      />
      
      <div className="intro-wrapper" style={{ paddingTop: 0 }}>
        <div className="intro-content">
          <div className="intro-title">
            <span className="poc">PoC</span> <span className="point">체크포인트</span>
          </div>
          <div className="intro-description">
            이번 PoC에서는<br />
            <strong>서비스 회원가입, 로그인, am pay 가입</strong>은<br />
            이미 이루어진 상태라는 전제하에 간편결제를 위한<br />
            카드 등록과 결제 프로세스를 다루고 있어요.
          </div>
          <div className="intro-image">🎯</div>
        </div>
        
        <div>
          <Button onClick={onNext}>
            am pay 둘러보기
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckpointPage;