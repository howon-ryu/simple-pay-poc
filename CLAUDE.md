# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 코드와 작업할 때 참조하는 가이드라인을 제공합니다.

## 언어 지침

**중요**: Claude Code와 이 프로젝트에서 작업할 때는 **한국어**를 사용해 주세요.
- 모든 설명과 댓글은 한국어로 작성
- 코드 내 주석도 한국어로 작성
- 변수명과 함수명은 영어로 유지하되, 의미있는 한국어 주석 추가
- 에러 메시지나 사용자 피드백은 한국어로 제공

## 개발 명령어

### 필수 명령어
- `npm start` - 개발 서버 시작 (React 앱이 localhost:3000에서 실행)
- `npm run build` - 프로덕션 빌드 생성
- `npm test` - Jest 테스트 스위트 실행
- `npm run eject` - Create React App에서 추출 (되돌릴 수 없음)

## 프로젝트 아키텍처

이것은 모바일 결제 플로우를 시뮬레이션하는 React 기반 결제 애플리케이션(AM OnePay)입니다. 단계 기반 네비게이션 시스템을 가진 단일 페이지 애플리케이션입니다.

### 핵심 아키텍처 패턴

**단계 기반 네비게이션**: 전체 앱 플로우는 `src/utils/constants.js`에 정의된 중앙집중식 단계 시스템으로 제어됩니다:
```javascript
STEPS = { SPLASH, INTRO, CHECKPOINT, PAYMENT, PIN_INPUT, SUCCESS, FAIL }
```

**상태 관리**: 다음의 조합을 사용합니다:
- 복잡한 상태를 위한 커스텀 훅 (`usePayment.js` - 모든 결제 로직 처리)
- 로컬 스토리지 훅 (`useLocalStorage.js` - 카드 데이터와 사용자 설정 영속화)
- 컴포넌트 레벨 상태를 위한 표준 React useState

**데이터 플로우**: 결제 데이터는 다음을 관리하는 `usePayment` 훅을 통해 흐릅니다:
- 카드 선택 및 관리
- PIN 입력 및 검증
- 결제 처리 시뮬레이션
- 결과 처리 (성공/실패)

### 주요 커스텀 훅

- `usePayment()` - 중앙 결제 상태 관리, 카드 선택, PIN 검증, 결제 처리를 담당
- `useLocalStorage(key, initialValue)` - useState처럼 작동하지만 localStorage와 동기화되는 영속적 저장소

### 디자인 시스템

**CSS 변수 아키텍처**: `src/styles/variables.css`의 중앙집중식 디자인 토큰:
- 색상 (primary: #667eea, 그라데이션, 의미적 색상)
- 간격 시스템 (--spacing-xs to --spacing-4xl)
- 타이포그래피 스케일 (--font-xs to --font-5xl)
- 그림자와 테두리 반경

**컴포넌트 구조**:
```
src/components/
├── common/     # 재사용 가능한 UI 컴포넌트 (Header, Button, Dialog)
├── card/       # 카드 관련 컴포넌트 (CreditCard, CardList, AddCardDialog)
└── payment/    # 결제 플로우 컴포넌트 (ProductSection, PaymentSummary, PinInput)
```

### 테스트 데이터 및 설정

- **테스트 PIN**: `123456` (`PIN_SETTINGS.TEST_PIN`에 정의)
- **샘플 카드**: 미리 정의된 데이터를 가진 KB국민카드와 신한카드
- **샘플 상품**: Galaxy S24 Ultra (₩1,398,000)
- **결제 플로우**: 3회 시도 제한이 있는 PIN 검증

### 파일 구조

- `src/pages/` - 주요 단계 컴포넌트 (SplashPage, PaymentPage 등)
- `src/utils/constants.js` - 모든 애플리케이션 상수와 샘플 데이터
- `src/utils/formatters.js` - 통화, 카드 번호, 날짜 형식화 유틸리티
- `src/styles/` - CSS 변수, 전역 스타일, 컴포넌트 스타일

### 중요한 구현 세부사항

- 표준 설정의 Create React App 사용
- 외부 상태 관리 라이브러리 없음 (Redux, Zustand) - 커스텀 훅 사용
- 카드 데이터와 사용자 설정을 위한 LocalStorage 영속화
- setTimeout 지연을 통한 시뮬레이션된 결제 처리
- 모바일 우선 반응형 디자인
- 통화 형식화가 포함된 한국어 UI (₩)

## 작업 지침

### 코드 작성 시 주의사항
- 모든 사용자 대면 텍스트는 한국어로 작성
- 에러 메시지, 알림, 버튼 텍스트 등은 한국어 사용
- 코드 주석은 한국어로 작성하여 이해도 향상
- 변수명은 영어를 유지하되, 의미를 명확히 하는 한국어 주석 추가

### 코드 스타일
- 기존 코드 스타일과 일관성 유지
- CSS 변수를 활용한 디자인 토큰 사용
- 커스텀 훅을 통한 로직 분리
- 컴포넌트 단위의 모듈화된 구조 유지