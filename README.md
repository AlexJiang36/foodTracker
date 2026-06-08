# Food Tracker Web Application

Food Tracker is a full-stack Spring Boot web application built during HackCamp 2025 to help users manage pantry items, track expiry dates, search inventory, and reduce food waste through better visibility into what needs to be used soon.

This project demonstrates Java backend development, REST API design, persistent H2 database storage, frontend integration with HTML/CSS/JavaScript, and user workflow testing.

## Features

* Food inventory management: add, update, search, and delete pantry items
* Expiry tracking: identify items that are good, expiring soon, or expired
* Search and filtering: find food items by name or category
* Donation tracking: mark extra food as donated
* Recipe suggestions: generate simple recipe ideas based on food items close to expiry
* Statistics view: summarize inventory status and expiry risk
* REST API support for food item workflows
* Responsive web interface built with HTML, CSS, and JavaScript
* Persistent H2 database storage across application restarts

## Tech Stack

* Backend: Java 21, Spring Boot 3.3.0
* Database: H2, Spring Data JPA, Hibernate
* Frontend: HTML5, CSS3, JavaScript
* Build Tool: Maven
* Architecture: REST API with a database-backed web interface

## Quick Start

### Prerequisites

* Java 21 or higher
* Maven 3.6.0 or higher
* Git

### Installation

```bash
git clone https://github.com/AlexJiang36/foodTracker.git
cd foodTracker

mvn clean install
mvn spring-boot:run
```

You can also run the helper script:

```bash
./run.sh
```

For Windows:

```bash
run.bat
```

### Access the Application

Open your browser and go to:

```text
http://localhost:8080
```

## Food Status Categories

* GOOD: food is not close to expiry
* EXPIRING_SOON: food will expire within 3 days
* EXPIRED: food has passed its expiry date

## Configuration

Application configuration is located at:

```text
src/main/resources/application.properties
```

Default local settings:

```properties
server.port=8080

spring.datasource.url=jdbc:h2:~/foodtracker/foodtrackerdb;AUTO_SERVER=TRUE
spring.datasource.username=sa
spring.datasource.password=

spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=update
```

### H2 Database Console

The H2 console is available at:

```text
http://localhost:8080/h2-console
```

Connection settings:

```text
JDBC URL: jdbc:h2:~/foodtracker/foodtrackerdb;AUTO_SERVER=TRUE
Username: sa
Password: leave empty
```

The database file is stored locally and persists across application restarts.

## Project Structure

```text
src/main/java/com/foodtracker
├── controller      # REST API controllers
├── dto             # Data transfer objects
├── model           # Entity models
├── repository      # Spring Data repositories
├── service         # Business logic
└── FoodTrackerApplication.java

src/main/resources
├── application.properties
└── static          # Frontend HTML/CSS/JavaScript files
```

## Development Commands

```bash
mvn clean install        # Build the project
mvn compile              # Compile source code
mvn test                 # Run tests
mvn spring-boot:run      # Start the application
mvn clean                # Remove build output
```

## Data Model

The main food item model stores information such as:

| Field       | Description                |
| ----------- | -------------------------- |
| id          | Auto-generated primary key |
| name        | Food item name             |
| quantity    | Amount of food             |
| unit        | Unit of measurement        |
| expiryDate  | Expiration date            |
| addedDate   | Date added                 |
| category    | Food category              |
| donated     | Donation status            |
| donatedDate | Date donated               |

The application also computes expiry-related status such as whether an item is expired, expiring soon, or still good.

## Future Improvements

* User authentication and multi-user support
* Barcode or receipt scanning for faster item entry
* More advanced recipe suggestions
* Email or notification reminders for expiring items
* Docker containerization
* Improved test coverage and deployment setup

## Project Context

This project was built as a HackCamp 2025 team project. My main contribution was developing the backend application structure, REST API workflows, persistent data model, and frontend-backend integration for the core food inventory features.
