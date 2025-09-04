# 🚗 TrocaCerta - MicroSaaS de Gestão Veicular

Sistema inteligente para gestão automática de manutenção veicular com notificações por tempo e quilometragem.

![TrocaCerta Logo](https://via.placeholder.com/800x200/3B82F6/FFFFFF?text=TrocaCerta)

## 📋 Sobre o Projeto

O **TrocaCerta** é um microSaaS completo que ajuda proprietários de veículos a nunca perderem prazos de manutenção. O sistema monitora automaticamente os veículos cadastrados e envia alertas inteligentes baseados em tempo e quilometragem.

### ✨ Funcionalidades Principais

- 🔐 **Autenticação Completa**: Login/cadastro com email/senha e integração Google OAuth
- 🚗 **Gestão de Veículos**: Cadastro completo com marca, modelo, ano, quilometragem
- ⏰ **Alertas Inteligentes**: Notificações automáticas por tempo e quilometragem
- 📊 **Dashboard Analytics**: Visão geral de manutenções e gastos
- 💳 **Sistema de Planos**: Free, Básico (R$ 5,90) e Premium (R$ 19,90)
- 📧 **Notificações Multi-canal**: Email e WhatsApp (planos pagos)
- 📱 **Design Responsivo**: Interface otimizada para desktop e mobile

## 🎯 Planos de Assinatura

### 🆓 **Free**
- Lembrete de troca de óleo
- 1 veículo
- Notificações por email

### 💎 **Básico - R$ 5,90/mês**
- Todas as funções do Free
- Alertas para filtros, velas, freios, bateria
- Até 3 veículos
- Suporte prioritário

### 🏆 **Premium - R$ 19,90/mês**
- Todas as funções do Básico
- Cobertura total de manutenções
- Veículos ilimitados
- Notificações WhatsApp + Email
- Relatórios avançados

## 🛠️ Stack Tecnológica

### Frontend
- **HTML5/CSS3/JavaScript** - Base sólida e performática
- **Tailwind CSS** - Design system moderno
- **Font Awesome** - Ícones profissionais
- **Design Responsivo** - Mobile-first approach

### Backend
- **Node.js + Express** - API REST robusta
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação segura
- **Bcrypt** - Criptografia de senhas
- **Knex.js** - Query builder e migrations

### DevOps & Deploy
- **Docker** - Containerização completa
- **Nginx** - Servidor web otimizado
- **Vercel** - Deploy frontend
- **Render/Heroku** - Deploy backend
- **GitHub Actions** - CI/CD automatizado

## 📦 Estrutura do Projeto

```
trocacerta-microsaas/
├── 📁 frontend/                 # Interface do usuário
│   ├── 📁 public/              # Arquivos estáticos
│   │   └── index.html          # Página principal
│   ├── 📁 src/
│   │   ├── 📁 assets/
│   │   │   ├── 📁 css/         # Estilos customizados
│   │   │   ├── 📁 js/          # JavaScript da aplicação
│   │   │   └── 📁 images/      # Imagens e ícones
│   │   ├── 📁 components/      # Componentes reutilizáveis
│   │   └── 📁 pages/           # Páginas da aplicação
│   ├── Dockerfile             # Container frontend
│   ├── nginx.conf             # Configuração nginx
│   └── package.json           # Dependências frontend
├── 📁 backend/                 # API REST
│   ├── 📁 src/
│   │   ├── 📁 controllers/     # Controladores
│   │   ├── 📁 models/          # Modelos de dados
│   │   ├── 📁 routes/          # Rotas da API
│   │   ├── 📁 middleware/      # Middlewares
│   │   ├── 📁 services/        # Serviços de negócio
│   │   ├── 📁 config/          # Configurações
│   │   └── server.js           # Servidor principal
│   ├── 📁 database/
│   │   ├── 📁 migrations/      # Migrações do banco
│   │   └── 📁 seeds/           # Dados iniciais
│   ├── Dockerfile             # Container backend
│   ├── knexfile.js            # Configuração do banco
│   └── package.json           # Dependências backend
├── 📁 docs/                   # Documentação
├── 📁 scripts/                # Scripts de automação
├── 📁 .github/workflows/      # GitHub Actions
├── docker-compose.yml         # Orquestração de containers
├── .env.example              # Variáveis de ambiente
├── .gitignore                # Arquivos ignorados
└── README.md                 # Este arquivo
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js (>= 16.0.0)
- PostgreSQL (>= 12)
- Docker (opcional)
- Git

### 1️⃣ Clone o Repositório
```bash
git clone https://github.com/yourusername/trocacerta.git
cd trocacerta
```

### 2️⃣ Configuração do Ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite as variáveis de ambiente
nano .env
```

### 3️⃣ Instalação com Docker (Recomendado)
```bash
# Inicie todos os serviços
docker-compose up -d

# Verifique os containers
docker-compose ps

# Acesse a aplicação
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

### 4️⃣ Instalação Manual

#### Backend
```bash
cd backend

# Instale as dependências
npm install

# Configure o banco de dados
npm run migrate
npm run seed

# Inicie o servidor
npm run dev
```

#### Frontend
```bash
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### 5️⃣ Configuração do Banco de Dados

#### PostgreSQL Local
```sql
-- Criar banco de dados
CREATE DATABASE trocacerta_dev;
CREATE USER trocacerta WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE trocacerta_dev TO trocacerta;
```

#### Migrações
```bash
cd backend

# Executar migrações
npm run migrate

# Rollback (se necessário)
npm run migrate:rollback

# Adicionar dados de exemplo
npm run seed
```

## 📊 API Documentation

### Endpoints Principais

#### 🔐 Autenticação
```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/verify
```

#### 🚗 Veículos
```http
GET    /api/vehicles
POST   /api/vehicles
GET    /api/vehicles/:id
PUT    /api/vehicles/:id
DELETE /api/vehicles/:id
```

#### 🔧 Manutenções
```http
GET    /api/maintenances
POST   /api/maintenances
PUT    /api/maintenances/:id
DELETE /api/maintenances/:id
```

#### 🔔 Notificações
```http
GET    /api/notifications
POST   /api/notifications/mark-read/:id
```

#### 💳 Planos
```http
GET    /api/plans
POST   /api/plans/subscribe
PUT    /api/plans/change
```

## 🌐 Deploy em Produção

### Vercel (Frontend)
```bash
cd frontend

# Instalar CLI da Vercel
npm i -g vercel

# Deploy
vercel --prod
```

### Render (Backend)
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático ativado

### Heroku (Alternativa)
```bash
# Criar aplicação
heroku create trocacerta-backend

# Adicionar PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git push heroku main
```

### Docker em Produção
```bash
# Build das imagens
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

## 🧪 Testes

```bash
# Backend
cd backend
npm test

# Frontend (quando configurado)
cd frontend
npm test

# Testes E2E
npm run test:e2e
```

## 📈 Monitoramento

### Health Checks
```bash
# Backend health
curl http://localhost:3001/health

# Response esperado
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "environment": "development"
}
```

### Logs
```bash
# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Aplicação logs
tail -f backend/logs/app.log
```

## 🔒 Segurança

### Medidas Implementadas
- ✅ **Rate Limiting** - Proteção contra spam
- ✅ **Helmet** - Headers de segurança
- ✅ **CORS** - Controle de origem
- ✅ **JWT** - Autenticação stateless
- ✅ **Bcrypt** - Hash de senhas
- ✅ **Validação** - Joi para inputs
- ✅ **HTTPS** - Certificados SSL

### Configurações Recomendadas
```javascript
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});

