# E-commerce Microservices App

This repository contains a microservices-based e-commerce application. The services are containerized using Docker and can be orchestrated using Docker Compose.

## Features

- **Authentication Service**: Node.js with MySQL
- **Products Service**: Strapi with PostgreSQL
- **Orders Service**: Flask with MongoDB
- **Frontend**: Nuxt.js / React.js

## Prerequisites

- Docker installed on your machine.
- Docker Compose installed.

## Getting Started

To run the application, execute the following command:

```bash
docker-compose up --build -d
