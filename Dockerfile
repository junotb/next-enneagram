# ---- Dependencies ----
FROM node:lts-alpine AS deps
WORKDIR /app

# npm 패키지 정보 복사
COPY package.json package-lock.json* ./

# 의존성 설치
RUN npm ci

# ---- Builder ----
FROM node:lts-alpine AS builder
WORKDIR /app

# node_modules 복사
COPY --from=deps /app/node_modules ./node_modules

# 앱 전체 복사 (소스)
COPY . .

# 프로덕션 빌드
RUN npm run build

# ---- Production Runner ----
FROM node:lts-alpine AS runner
WORKDIR /app

# NODE_ENV를 production으로 설정
ENV NODE_ENV=production

# 불필요한 파일 제거
RUN rm -rf node_modules/.cache

# 빌드 산출물, node_modules, package.json만 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 3000 포트 오픈
EXPOSE 3000

# Next.js 실행
CMD ["npm", "start"]
