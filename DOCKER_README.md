# Docker Setup for IHC Project

This project includes Docker configuration for running PostgreSQL database only. The backend API runs locally for development.

## Prerequisites

- Docker and Docker Compose installed on your system
- Node.js 18+ (for local backend development)

## Quick Start

### 1. Start the PostgreSQL Database

```bash
# Start PostgreSQL database
docker-compose up -d

# Check if database is running
docker-compose ps

# View database logs
docker-compose logs -f
```

### 2. Stop Database

```bash
# Stop database service
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

## Database Configuration

### Connection Details

- **Host**: localhost (or `postgres` from within Docker network)
- **Port**: 5432
- **Database**: ihc_database
- **Username**: ihc_user
- **Password**: ihc_password

### Connection URL

```
postgresql://ihc_user:ihc_password@localhost:5432/ihc_database
```

### Environment Variables

Copy the example environment file:

```bash
cp backend/env.example backend/.env
```

Then update the values in `.env` as needed.

## Database Management

### Connect to Database

```bash
# Connect using Docker
docker-compose exec postgres psql -U ihc_user -d ihc_database

# Or connect from host machine
psql -h localhost -p 5432 -U ihc_user -d ihc_database
```

### View Database Logs

```bash
docker-compose logs postgres
```

### Backup Database

```bash
# Create backup
docker-compose exec postgres pg_dump -U ihc_user ihc_database > backup.sql

# Restore from backup
docker-compose exec -T postgres psql -U ihc_user ihc_database < backup.sql
```

## Development Workflow

### Backend Development

1. **Start database**: `docker-compose up -d`
2. **Install dependencies**: `cd backend && npm install`
3. **Start backend**: `npm run dev`

The backend will connect to the PostgreSQL database running in Docker.

## Troubleshooting

### Database Connection Issues

1. **Check if PostgreSQL is running**:
   ```bash
   docker-compose ps
   ```

2. **Check database logs**:
   ```bash
   docker-compose logs -f
   ```

3. **Verify connection**:
   ```bash
   docker-compose exec postgres pg_isready -U ihc_user
   ```

### Port Conflicts

If port 5432 is already in use:

1. **Change port in docker-compose.yml**:
   ```yaml
   ports:
     - "5433:5432"  # Change 5432 to 5433
   ```

2. **Update environment variables accordingly**

### Reset Database

To completely reset the database:

```bash
docker-compose down -v
docker-compose up -d
```

## Database Schema

The database includes the following tables:

- **users**: User accounts with authentication data
- **user_sessions**: JWT token management

See `backend/database/init/01-create-tables.sql` for the complete schema.

## Security Notes

- Default credentials are for development only
- Change passwords for production environments
- Use environment variables for sensitive data
- Consider using Docker secrets for production deployments
