# demo-front

Next.js(App Router) + TypeScript 기반 데모 프론트엔드. 버튼 클릭 시 백엔드 `getUserInfo` API를 호출해 결과를 표로 보여주는 페이지 하나만 있다.

## 실행
```bash
npm install
npm run dev
```

서버는 `http://localhost:3001` 에서 동작하며(Turbopack), `demo-back`(`http://localhost:8091`)이 함께 실행되어 있어야 정상적으로 데이터를 조회할 수 있다.

백엔드 주소는 `.env.local`의 `NEXT_PUBLIC_API_BASE_URL`로 설정한다.
