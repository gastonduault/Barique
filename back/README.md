## CMD:
- `docker system prune -a --volumes`
- `docker compose --env-file .env -f docker-compose-dev.yml up --build`
- `docker compose --env-file .env -f docker-compose-dev.yml down --volumes`
- `docker compose --env-file .env -f docker-compose-prod.yml up --build`
- `docker compose --env-file .env -f docker-compose-prod.yml down --volumes`
