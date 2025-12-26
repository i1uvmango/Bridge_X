# 📊 마음쉼터 (HUSS) - 프로젝트 최종 보고서

## 1. 프로젝트 개요

### 1.1 프로젝트 명
**마음쉼터 (HUSS)** - 분쟁지역 청소년을 위한 AI 심리 상담 & 긴급 구조 플랫폼

### 1.2 기획 의도
분쟁 지역이나 재난 상황에 처한 청소년들은 극심한 트라우마를 겪지만, 심리 상담 인프라 부족으로 적절한 도움을 받지 못하고 있습니다. 이에 **AI 챗봇**을 통해 24시간 즉각적인 정서 지원을 제공하고, **위기 상황(자살/자해 등)** 감지 시 전문 상담사와 **화상으로 즉시 연결**하는 골든타임 확보 시스템을 구축하였습니다.

---

## 2. 시스템 아키텍처

### 2.1 전체 구조도
사용자(Web) ↔ [Frontend: Next.js] ↔ [Backend: NestJS] ↔ [DB: PostgreSQL]
                                          ↕
                                     [AI Engine: Google Gemini]
                                     [Video SDK: Cisco Webex]

### 2.2 핵심 프로세스 흐름
1. **접속 및 탐색**: 사용자가 세련된 Glassmorphism UI의 웹사이트에 접속
2. **AI 상담**: Gemini 기반 AI와 자연어로 대화 (다국어 지원)
3. **위기 감지**: 대화 중 '죽고 싶어', '자해' 등 위험 키워드 발생 시 AI가 `[RISK_DETECTED]` 플래그 생성
4. **긴급 개입**: 백엔드에서 Risk 감지 즉시 Webex API를 호출하여 화상 미팅룸 생성
5. **상담 연결**: 채팅창에 🚨 **[긴급 상담 입장]** 버튼이 자동 생성되며, 클릭 시 상담사와 즉시 화상 연결

---

## 3. 기술 스택 (Tech Stack)

### 3.1 Frontend
- **Framework**: Next.js 15 (App Router 기반 최신 아키텍처)
- **Language**: TypeScript (안정적인 타입 시스템)
- **Styling**: TailwindCSS (Pastel Healing Theme, 반응형 최적화)
- **Design System**: Glassmorphism, Micro-interactions (Framer Motion)

### 3.2 Backend
- **Framework**: NestJS (확장성 높은 Node.js 프레임워크)
- **Database**: PostgreSQL (안정적인 관계형 데이터베이스)
- **ORM**: TypeORM (객체 중심 데이터 모델링)
- **API**: RESTful API Standard

### 3.3 AI & External Integrations
- **Artificial Intelligence**: Google Gemini API
    - Model: `gemini-2.5-flash` (최신 고속 모델 적용) / `gemini-pro` (Fallback)
    - Features: 페르소나 부여, 감정 분석, 위험도 평가
- **Video Conferencing**: Cisco Webex Meetings API
    - Features: 실시간 미팅 생성, 게스트 초대, 보안 접속

---

## 4. 주요 기능 상세

### 4.1 감성 AI 챗봇 (Emotional AI Chatbot)
- **공감 특화 페르소나**: "따뜻하고 안전한 전문 상담사"로 튜닝된 프롬프트 적용
- **다국어 자동 지원**: 사용자가 입력하는 언어(한국어, 영어 등)를 감지하여 동일 언어로 응답
- **짧고 간결한 케어**: 청소년의 눈높이에 맞춘 2~3문장의 부담 없는 대화 스타일

### 4.2 실시간 위기 감지 및 구조 시스템 (Real-time Crisis Intervention)
- **Keyword Monitoring**: 자살, 자해, 극심한 우울 등 고위험 단어 실시간 모니터링
- **AI 판단 알고리즘**: 단순 단어 매칭을 넘어, 문맥을 파악하여 `[RISK_DETECTED]` 신호 생성
- **Automated Workflow**: 신호 감지 -> 즉시 Webex 미팅 생성 -> UI 버튼 노출 (Zero-click Intervention Flow)

### 4.3 데이터 프라이버시 (Privacy First)
- **No-Log Policy**: 민감한 대화 원문은 DB에 저장하지 않고 세션 메모리에서만 처리 후 휘발
- **Anonymous Analytics**: 상담 개선을 위한 감정/주제 데이터는 비식별화하여 저장

---

## 5. 데이터베이스 설계 (ERD)

### Users (사용자)
- `user_id` (UUID): 고유 식별자
- `nickname`: 익명 닉네임
- `region`: 접속 지역 (분쟁 지역 분석용)

### Summaries (상담 요약)
- `summary_id`: 요약 ID
- `emotion_tags`: 감지된 감정 태그 배열 (JSON)
- `risk_flag`: 위험군 여부 (Boolean)
- `intensity_score`: 감정 격앙도 점수 (1-10)
- `user_id`: 사용자 FK

### Sessions (관리자용 로그)
- 상담 날짜, 연결된 Webex 미팅 ID, 최종 상태(종료/진행중)

---

## 6. 기대 효과

1. **골든타임 확보**: 야간이나 상담사 부재 시에도 AI가 1차 대응 및 위기 감지 수행
2. **심리적 장벽 완화**: 대인 상담을 꺼리는 청소년들에게 AI라는 부담 없는 창구 제공
3. **글로벌 확장성**: 다국어 지원을 통해 언어 장벽 없이 다양한 분쟁 지역 적용 가능

---

## 7. 향후 발전 과제

- **음성 상담 (Voice AI)**: 텍스트를 넘어 음성으로 대화하는 기능 추가
- **상담사 매칭**: 내담자의 특성(언어, 고민 유형)에 맞는 최적의 상담사 자동 배정 알고리즘
- **오프라인 지원**: 인터넷 연결이 불안정한 지역을 위한 Lite 버전 (SMS/LMS 기반) 프로토타입

---
*작성일: 2025-12-26*
*작성자: 프로젝트 HUSS 개발팀*
