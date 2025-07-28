# Architecture Overview

이 프로젝트는 Next.js 앱이며 API 라우트와 클라이언트 페이지가 동일한 코드베이스에 존재합니다. 주요 구성 요소는 다음과 같습니다.

- **pages**: 사용자가 접근하는 화면을 제공하며, 질문 진행 페이지와 결과 페이지로 구분됩니다.
- **API routes**: `/api/enneagram/*` 경로에 정의되어 질문 목록, 에니어그램 정보, 답변 제출 기능을 제공합니다.
- **contexts**: `EnneagramContext`에서 질문과 응답 상태를 관리합니다.
- **libs**: 순수 로직과 데이터(JSON) 파일을 보관하며, 유형 계산을 담당하는 `findEnneagramType` 함수가 포함됩니다.

Next.js 13+의 App Router 구조를 사용하기 때문에 폴더 기반으로 API와 UI가 분리되어 있습니다.
