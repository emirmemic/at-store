# AT Store

E-commerce application built with Next.js and Strapi.

## Live Demo

- Frontend: <https://atstore.rovoit.com>
- Backend API: <https://atserver.rovoit.com>

## Installation and Setup

1. Install all dependencies for both client and server:

   ```bash
   npm run setup
   ```

## Development

Start the development environment:

```bash
npm run dev
```

This will launch:

- Strapi backend at <http://localhost:1337>
- Next.js frontend at <http://localhost:3000>

## Production

Build and start the production environment:

```bash
npm run build
npm run start
```

## Available Scripts

### Development Scripts

- `npm run dev` - Start both client and server in development mode
- `npm run client` - Start Next.js client only
- `npm run server` - Start Strapi server only

### Build and Production

- `npm run build` - Build both client and server
- `npm run start` - Start both in production mode
- `npm run build-client` - Build Next.js client
- `npm run build-server` - Build Strapi server
- `npm run start-client` - Start Next.js in production
- `npm run start-server` - Start Strapi in production

### Setup

- `npm run setup` - Install all dependencies
- `npm run seed` - Import initial data
