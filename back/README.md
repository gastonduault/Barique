## CMD:
- `docker system prune -a --volumes`
- `docker compose --env-file .env -f docker-compose-dev.yml up --build`
- `docker compose --env-file .env -f docker-compose-dev.yml down --volumes`
- `docker compose --env-file .env -f docker-compose-prod.yml up --build`
- `docker compose --env-file .env -f docker-compose-prod.yml down --volumes`
- `scp .\flask\firebase-adminsdk.json root@147.79.114.98:/Barique/back/flask`
```bash
scp .\back\flask\firebase-adminsdk.json root@147.79.114.98:Barique/back/flask
```
