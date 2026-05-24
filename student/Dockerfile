# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app

# Copy the pom.xml and download dependencies to utilize Docker cache
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the actual source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create a minimal production image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy only the compiled JAR file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port configured in application.properties (8081)
EXPOSE 8081

# Set the entrypoint to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
