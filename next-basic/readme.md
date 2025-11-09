# NextJS Starter

## Database setup

- Setting up environment variables
   ```
   # database stuff
   DATABASE_USER="punpun"
   DATABASE_PASSWORD="super-secure-password-123"
   DATABASE_NAME="nextjs-starter-database"
   DATABASE_URL="postgresql://punpun:super-secure-password-123@localhost:5432/nextjs-starter-database"
   ```

- Starting the Docker container
   ```
   docker compose up -d
   ```

- Setting up Prisma
   ```
   pnpm prisma generate
   pnpm prisma db push
   ```
   