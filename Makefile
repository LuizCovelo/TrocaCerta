# TrocaCerta Makefile

.PHONY: help install dev build test clean deploy

# Default target
help:
	@echo "TrocaCerta - Comandos disponíveis:"
	@echo ""
	@echo "  install    - Instala todas as dependências"
	@echo "  dev        - Inicia ambiente de desenvolvimento"
	@echo "  build      - Compila o projeto para produção"
	@echo "  test       - Executa todos os testes"
	@echo "  lint       - Executa linting em todo o código"
	@echo "  clean      - Remove node_modules e arquivos temporários"
	@echo "  deploy     - Deploy para produção"
	@echo "  docker-up  - Sobe ambiente Docker"
	@echo "  docker-down - Para ambiente Docker"
	@echo ""

# Installation
install:
	@echo "📦 Instalando dependências..."
	npm run install:all

# Development
dev:
	@echo "🚀 Iniciando ambiente de desenvolvimento..."
	npm run dev

# Build
build:
	@echo "🔨 Compilando projeto..."
	npm run build

# Testing
test:
	@echo "🧪 Executando testes..."
	npm test

# Linting
lint:
	@echo "🔍 Executando linting..."
	npm run lint

# Cleaning
clean:
	@echo "🧹 Limpando arquivos temporários..."
	rm -rf node_modules frontend/node_modules backend/node_modules
	rm -rf frontend/dist backend/dist

# Deployment
deploy:
	@echo "🚀 Iniciando deploy..."
	./scripts/deploy.sh

# Docker commands
docker-up:
	@echo "🐳 Iniciando containers Docker..."
	docker-compose up -d

docker-down:
	@echo "🐳 Parando containers Docker..."
	docker-compose down

# Database commands
migrate:
	@echo "🗃️  Executando migrações..."
	cd backend && npm run migrate

seed:
	@echo "🌱 Executando seeds..."
	cd backend && npm run seed

# Quick start
quick-start: install migrate seed dev
