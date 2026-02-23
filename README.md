# Next 에니어그램

에니어그램 성향 검사 웹 앱. 전문가용 144문항 설문과 유형별 테마, Wing 분석을 지원합니다.

## 주요 기능

- **144문항 전문가 설문**: category별 가중치(weight), 역채점(is_reverse)을 적용한 정교한 채점
- **8문항씩 단계 진행**: 페이지당 8문항, 진행률 표시 및 자동 페이지 전환
- **유형별 테마**: 결과 유형에 따라 다크/라이트 모드 색상 자동 적용
- **Wing 분석**: Primary + Wing 유형 조합에 따른 subtype 설명
- **성향 분포 차트**: Recharts 기반 9유형 점수 시각화
- **API**: `/api/enneagram/*` 엔드포인트로 질문·유형·Wing 데이터 제공

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 |
| UI 컴포넌트 | HeroUI |
| 차트 | Recharts |
| 애니메이션 | Motion (Framer Motion) |
| API 통신 | Axios |

## 프로젝트 구조

```
next-enneagram/
├── public/
├── src/
│   ├── app/                  # 라우트 및 API
│   │   ├── api/enneagram/    # questions, primary-types, wing-analysis, submit
│   │   ├── enneagram/        # 검사 페이지, 결과 페이지 [type]
│   │   └── page.tsx          # 홈 (랜딩)
│   ├── components/
│   │   ├── enneagram/        # QuestionCard, ResultHeroCard, EnneagramScoreChart 등
│   │   └── ui/               # MagicCard, NeonGradientCard, AnimatedGradientText
│   ├── constants/            # storage-keys, enneagram, assessment
│   ├── contexts/             # EnneagramContext, EnneagramThemeContext
│   ├── data/                 # assessment-144q, primary-types, wing-analysis, enneagram-themes
│   ├── hooks/                # useToast
│   ├── lib/                  # enneagram(채점), array-utils, symbol-labels, utils
│   └── types/                # types.d.ts
├── Dockerfile
└── package.json
```

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (Turbopack)
npm run dev
```

브라우저에서 `http://localhost:3000` 접속.

```bash
# 프로덕션 빌드 및 실행
npm run build
npm start
```

## 데이터 소스

| 파일 | 용도 |
|------|------|
| `assessment-144q.json` | 144문항 설문 (id, type_num, content, weight, is_reverse, category) |
| `primary-types.json` | 9유형별 요약·특성·심볼 |
| `wing-analysis.json` | 18가지 Wing 조합별 subtype 분석 |
| `enneagram-themes.json` | 유형별 테마 색상 |

## 라이선스

LICENSE 파일 참조.
