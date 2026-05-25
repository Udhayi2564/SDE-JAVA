OrgVault

OrgVault is a full stack Salesforce metadata backup manager built with React, Spring Boot, Spring Data JPA, and PostgreSQL.

Project Structure

```text
orgvault/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/orgvault/
│       │   ├── controller/BackupController.java
│       │   ├── model/BackupRecord.java
│       │   ├── model/BackupStatus.java
│       │   ├── repository/BackupRepository.java
│       │   ├── service/BackupService.java
│       │   └── OrgVaultApplication.java
│       └── resources/application.properties
└── frontend/
    ├── package.json
    ├── index.html
    └── src/
        ├── components/
        │   ├── BackupCard.jsx
        │   ├── BackupForm.jsx
        │   └── BackupList.jsx
        ├── services/api.js
        ├── App.jsx
        ├── main.jsx
        └── styles.css
```

Database

Create the PostgreSQL database:

```bash
createdb orgvault
```

Update `backend/src/main/resources/application.properties` with your PostgreSQL username and password.

Run Backend

```bash
cd backend
mvn spring-boot:run
```

The backend runs at `http://localhost:8080`.

Run Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:3000`.

REST Endpoints

```text
POST   /api/backups
GET    /api/backups
GET    /api/backups/org/{orgName}
GET    /api/backups/status/{status}
GET    /api/backups/type/{fileType}
PUT    /api/backups/{id}/status?status=RESTORED
DELETE /api/backups/{id}
GET    /api/backups/stats
```

Swagger UI

After starting the backend, open:

```text
http://localhost:8080/swagger-ui/index.html
```

OpenAPI JSON is available at:

```text
http://localhost:8080/v3/api-docs
```
