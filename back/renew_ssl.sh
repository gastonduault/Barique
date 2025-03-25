#!/bin/bash

echo "Lancement du renouvellement du certificat SSL avec Certbot"

docker compose -f docker-compose-prod.yml run --rm certbot renew --webroot --webroot-path=/var/www/certbot

# check if succeed
if [ $? -eq 0 ]; then
  echo "Certificat renouvelé avec succès."
  echo "Redémarrage de Nginx pour appliquer le nouveau certificat..."
  docker compose -f docker-compose-prod.yml exec nginx nginx -s reload
else
  echo "
