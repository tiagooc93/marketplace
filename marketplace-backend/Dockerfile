#Base image with JDK
FROM openjdk:17-jdk-slim

#Set working directory
WORKDIR /app

#Copy the JAR file
COPY /target/marketplace-0.0.1-SNAPSHOT.jar app.jar

#Expose port
EXPOSE 8080

#Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
