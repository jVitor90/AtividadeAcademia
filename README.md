# Academia API

API REST para gerenciamento de academia — alunos, funcionários e planos.

## Requisitos

- Node.js 18+
- PostgreSQL

## Setup

```bash
git clone <url-do-repositorio>
cd academia
npm install
```

Crie o `.env` na raiz:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/academia_db"
JWT_SECRET="chave_secreta"
PORT=3000
```

## Banco de dados

Crie um banco no PostgreSQL e aponte a `DATABASE_URL` para ele. Depois rode:

```bash
npx prisma generate
npx prisma migrate deploy
```

## Rodando

```bash
npm run dev      # desenvolvimento
npm run build    # build
npm start        # produção
```

## Endpoints

| Método | Rota | Auth |
|--------|------|:----:|
| POST | `/login` | ❌ |
| POST | `/funcionarios` | ❌ |
| GET/PUT/DELETE | `/funcionarios/:id` | ✅ |
| GET | `/funcionarios` | ✅ |
| POST/GET | `/alunos` | ✅ |
| GET/PUT/DELETE | `/alunos/:id` | ✅ |
| POST/GET | `/planos` | ✅ |
| GET/PUT/DELETE | `/planos/:id` | ✅ |

Rotas com ✅ requerem `Authorization: Bearer <token>`.