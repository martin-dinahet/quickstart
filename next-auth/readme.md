# NextJS Starter

## Database setup

- Setting up environment variables
   ```
   # database stuff
   DATABASE_USER="punpun"
   DATABASE_PASSWORD="super-secure-password-123"
   DATABASE_NAME="nextjs-starter-database"
   DATABASE_URL="postgresql://punpun:super-secure-password-123@localhost:5432/nextjs-starter-database"

   # authentication stuff
   BETTER_AUTH_SECRET="DZq9fTDhtTg0zlQUtpx4Jo9zIkqiyyBo"
   BETTER_AUTH_URL="http://localhost:3000"
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
   