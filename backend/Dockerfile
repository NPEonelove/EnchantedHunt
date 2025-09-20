FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests=true

FROM openjdk:21
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENV SERVER_PORT=8080
ENV JWT_SECRET_KEY=default-secret
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://user_db:5435/users
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=1

EXPOSE ${SERVER_PORT}
ENTRYPOINT ["java", "-jar", "app.jar"]
