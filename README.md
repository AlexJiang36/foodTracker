# Food Tracker Web Application

A Spring Boot web application for tracking food expiry dates and reducing food waste. Manage your pantry by monitoring expiration dates, categorizing food items, and getting smart recipe suggestions for items about to expire.

## Features

- **Food Inventory Management** - Add, update, and delete food items with detailed tracking
- **Expiry Date Monitoring** - Automatically track and categorize food by status (Good, Expiring Soon, Expired)
- **Smart Search** - Find foods quickly by name or category
- **Donation Tracking** - Mark foods as donated and track donation history
- **Recipe Suggestions** - Get recipe ideas based on foods about to expire
- **Statistics Dashboard** - View comprehensive inventory analytics
- **REST API** - 17 fully documented endpoints for programmatic access
- **Responsive Web Interface** - Clean, intuitive UI with color-coded status indicators
- **Persistent Storage** - File-based H2 database that saves data across restarts

## Tech Stack

- **Backend**: Spring Boot 3.3.0
- **Language**: Java 21
- **Database**: H2 (file-based, persistent storage)
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Maven 3.6+
- **Frontend**: HTML5, CSS3, Vanilla JavaScript

## Quick Start

### Prerequisites

- Java 21 or higher
- Maven 3.6.0 or higher
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/food-tracker-web.git
cd food-tracker-web

# Build the project
mvn clean install

# Run the application
./run.sh          # Linux/macOS
# or
run.bat           # Windows
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```


## Food Status Categories

- **GOOD** - Food is fresh and won't expire within 3 days
- **EXPIRING_SOON** - Food will expire within 3 days (urgent action recommended)
- **EXPIRED** - Food has passed its expiry date (should not be consumed)

## Configuration

### Application Properties

Located in `src/main/resources/application.properties`:

```properties
# Server
server.port=8080

# Database (H2 - File-based Persistent Storage)
spring.datasource.url=jdbc:h2:~/foodtracker/foodtrackerdb;AUTO_SERVER=TRUE
spring.datasource.username=sa
spring.datasource.password=

# H2 Console (Development)
spring.h2.console.enabled=true

# JPA
spring.jpa.hibernate.ddl-auto=update
```

### H2 Database Console

Access at: `http://localhost:8080/h2-console`

**Connection:**
- URL: `jdbc:h2:~/foodtracker/foodtrackerdb;AUTO_SERVER=TRUE`
- Username: `sa`
- Password: (leave empty)

### Database Files

Your data is stored in files that persist across restarts:
- **Mac/Linux**: `~/foodtracker/foodtrackerdb.mv.db`
- **Windows**: `C:\Users\<YourUsername>\foodtracker\foodtrackerdb.mv.db`

## Development

### Build Commands

```bash
mvn clean install        # Full build
mvn compile              # Compile source
mvn test                 # Run tests
mvn spring-boot:run      # Run application
mvn clean                # Clean build
```

### Project Dependencies

```xml
spring-boot-starter-web           (REST API)
spring-boot-starter-data-jpa      (Database ORM)
h2                                (Database)
spring-boot-devtools              (Development tools)
spring-boot-starter-test          (Testing)
```

## Data Model

### Food Entity

| Field | Type | Description |
|-------|------|-------------|
| id | Long | Primary key (auto-generated) |
| name | String | Food name |
| quantity | Integer | Amount |
| unit | String | Unit (kg, liters, pack, etc.) |
| expiryDate | LocalDate | Expiration date |
| addedDate | LocalDate | Date added |
| category | String | Food category |
| donated | Boolean | Donation status |
| donatedDate | LocalDate | Date donated |

### Computed Properties

- `getDaysUntilExpiry()` - Days until expiry
- `isExpired()` - Whether food is expired
- `isExpiringSoon()` - Whether expiring within 3 days
- `getStatus()` - Status string (GOOD/EXPIRING_SOON/EXPIRED)


## Future Enhancements

- User authentication and multi-user support
- Mobile app (iOS/Android)
- Barcode scanning integration
- Nutritional information API integration
- Machine learning-based expiry predictions
- Shopping list generation based on recipes
- Email notifications for expiring foods
- Docker containerization
- Meal planning features

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Acknowledgments

- Spring Boot team for the excellent framework
- Hibernate for ORM support
- The open-source community

---

**Ready to reduce food waste? Start tracking your food inventory today! 🚀**
