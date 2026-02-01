# Docker Setup for Portfolio

This guide covers running the portfolio locally using Docker Compose.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## Quick Start

### 1. Start the Development Environment

```bash
# From the portfolio root directory
docker-compose up -d
```

This will:
- Build the frontend container
- Install all npm dependencies
- Start the Vite dev server on port 5173
- Enable hot-reload for instant code changes

### 2. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173

### 3. View Logs

```bash
# View all logs
docker-compose logs -f

# View frontend logs only
docker-compose logs -f frontend
```

### 4. Stop the Environment

```bash
# Stop containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes
docker-compose down -v
```

## Development Workflow

### Hot Reload

The frontend supports hot module replacement (HMR). Changes to files in `frontend/src/` will automatically reload in the browser.

### Rebuild After Dependency Changes

If you modify `package.json`:

```bash
# Rebuild the frontend container
docker-compose up -d --build frontend
```

### Execute Commands in Container

```bash
# Open shell in frontend container
docker-compose exec frontend sh

# Run npm commands
docker-compose exec frontend npm install <package-name>
docker-compose exec frontend npm run build
```

## Production Build

To build and serve the production version:

```bash
# Build production image
docker build --target production -t portfolio-frontend:prod ./frontend

# Run production container
docker run -p 8080:80 portfolio-frontend:prod
```

Access at: http://localhost:8080

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, modify the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "3000:5173"  # Change 3000 to any available port
```

### Container Won't Start

Check logs for errors:
```bash
docker-compose logs frontend
```

### Hot Reload Not Working

If changes aren't reflecting:
1. Ensure volumes are mounted correctly in `docker-compose.yml`
2. Try rebuilding: `docker-compose up -d --build`
3. Clear browser cache

### Permission Issues

On Linux, if you encounter permission issues:
```bash
sudo chown -R $USER:$USER frontend/node_modules
```

## Architecture

```
portfolio/
├── docker-compose.yml       # Orchestrates all services
├── frontend/
│   ├── Dockerfile          # Multi-stage build (dev + prod)
│   ├── .dockerignore       # Excludes files from build context
│   └── src/                # Source code (mounted for hot reload)
```

## Environment Variables

Currently no environment variables are required. For future configuration:

1. Create `.env` file in project root
2. Reference in `docker-compose.yml`:
   ```yaml
   environment:
     - VITE_API_URL=${API_URL}
   ```

## Network

All services run on the `portfolio-network` bridge network, allowing inter-service communication using service names.

## Health Checks

The frontend development server is healthy when:
- Vite dev server starts successfully
- Port 5173 is accessible
- HMR websocket connection established

---

**Need help?** Check the logs first: `docker-compose logs -f`
