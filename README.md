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

### Load Sample Data

```bash
curl -X POST http://localhost:8080/api/foods/sample-data
```

## Project Structure

```
food-tracker-web/
├── src/main/java/com/foodtracker/
│   ├── FoodTrackerApplication.java          (Entry point)
│   ├── controller/FoodController.java       (REST endpoints)
│   ├── service/                             (Business logic)
│   │   ├── FoodService.java
│   │   ├── RecipeSuggestionService.java
│   │   └── StatisticsDTO.java
│   ├── repository/FoodRepository.java       (Data access)
│   ├── model/Food.java                      (Entity)
│   └── dto/                                 (Transfer objects)
│       ├── FoodDTO.java
│       └── RecipeDTO.java
├── src/main/resources/
│   ├── application.properties               (Configuration)
│   └── static/index.html                    (Web UI)
├── pom.xml                                  (Dependencies)
├── run.sh & run.bat                         (Startup scripts)
└── README.md
```

## API Endpoints

### CRUD Operations
- `GET /api/foods` - Get all foods
- `GET /api/foods/{id}` - Get food by ID
- `POST /api/foods` - Add new food
- `PUT /api/foods/{id}` - Update food
- `DELETE /api/foods/{id}` - Delete food

### Status Filtering
- `GET /api/foods/status/expired` - Get expired foods
- `GET /api/foods/status/expiring-soon` - Foods expiring within 3 days
- `GET /api/foods/status/good` - Fresh foods
- `GET /api/foods/active` - Non-donated foods

### Search & Organize
- `GET /api/foods/search?query={text}` - Search by name
- `GET /api/foods/category/{category}` - Filter by category
- `GET /api/foods/statistics` - Get inventory statistics

### Donations
- `POST /api/foods/{id}/donate` - Mark as donated
- `GET /api/foods/donated/list` - Get donated foods

### Recipes & Utilities
- `GET /api/foods/recipes/{foodName}` - Get recipe suggestions
- `GET /api/foods/recipes/category/{category}` - Recipes for category
- `POST /api/foods/sample-data` - Load sample data

## API Examples

### Add a Food Item

```bash
curl -X POST http://localhost:8080/api/foods \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Milk",
    "quantity": 2,
    "unit": "liters",
    "expiryDate": "2025-12-20",
    "category": "Dairy"
  }'
```

**Response:**
```json
{
  "id": 1,
  "name": "Milk",
  "quantity": 2,
  "unit": "liters",
  "expiryDate": "2025-12-20",
  "addedDate": "2025-11-16",
  "category": "Dairy",
  "donated": false,
  "status": "GOOD",
  "daysUntilExpiry": 34
}
```

### Get Expiring Foods

```bash
curl http://localhost:8080/api/foods/status/expiring-soon
```

**Response:**
```json
[
  {
    "id": 2,
    "name": "Yogurt",
    "quantity": 1,
    "unit": "pack",
    "expiryDate": "2025-11-19",
    "addedDate": "2025-11-01",
    "category": "Dairy",
    "donated": false,
    "status": "EXPIRING_SOON",
    "daysUntilExpiry": 3
  }
]
```

### Get Statistics

```bash
curl http://localhost:8080/api/foods/statistics
```

**Response:**
```json
{
  "totalItems": 10,
  "expiredItems": 1,
  "expiringItems": 2,
  "goodItems": 7,
  "donatedItems": 3,
  "categoryBreakdown": {
    "Dairy": 3,
    "Produce": 4,
    "Meat": 2,
    "Other": 1
  }
}
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

### Adding Features

1. Create method in `FoodController.java`
2. Add logic in `FoodService.java`
3. Create query in `FoodRepository.java` if needed
4. Test the endpoint with curl or frontend

### Project Dependencies

```xml
spring-boot-starter-web           (REST API)
spring-boot-starter-data-jpa      (Database ORM)
h2                                (Database)
spring-boot-devtools              (Development tools)
spring-boot-starter-test          (Testing)
```

## Switching to PostgreSQL (Production)

### Step 1: Update pom.xml

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Step 2: Update application.properties

```properties
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.datasource.url=jdbc:postgresql://localhost:5432/foodtracker
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver
```

### Step 3: Rebuild and Run

```bash
mvn clean install
mvn spring-boot:run
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

## Troubleshooting

### Port 8080 Already in Use

Change port in `application.properties`:
```properties
server.port=8081
```

### H2 Console Not Accessible

Verify in `application.properties`:
```properties
spring.h2.console.enabled=true
```

### Maven Build Fails

Ensure Java 21 is installed:
```bash
java -version
```

### Reset Database

```bash
rm ~/foodtracker/foodtrackerdb.mv.db
rm ~/foodtracker/foodtrackerdb.trace.db
./run.sh  # Restart to create new database
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

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
