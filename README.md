
# Chappy (AI 기반 프로그래밍 학습 플랫폼)

## 🪄 서비스 소개
- 실시간 코드 채점과 피드백 기능이 통합된 온라인 강의 + 프로그래밍 학습 플랫폼  
- 과제/시험 제출, 코드 실행, 자동 피드백 생성까지 가능한 학습 전용 웹 서비스 

## 👫 개발 기간 및 팀 구성
- 기간: 2022.06 ~ 2022.12
- 인원: 5명 (Fullstack 3명, 기획·AI 2명)

## 😎 담당 역할
- Next.js 기반 API Route 구조 설계 및 백엔드 개발  
- MongoDB 기반 스키마 설계 및 성능 최적화 (Aggregation 활용)  
- 코드 실행, 제출, 피드백 로직 비동기 API로 구현  
- 세션 기반 로그인 및 권한 관리 (교수/학생)  

## 📌 주요 기능
- 강의 등록 / 수강 / 공지사항 확인
- 과제/시험 문제 풀이 및 제출
- 실시간 코드 실행 및 GPT 기반 피드백 자동 생성
- 교수/학생 권한 분리 및 과제/시험 출제/평가 기능

## ⚙️ 기술 스택
- Backend: Next.js API Route, JavaScript, MongoDB
- Frontend: Next.js, React
- 협업: GitHub, Slack, Figma

## 프로젝트 구조
기능(도메인) 단위로 디렉토리를 분리하고, MongoDB는 DB 간 관계 구조(Reference/Embedding)를 최적화하여 성능과 유지보수성을 높였습니다.

```
Chappy-2022
├─ GraFee/                # AI 기반 피드백 생성 모듈
│  ├─ core/               # Feedback, Grader 등 기능 모듈
│  ├─ models/             # 프로그램/과제/피드백 등 구조 정의
│  └─ utils/              # 코드 실행, AST 파싱 등 유틸
├─ pages/api/             # Next.js API Routes
│  ├─ lecture/            # 강의 정보, 과제 등록/조회
│  ├─ submission/         # 제출/피드백/채점
│  ├─ user/               # 유저 정보 및 권한 관리
│  └─ ...
├─ models/                # MongoDB 기반 도메인별 모델
│  ├─ lecture/
│  ├─ submission/
│  └─ user/
├─ lib/                   # DB 연결, API 통합
├─ store/                 # Redux 기반 상태 관리
├─ public/, styles/, components/  # UI 및 디자인
├─ README.md, next.config.js, package.json, ...
```
