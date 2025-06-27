#!/bin/bash
set -e  # Encerra o script se qualquer comando falhar

# Diretório do projeto
cd /home/musicoson-web

# Atualiza imagens Docker e reinicia os containers
docker compose down || true  # Ignora erros se o container não existir
docker compose build --no-cache  # Força rebuild para pegar alterações
docker compose up -d

# Limpa imagens antigas (opcional)
docker image prune -f

echo "Deploy concluído em $(date)" >> /home/musicoson-web/deploy.log