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
