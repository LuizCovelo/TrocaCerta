#!/bin/bash

echo "🚀 Iniciando deploy no Render..."

# Verificar se o projeto está conectado ao Git
if [ ! -d ".git" ]; then
    echo "❌ Este projeto precisa estar em um repositório Git"
    exit 1
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Há mudanças não commitadas. Commitando automaticamente..."
    git add .
    git commit -m "Deploy: $(date)"
fi

# Push para o repositório
echo "📤 Pushing to repository..."
git push origin main

echo "✅ Push completed! Check Render dashboard for deployment status."
echo "🌐 Render Dashboard: https://dashboard.render.com/"
