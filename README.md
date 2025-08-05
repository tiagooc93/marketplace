# Marketplace

## About The Project

This is a full-stack marketplace web application fully developed by me. The backend is built with **Java** using the **Spring Boot** framework, and the frontend is developed with **React**.

Below are two demonstration GIFs. The first showcases the main page displaying some catalog products:

![Demo GIF](gif1.gif)

The second one demonstrates the product search feature with its available filters:

![Demo GIF](gif2.gif)


## Main Technologies

- React
- Java Spring Boot
- Spring Security & JWT
- RabbitMQ
- PostgreSQL
- Docker


## Features Implemented

- User authentication with login and registration using JWT.
- Product ad creation with name, description, price, image, and condition.
- Product search with filters by price range, brand, and condition.
- User dashboard to manage ads, with the ability to view and delete their listings.
- Shopping cart functionality (add/remove products).
- Real-time chat system for buyer-seller communication.



## Prerequisites

To run this project, make sure you have **Docker** installed. You can find the installation instructions here:

- [Docker Documentation](https://docs.docker.com/)



## Getting Started

1. **Clone the repository:**


```bash
   git clone https://github.com/tiagooc93/marketplace
   cd marketplace
```

2. **Set up environment variables:**

Then you'll need to create a .env file with configurations. For simplicity, i put a .env.example on the repo, so you'll just need to copy it into the .env with the following command:

```bash
cp .env.example .env
```

3. **Start the application with Docker Compose:**


Then use docker to run the whole project based on the docker-compose configuration file.

```bash
sudo docker-compose up
```

## Usage

By default, the services will be accessible at:

    Frontend: http://localhost:3000

    Backend: http://localhost:8080
    
Just open your browser and visit:

```bash
localhost:3000/
``````



