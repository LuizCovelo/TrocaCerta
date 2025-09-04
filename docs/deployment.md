# 🚀 Guia Completo de Implantação - TrocaCerta

Este guia fornece instruções passo a passo para implantar o TrocaCerta em diferentes plataformas de hospedagem.

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Configuração Inicial](#configuração-inicial)
3. [Deploy Frontend - Vercel](#deploy-frontend---vercel)
4. [Deploy Backend - Render](#deploy-backend---render)
5. [Deploy Alternativo - Heroku](#deploy-alternativo---heroku)
6. [Deploy com Docker](#deploy-com-docker)
7. [Configuração de Domínio](#configuração-de-domínio)
8. [Monitoramento e Logs](#monitoramento-e-logs)
9. [Troubleshooting](#troubleshooting)

## 🔧 Pré-requisitos

### Ferramentas Necessárias
- ✅ **Node.js** (>= 16.0.0)
- ✅ **Git** (para versionamento)
- ✅ **Conta GitHub** (para CI/CD)
- ✅ **PostgreSQL** (banco de dados)

### Contas de Hospedagem
- 🌐 **Vercel** (frontend) - [vercel.com](https://vercel.com)
- 🔧 **Render** (backend) - [render.com](https://render.com)
- 📊 **Supabase/Neon** (banco de dados) - alternativas cloud

## ⚙️ Configuração Inicial

### 1. Preparar Repositório Git
```bash
# Clonar o projeto
git clone https://github.com/yourusername/trocacerta.git
cd trocacerta

# Criar repositório próprio
git remote set-url origin https://github.com/SEU_USUARIO/trocacerta.git
git push -u origin main
```

### 2. Configurar Variáveis de Ambiente
```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar com suas configurações
nano .env
```

**Variáveis Essenciais:**
```env
# Banco de Dados (use sua URL de produção)
DATABASE_URL=postgresql://user:password@host:port/database

# JWT Secret (gere uma chave segura)
JWT_SECRET=sua-chave-super-secreta-aqui

# URLs de produção
FRONTEND_URL=https://seu-frontend.vercel.app
BACKEND_URL=https://seu-backend.render.com
```

## 🌐 Deploy Frontend - Vercel

### Opção A: Interface Web (Recomendada)

1. **Acesse** [vercel.com](https://vercel.com) e faça login
2. **Clique** em "New Project"
3. **Conecte** seu repositório GitHub
4. **Configure** as opções:
   - **Framework Preset:** Other
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `public`

5. **Adicione** variáveis de ambiente:
   ```
   NEXT_PUBLIC_API_URL=https://seu-backend.render.com
   ```

6. **Deploy!** 🎉

### Opção B: CLI do Vercel

```bash
# Instalar CLI
npm install -g vercel

# Navegar para frontend
cd frontend

# Login na Vercel
vercel login

# Deploy
vercel --prod

# Configurar domínio customizado (opcional)
vercel domains add seudominio.com
```

### Configurações Avançadas

**vercel.json** (na pasta frontend):
```json
{
  "version": 2,
  "builds": [
    {
      "src": "public/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    },
    {
      "src": "/api/(.*)",
      "dest": "https://seu-backend.render.com/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

## 🔧 Deploy Backend - Render

### 1. Configuração Inicial

1. **Acesse** [render.com](https://render.com) e faça login
2. **Clique** em "New +" → "Web Service"
3. **Conecte** seu repositório GitHub

### 2. Configurações do Serviço

**Configurações Básicas:**
- **Name:** `trocacerta-backend`
- **Environment:** `Node`
- **Region:** `Ohio (US East)`
- **Branch:** `main`
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Configurações Avançadas:**
- **Instance Type:** `Free` (para início)
- **Auto-Deploy:** `Yes`

### 3. Variáveis de Ambiente

Adicione no painel do Render:
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=sua-chave-super-secreta
FRONTEND_URL=https://seu-frontend.vercel.app
```

### 4. Configurar Banco de Dados

**Opção A: PostgreSQL no Render**
```bash
# No painel do Render
1. New + → PostgreSQL
2. Name: trocacerta-db
3. Database: trocacerta_prod
4. User: trocacerta
5. Copiar DATABASE_URL
```

**Opção B: Supabase (Recomendado)**
```bash
# Criar projeto no Supabase
1. Acesse supabase.com
2. New Project
3. Copie a Connection String
4. Use como DATABASE_URL
```

### 5. Deploy e Migrações

```bash
# Após deploy, executar migrações via Render Shell
npm run migrate

# Ou via script no package.json
"scripts": {
  "build": "npm run migrate",
  "start": "node src/server.js"
}
```

## 🐋 Deploy Alternativo - Heroku

### 1. Configuração Inicial
```bash
# Instalar CLI do Heroku
npm install -g heroku

# Login
heroku login

# Criar aplicação
heroku create trocacerta-backend
```

### 2. Configurar Add-ons
```bash
# PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Redis (para cache)
heroku addons:create heroku-redis:hobby-dev

# Verificar
heroku addons
```

### 3. Configurar Variáveis
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=sua-chave-secreta
heroku config:set FRONTEND_URL=https://seu-frontend.vercel.app
```

### 4. Deploy
```bash
# Preparar para deploy (apenas backend)
git subtree push --prefix=backend heroku main

# Ou criar Procfile na raiz
echo "web: cd backend && npm start" > Procfile
git add Procfile
git commit -m "Add Procfile"
git push heroku main
```

## 🐳 Deploy com Docker

### 1. Docker Compose Produção

**docker-compose.prod.yml:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: trocacerta_prod
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/trocacerta_prod
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    depends_on:
      - postgres
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
```

### 2. Deploy em VPS

```bash
# Conectar no servidor
ssh user@seu-servidor.com

# Clonar projeto
git clone https://github.com/yourusername/trocacerta.git
cd trocacerta

# Configurar ambiente
cp .env.example .env
nano .env

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Executar migrações
docker-compose exec backend npm run migrate
```

## 🌍 Configuração de Domínio

### 1. Configurar DNS

**Para Vercel (Frontend):**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

**Para Render (Backend):**
```
Tipo: CNAME  
Nome: api
Valor: seu-app.onrender.com
```

### 2. SSL/HTTPS

Ambas as plataformas fornecem SSL automático:
- ✅ **Vercel:** SSL automático
- ✅ **Render:** SSL automático
- ✅ **Let's Encrypt:** Para VPS próprio

### 3. Redirecionamentos

**Vercel (_redirects):**
```
/api/* https://api.seudominio.com/api/:splat 200
/* /index.html 200
```

## 📊 Monitoramento e Logs

### 1. Render Dashboard
```bash
# Acessar logs em tempo real
1. Dashboard do Render
2. Seu serviço
3. Aba "Logs"
4. "Live tail" para tempo real
```

### 2. Vercel Analytics
```bash
# Configurar no vercel.json
{
  "analytics": {
    "id": "seu-analytics-id"
  }
}
```

### 3. Monitoring de Uptime
```bash
# Usar serviços gratuitos:
- UptimeRobot
- StatusCake
- Pingdom

# Endpoints para monitorar:
- https://seu-frontend.vercel.app
- https://api.seudominio.com/health
```

### 4. Error Tracking
```bash
# Integrar Sentry (opcional)
npm install @sentry/node

# No servidor
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "YOUR_SENTRY_DSN" });
```

## 🔍 Troubleshooting

### Problemas Comuns

#### 1. Erro de Build no Vercel
```bash
# Verificar logs de build
vercel logs

# Problemas comuns:
- Node.js version incompatível
- Dependências faltando
- Variáveis de ambiente não configuradas
```

#### 2. Backend não conecta no banco
```bash
# Verificar variáveis de ambiente
heroku config # ou Render dashboard

# Testar conexão local
psql $DATABASE_URL

# Verificar migrações
npm run migrate
```

#### 3. CORS Issues
```javascript
// No backend (server.js)
app.use(cors({
    origin: [
        'https://seu-frontend.vercel.app',
        'http://localhost:3000'
    ],
    credentials: true
}));
```

#### 4. Variáveis de Ambiente não carregam
```bash
# Verificar se dotenv está configurado
require('dotenv').config();

# Verificar se as variáveis estão definidas
console.log(process.env.DATABASE_URL);
```

### Comandos de Debug

```bash
# Logs do Heroku
heroku logs --tail

# Logs do Render
# Via dashboard web

# Testar endpoints
curl -X GET https://api.seudominio.com/health
```

## ✅ Checklist Final

Antes de ir ao ar, verifique:

### Frontend ✅
- [ ] Build sem erros
- [ ] Todas as páginas carregam
- [ ] Design responsivo funciona
- [ ] Links externos funcionam
- [ ] SEO básico configurado

### Backend ✅
- [ ] Health check responde: `/health`
- [ ] Autenticação funciona
- [ ] CRUD de veículos funciona
- [ ] Migrações executadas
- [ ] Variáveis de ambiente configuradas

### Banco de Dados ✅
- [ ] Conexão estabelecida
- [ ] Tabelas criadas
- [ ] Seeds executados (opcional)
- [ ] Backup configurado

### Segurança ✅
- [ ] HTTPS ativo
- [ ] CORS configurado
- [ ] Rate limiting ativo
- [ ] JWT secret seguro
- [ ] Headers de segurança

### Monitoramento ✅
- [ ] Logs acessíveis
- [ ] Uptime monitoring
- [ ] Error tracking (opcional)
- [ ] Performance monitoring

## 🎉 Sucesso!

Após seguir este guia, seu TrocaCerta estará rodando em produção!

**URLs finais:**
- 🌐 **Frontend:** https://seu-frontend.vercel.app
- 🔧 **Backend:** https://api.seudominio.com
- 📊 **Admin:** https://api.seudominio.com/health

**Próximos passos:**
1. Configurar domínio personalizado
2. Implementar analytics
3. Configurar monitoring
4. Adicionar sistema de backup
5. Implementar CI/CD completo

---

### 📞 Suporte

Se encontrar problemas:
- 📧 Email: suporte@trocacerta.com
- 💬 Discord: [Comunidade](https://discord.gg/trocacerta)
- 📖 Docs: [Documentação](./README.md)

**Happy deploying! 🚀**
