# Next 에니어그램

## 주요 기능
- 8문제씩 단계적으로 진행되는 에니어그램 테스트
- 응답을 제출하면 각 유형에 대한 점수를 계산하여 유형을 추론
- API 엔드포인트(`/api/enneagram/*`)를 통해 질문과 유형 데이터 페치
- `EnneagramContext`를 사용한 상태 관리

## 기술 스택
 - **프레임워크**: Next.js 15.4.2
- **언어**: TypeScript
- **스타일**: Tailwind CSS
- **API 통신**: Axios

## 프로젝트 구조
```
next-enneagram
├─ public/
├─ src/
│  ├─ app/              # Next.js 라우트 및 API
│  ├─ components/       # 컴포넌트
│  ├─ contexts/         # React Context
│  ├─ hooks/            # 커스텀 훅
│  ├─ libs/             # 함수와 데이터 파일
│  └─ types/            # 타입 정의
└─ package.json
```

## 설치 및 실행
1. 의존성 설치
   ```bash
   npm install
   ```
2. 개발 서버 실행
   ```bash
   npm run dev
   ```
   브라우저에서 `http://localhost:3000`을 열면 애플리케이션을 확인할 수 있습니다.

빌드 및 배포를 위해서는 `npm run build` 후 `npm start` 명령을 사용할 수 있습니다.
