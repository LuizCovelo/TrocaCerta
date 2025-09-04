#!/bin/bash

echo "🚗 TrocaCerta - Setup Completo"
echo "================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para print colorido
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar Node.js
print_info "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js não encontrado. Instale Node.js >= 16.0.0"
    exit 1
fi

NODE_VERSION=$(node --version)
print_status "Node.js encontrado: $NODE_VERSION"

# Verificar PostgreSQL
print_info "Verificando PostgreSQL..."
if ! command -v psql &> /dev/null; then
    print_warning "PostgreSQL CLI não encontrado. Certifique-se de que o PostgreSQL está instalado."
else
    print_status "PostgreSQL CLI encontrado"
fi

# Instalar dependências root
print_info "Instalando dependências do projeto..."
npm install

# Setup Frontend
print_info "Configurando Frontend..."
cd frontend
npm install
print_status "Frontend configurado"
cd ..

# Setup Backend
print_info "Configurando Backend..."
cd backend
npm install

# Configurar banco de dados se PostgreSQL estiver disponível
if command -v psql &> /dev/null; then
    print_info "Configurando banco de dados..."

    # Verificar se o arquivo .env existe
    if [ ! -f "../.env" ]; then
        print_info "Criando arquivo .env..."
        cp ../.env.example ../.env
        print_warning "Configure as variáveis de ambiente no arquivo .env antes de continuar"
    fi

    # Executar migrações (comentado por segurança)
    # print_info "Executando migrações..."
    # npm run migrate
    # print_status "Migrações executadas"

    print_warning "Execute 'npm run migrate' após configurar o .env"
fi

cd ..

print_status "Setup completo!"
echo ""
print_info "Próximos passos:"
echo "1. Configure o arquivo .env com suas credenciais"
echo "2. Execute: cd backend && npm run migrate"
echo "3. Execute: npm run dev (para ambos frontend e backend)"
echo ""
print_info "URLs de desenvolvimento:"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:3001"
echo ""
print_status "Happy coding! 🚗💨"
