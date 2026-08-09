# demo-project

버튼 클릭 시 백엔드에서 사용자 정보를 조회해 보여주는 간단한 프론트-백엔드 연동 데모.

- `demo-front`: Next.js(App Router) + TypeScript, 3001번 포트
- `demo-back`: Spring Boot(Java), 8091번 포트

자세한 내용은 [PRD.md](PRD.md), 각 폴더의 README([demo-front](demo-front/README.md), [demo-back](demo-back/README.md)) 참고.

## 사전 준비물

| 항목 | 버전 |
| --- | --- |
| Node.js | 20+ |
| Java (JDK) | 17+ |
| Maven | 3.9+ |

Maven이 없다면 [공식 사이트](https://maven.apache.org/download.cgi)에서 받거나, `winget install Apache.Maven` 등으로 설치한다.

## 처음 받았을 때 (Clone 이후 최초 1회)

### 1. demo-back
별도 설정 파일 없이 바로 실행 가능하다.

### 2. demo-front
`.env.local`은 `.gitignore`에 포함되어 있어 저장소에 없다. 아래 내용으로 직접 생성해야 한다.

```bash
cd demo-front
echo NEXT_PUBLIC_API_BASE_URL=http://localhost:8091 > .env.local
npm install
```

## 실행

두 서버를 각각 별도 터미널에서 띄운다.

```bash
# 터미널 1 - 백엔드 (http://localhost:8091)
cd demo-back
mvn spring-boot:run
```

```bash
# 터미널 2 - 프론트엔드 (http://localhost:3001)
cd demo-front
npm run dev
```

`http://localhost:3001` 접속 → 버튼 클릭 → `demo-back`의 `GET /api/user-info` 호출 결과가 표로 표시된다.
