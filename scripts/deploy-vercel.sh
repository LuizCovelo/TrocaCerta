#!/bin/bash

echo "🚀 Iniciando deploy no Vercel..."

# Verificar se a CLI do Vercel está instalada
if ! command -v vercel &> /dev/null; then
    echo "Instalando Vercel CLI..."
    npm install -g vercel
fi

# Navegar para o diretório do frontend
cd frontend

# Build do projeto
echo "📦 Building frontend..."
npm run build

# Deploy para produção
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deploy completed!"
