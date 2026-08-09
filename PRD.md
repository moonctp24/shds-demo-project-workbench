# Demo Project PRD

다른 프로젝트에서 데모용으로 사용할 아주 간단한 프론트-백엔드 연동 예제.

## 요구사항
1. 프론트 서버는 페이지 1개만 갖는다.
2. 페이지는 버튼 1개 + 버튼 바로 아래 데이터 표시 영역(표)으로 구성한다.
3. 데이터 표시 영역은 구현하기 쉬운 형태(표)로 한다.
4. 버튼 클릭 시 백엔드 API를 GET 방식으로 호출한다.
5. 백엔드는 `getUserInfo` API 하나에 대한 파일들만 갖는다.
6. 백엔드는 해당 API 호출 시 정보를 JSON 형태로 프론트에 리턴한다.
7. 응답 JSON 스펙
   - `name`: "james"
   - `age`: 26
   - `phone`: "01011112222" (프론트에서 하이픈을 넣어 `010-1111-2222` 형태로 표시)

## 기술 스택 및 구조

### 프론트엔드 (`/demo-front`)
- Next.js 16 (App Router) + TypeScript, Turbopack 사용 (빌드/개발 서버 속도 최적화)
- 포트: **3001** (`npm run dev` → `next dev -p 3001`)
- 주요 파일
  - [demo-front/src/app/page.tsx](demo-front/src/app/page.tsx): 버튼 1개 + 결과 표 1개로 구성된 단일 페이지. 버튼 클릭 시 `GET {NEXT_PUBLIC_API_BASE_URL}/api/user-info` 호출, 전화번호는 `formatPhoneNumber`로 하이픈 포맷팅(`010-1111-2222`)해서 표시
  - [demo-front/src/app/page.module.css](demo-front/src/app/page.module.css): 버튼/표 스타일 (라이트/다크 모드 대응)
  - [demo-front/.env.local](demo-front/.env.local): `NEXT_PUBLIC_API_BASE_URL=http://localhost:8091`
- 실행: `cd demo-front && npm install && npm run dev`

### 백엔드 (`/demo-back`)
- Java 17 타깃 (로컬 실행 환경: JDK 21) + Spring Boot 3.3.4, Maven 빌드
- 포트: **8091** (`src/main/resources/application.yml`의 `server.port`)
- 주요 파일
  - [demo-back/pom.xml](demo-back/pom.xml): `spring-boot-starter-web` 단일 의존성
  - [demo-back/src/main/java/com/demo/back/DemoBackApplication.java](demo-back/src/main/java/com/demo/back/DemoBackApplication.java): 부트스트랩 클래스
  - [demo-back/src/main/java/com/demo/back/getuserinfo/GetUserInfoController.java](demo-back/src/main/java/com/demo/back/getuserinfo/GetUserInfoController.java): `GET /api/user-info` 하나만 제공. `@CrossOrigin(origins = "http://localhost:3001")`로 프론트 오리진 허용
  - [demo-back/src/main/java/com/demo/back/getuserinfo/UserInfoResponse.java](demo-back/src/main/java/com/demo/back/getuserinfo/UserInfoResponse.java): 응답 DTO(record) — `name`, `age`, `phone`
- 실행: `cd demo-back && mvn spring-boot:run`

## 진행 현황 (2026-07-27)
- 프론트/백엔드 스캐폴딩 및 코드 작성 완료
- `npm run build`로 프론트 빌드 검증 완료
- 로컬에 Java/Maven이 없어 최초에는 백엔드 빌드 검증을 하지 못함 → 이후 사용자가 JDK 21 설치, Maven은 `C:\SHDS\demo-project\.tools\apache-maven-3.9.9`에 별도로 받아 구성
- 백엔드(8091), 프론트(3001) 두 서버를 모두 기동하여 `curl http://localhost:8091/api/user-info`로 정상 응답(`{"name":"james","age":26,"phone":"01011112222"}`) 및 CORS 헤더(`Access-Control-Allow-Origin: http://localhost:3001`) 확인 완료