// JWT expiration
const token = jwt.sign(payload, secret, { expiresIn: '7d' });
```

## 🚀 Roadmap

### v1.1 (Próxima Release)
- [ ] Integração WhatsApp Business API
- [ ] Sistema de pagamentos Mercado Pago
- [ ] Relatórios em PDF
- [ ] Notificações push
- [ ] Dark mode

### v1.2 (Futuro)
- [ ] App mobile React Native
- [ ] Integração com oficinas
- [ ] Marketplace de peças
- [ ] IA para previsão de manutenções
- [ ] API para terceiros

## 🤝 Contribuição

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Padrões de Código
```bash
# Linting
npm run lint

# Formatação
npm run format

# Pré-commit hooks
npm run pre-commit
```

## 📞 Suporte

### Canais de Contato
- 📧 **Email**: suporte@trocacerta.com
- 💬 **WhatsApp**: +55 11 99999-9999
- 🌐 **Site**: https://trocacerta.com
- 📱 **Discord**: [Comunidade TrocaCerta](https://discord.gg/trocacerta)

### Documentação Adicional
- [API Reference](docs/api.md)
- [Deployment Guide](docs/deployment.md)
- [Contributing Guidelines](docs/contributing.md)
- [Troubleshooting](docs/troubleshooting.md)

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Font Awesome](https://fontawesome.com/) - Ícones
- [Node.js](https://nodejs.org/) - Runtime JavaScript
- [PostgreSQL](https://postgresql.org/) - Banco de dados
- [Express](https://expressjs.com/) - Framework web

---

<div align="center">

**🚗 Desenvolvido com ❤️ para manter seu carro sempre em dia**

[Website](https://trocacerta.com) • [Documentação](docs/) • [API](api/) • [Suporte](mailto:suporte@trocacerta.com)

[![Made with Node.js](https://img.shields.io/badge/Made%20with-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Powered by PostgreSQL](https://img.shields.io/badge/Powered%20by-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>
