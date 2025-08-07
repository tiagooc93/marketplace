# Base image with JDK
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the JAR file built from the chat-service module
COPY /target/chat-service-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the chat service runs on
EXPOSE 8081

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
