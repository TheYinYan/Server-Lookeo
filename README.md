# Server-Lookeo

API REST backend del proyecto intermodular **Lookeo** (DAM). Expone autenticación con JWT y un CRUD de usuarios sobre PostgreSQL.

Estado actual (tag `v0.2.0`): base del servidor + módulo de auth y usuarios.

---

## 👥 Equipo

| Nombre   | Rol            | GitHub                                     |
| -------- | -------------- | ------------------------------------------ |
| Samuel   | Desarrollador  | [@TheYinYan](https://github.com/TheYinYan) |
| Mari Paz | Desarrolladora | [@mpjmar](https://github.com/mpjmar)       |

> Los roles son orientativos y se pueden rotar durante el proyecto.

---


## 🧩 Repositorios del proyecto

| Repo | Descripción | Enlace |
|------|-------------|--------|
| **Principal** | Descripción del proyecto       | [Enlace](https://github.com/TheYinYan/Proyecto_Intermodular) |
| **Lookeo-Móvil** | App móvil                   | [Enlace](https://github.com/TheYinYan/Lookeo-Movil) |
| **Lookeo-Web** | App web                       | [Enlace](https://github.com/TheYinYan/Lookeo-Web) |
| _Server-Lookeo_| Servidor/API REST (este repo) | [Enlace](https://github.com/TheYinYan/Server-Lookeo)         |

## Stack

| Área | Tecnología |
|------|------------|
| Runtime | Node.js (ES modules) |
| Lenguaje | TypeScript |
| Framework | Express 5 |
| Base de datos | PostgreSQL 16 |
| ORM | Prisma 6 |
| Validación | Zod |
| Auth | JWT + bcrypt |
| Seguridad / logs | Helmet, CORS, Morgan |
| Contenedores | Docker Compose (solo la BD) |

## Arquitectura

Organización modular por dominio: **routes → controller → service**.

```mermaid
flowchart LR
  Client[Cliente] --> Express[Express]
  Express --> Auth[modules/auth]
  Express --> Users[modules/users]
  Auth --> Prisma[Prisma]
  Users --> Prisma
  Prisma --> Postgres[(PostgreSQL)]
```

## Estructura del proyecto

```
Server-Lookeo/
├── docker-compose.yml      # PostgreSQL (lookeo-db)
├── prisma/
│   ├── schema.prisma       # Modelo User
│   └── migrations/
├── src/
│   ├── index.ts            # Arranque del servidor
│   ├── app.ts              # Middlewares y montaje de rutas
│   ├── config/
│   │   ├── env.ts          # Variables de entorno (Zod)
│   │   └── db.ts           # Cliente Prisma
│   └── modules/
│       ├── auth/           # Registro y login
│       └── users/          # CRUD de usuarios
├── package.json
└── tsconfig.json
```

## Requisitos

- Node.js y npm
- Docker (para PostgreSQL)

## Configuración

### 1. Base de datos

```bash
docker compose up -d
```

| Parámetro | Valor |
|-----------|-------|
| Contenedor | `lookeo-db` |
| Imagen | `postgres:16` |
| Puerto | `5432` |
| Usuario / contraseña | `postgres` / `postgres` |
| Base de datos | `lookeo` |

### 2. Variables de entorno

Crea un archivo `.env` en la raíz (no se versiona):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lookeo"
JWT_SECRET="cambia-este-secreto-largo"
PORT=3000
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=10
NODE_ENV=development
```

| Variable | Obligatoria | Default | Descripción |
|----------|-------------|---------|-------------|
| `DATABASE_URL` | Sí | — | Conexión a PostgreSQL |
| `JWT_SECRET` | Sí | — | Secreto JWT (mín. 16 caracteres) |
| `PORT` | No | `3000` | Puerto HTTP |
| `JWT_EXPIRES_IN` | No | `7d` | Caducidad del token |
| `BCRYPT_ROUNDS` | No | `10` | Coste de hash de contraseñas |
| `NODE_ENV` | No | `development` | `development` \| `production` \| `test` |

## Instalación y ejecución

```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

La API queda en `http://localhost:3000`.

### Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Desarrollo con hot reload (`tsx watch`) |
| `npm run build` | Compila TypeScript a `dist/` |
| `npm start` | Ejecuta la build de producción |
| `npm test` | Reservado (Jest aún no configurado) |

## API

### Health

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/health` | Comprueba que la API responde |

Ejemplo de respuesta:

```json
{ "status": "ok", "message": "Lookeo API funcionando" }
```

### Auth (`/api/auth`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Registro (email, name, password ≥ 8). Devuelve usuario + JWT (`201`). `409` si el email ya existe |
| `POST` | `/api/auth/login` | Login. Devuelve usuario (sin hash) + JWT. `401` si las credenciales no son válidas |

**Registro**

```json
{
  "email": "user@example.com",
  "name": "Ana",
  "password": "password1"
}
```

**Login**

```json
{
  "email": "user@example.com",
  "password": "password1"
}
```

### Users (`/api/users`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/users` | Lista usuarios (sin `passwordHash`) |
| `GET` | `/api/users/:id` | Obtiene un usuario por id |
| `PUT` | `/api/users/:id` | Actualiza `name` y/o `email` |
| `DELETE` | `/api/users/:id` | Elimina el usuario (`204`) |

**Actualizar**

```json
{
  "name": "Nuevo nombre",
  "email": "nuevo@example.com"
}
```

> **Nota:** las rutas de `/api/users` aún no exigen JWT; están abiertas.

## Modelo de datos

Única entidad actual en Prisma:

**User**

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | `Int` | PK, autoincrement |
| `email` | `String` | Único |
| `name` | `String` | |
| `passwordHash` | `String` | Hash bcrypt (no se expone en respuestas) |
| `createdAt` | `DateTime` | Por defecto `now()` |

## Licencia

ISC
