# r3f 이커머스 프로젝트

React Three Fiber로 구현한 3D 선글라스 커스터마이징 반응형 이커머스입니다.
Node.js + React 풀스택으로 2주간 개발했습니다.

## 🚀 Live Demo

**Frontend**: https://r3f-shopping-website-fe.vercel.app/

## 주요 기능

### 3D 커스터마이징

-   선글라스 4개 파츠별 재질/색상 변경 (Matcap, Material 변경경)
-   마우스/터치로 회전, 줌인/아웃
-   자동 회전 모드

### 쇼핑몰 기능

-   제품 목록, 상세페이지, 검색/필터링
-   장바구니 담기, 수량 변경, 삭제
-   주문/결제 시스템 (배송정보, 카드결제)
-   주문 내역 조회

### 관리자 기능

-   제품 CRUD (이미지 업로드, 재고 관리)
-   주문 관리 및 상태 업데이트
-   권한 기반 접근 제어

### 사용자 인증

-   Google OAuth 소셜 로그인
-   세션 관리 및 자동 로그인

## 기술스택

-   **React** 19.1.0
-   **React Three Fiber** 9.3.0
-   **Redux Toolkit** 2.8.2 - 상태관리
-   **Material-UI** 7.2.0 - UI 컴포넌트
-   **React Router Dom** 7.7.1 - 라우팅
-   **Axios** 1.11.0 - API 통신
-   **@react-oauth/google** 0.12.2 - Google 인증
-   **React Toastify** 11.0.5 - 알림
-   **Vite** 7.0.4 - 빌드도구

## 프로젝트 구조

```
src/
├── features/           # Redux 슬라이스들
├── page/
│   ├── ShowRoomPage/   # 3D 커스터마이저 메인
│   ├── CartPage/       # 장바구니
│   ├── PaymentPage/    # 결제
│   └── AdminPages/     # 관리자
├── constants/          # 3D 재질/색상 설정
└── utils/             # API, 유틸함수
```

## 개발기간

2025.08.02 ~ 2025.08.17 (2주)
