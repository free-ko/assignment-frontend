## KONKRIT Frontend 코딩 과제

## 파일 실행 전 준비

1. 터미널에 `yarn or npm i`를 실행 시켜주세요.😀

<br/>

## Commit 컨벤션

| 구분     | 내용                                |
| -------- | ----------------------------------- |
| FEAT     | 기능 추가                           |
| FIX      | 버그 수정                           |
| STYLE    | 디자인 스타일 수정                  |
| REFACTOR | 기능은 그대로, 코드만 변경          |
| DOCS     | README 등 문서 업데이트             |
| TEST     | 테스트 코드                         |
| CHORE    | 환경설정, 파일, 폴더 네이밍 변경 등 |

<br/>

### 폴더 구조

| 디렉토리          | 정의                                                  |
| ----------------- | ----------------------------------------------------- |
| shared/types      | 글로벌 타입                                           |
| shared/constants  | 글로벌 상수                                           |
| shared/stores     | 글로벌 상태                                           |
| shared/hooks      | 글로벌 훅                                             |
| shared/utils      | 글로벌 유틸                                           |
| shared/plugins    | 외부 라이브러리 커스텀 로직                           |
| shared/services   | 프로젝트 의존성 있는 api 로직                         |
| components/design | 순수 디자인 컴포넌트(props를 받아서 rendering만 진행) |
| components        | 페이지 관련 컴포넌트                                  |
| pages             | 페이지 컴포넌트                                       |

<br/>

## Stack

- React 18
- Typescript
- Tailwind CSS
- React-Router v6
- React-Query v4
- Zustand v4
- axios

<br/>

## 요구 사항

1. SIWE(Sign In With Ethereum) 구현 과정

- 메타마스크로 account 연결
- 연결된 account의 publicAddress에 맞는 nonce 값을 서버에서 가져옴
- 서버에서 받은 nonce 값에 지갑 서명(sign message)을 하여 signature 생성
- nonce, signature으로 서버에서 accessToken, refreshToken 가져와서 header에 `Authorization: Bearer <accessToken>` 세팅
- 로그인 유지되도록 세팅

2. 내 NFT 확인하기 구현 과정

- 서버에서 현재 로그인한 account의 NFT 가져오는 API 호출하여 화면에 보여주기

3. 내 NFT 전송 구현 과정

- `react-hook-form` 라이브러리를 활용하여 전송받을 주소 입력 폼 생성
- validate 추가 (required, 전송받은 account의 정확한 publicAddress를 입력했는지 여부, 현재 로그인한 account의 publicAddress와 같지 않은지 여부)
- ERC721 `transferFrom` method를 호출하여 폼으로 입력받은 주소로 전송
