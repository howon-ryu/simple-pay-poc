# AM One Pay - 간단 버전

AM One Pay의 핵심 기능을 구현한 React 프로젝트입니다.

## 🚀 주요 기능

- **스플래시 화면** - 앱 로딩 및 브랜딩
- **서비스 소개** - AM Pay 소개 및 PoC 설명  
- **결제 프로세스** - 상품 선택부터 결제 완료까지
- **카드 관리** - 카드 선택, 추가 다이얼로그
- **PIN 입력** - 6자리 보안 키패드
- **결제 결과** - 성공/실패 페이지

## 🛠️ 기술 스택

- **React 18** - 함수형 컴포넌트, Hooks
- **CSS Variables** - 디자인 시스템
- **Local Storage** - 카드 정보 저장
- **Responsive Design** - 모바일 우선

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Header, Button, Dialog)
│   ├── card/           # 카드 관련 컴포넌트
│   └── payment/        # 결제 관련 컴포넌트
├── pages/              # 페이지 컴포넌트
├── hooks/              # 커스텀 훅
├── utils/              # 유틸리티 함수
└── styles/             # 스타일 파일
```

## 🎮 사용법

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build
```

### 테스트 시나리오

1. **스플래시** → 자동으로 인트로로 전환 (2초)
2. **인트로** → "PoC 체크포인트 보기" 클릭
3. **체크포인트** → "am pay 둘러보기" 클릭  
4. **결제하기** → 카드 선택 후 "결제하기" 클릭
5. **PIN 입력** → "123456" 입력 (성공), 다른 번호 (실패)
6. **결과 확인** → 성공/실패 페이지

### 테스트 데이터

- **성공 PIN**: `123456`
- **기본 카드**: KB국민카드, 신한카드
- **상품**: 갤럭시 S24 Ultra (1,398,000원)

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: #667eea (AM 브랜드 컬러)
- **Secondary**: #764ba2  
- **Success**: #28a745
- **Error**: #dc3545

### 타이포그래피
- **Font Family**: Pretendard
- **Font Sizes**: 12px ~ 36px (CSS Variables)

### 간격 시스템
- **Spacing**: 4px ~