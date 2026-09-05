# demo-back

Spring Boot 기반 데모 백엔드. `getUserInfo` API 하나만 제공한다.

## 요구사항
- Java 17+
- Maven 3.9+

## 실행
```bash
mvn spring-boot:run
```
또는 빌드 후 실행:
```bash
mvn clean package
java -jar target/demo-back-0.0.1-SNAPSHOT.jar
```

서버는 `http://localhost:8091` 에서 동작한다.

## API

### GET /api/user-info
응답 예시:
```json
{
  "name": "james",
  "age": 26,
  "phone": "01011112222"
}
```

## Render 배포

이 저장소는 `demo-front`와 `demo-back`이 한 저장소에 같이 있는 모노레포이므로, Render 서비스 설정에서 아래처럼 지정해야 한다.

- **Root Directory**: `demo-back` (이 디렉터리를 기준으로 `Dockerfile`을 찾음)
- **Environment**: Docker
- **Dockerfile Path**: `Dockerfile` (Root Directory가 `demo-back`이면 자동으로 `demo-back/Dockerfile`을 가리킴)

Render는 컨테이너가 리스닝할 포트를 `PORT` 환경변수로 주입한다. `application.yml`의 `server.port`가 `${PORT:8091}`로 설정되어 있어, Render에서는 `PORT` 값을, 로컬에서는 기본값 8091을 사용한다.

CORS 허용 origin도 `CORS_ALLOWED_ORIGIN` 환경변수로 오버라이드된다 (`application.yml`의 `app.cors.allowed-origin`, 기본값 `http://localhost:3001`). Render 서비스에는 일단 `CORS_ALLOWED_ORIGIN=*`(모든 origin 허용)으로 등록해두었고, `demo-front` 배포 주소가 정해지면 실제 배포 도메인(`https://...`)으로 좁혀야 한다.
