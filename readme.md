# Quickstart

## Installation process

- Cloning & installing dependencies
  ```
  git clone https://github.com/martin-dinahet/quickstart.git -b v2
  cd quickstart/
  rm .git
  pnpm i
  ```

- Setting up environment variables
  ```
  # database stuff
  DATABASE_USER="punpun"
  DATABASE_PASSWORD="super-secure-password-123"
  DATABASE_NAME="quickstart-database"
  DATABASE_URL="postgresql://punpun:super-secure-password-123@localhost:5432/quickstart-database"

  # authentication stuff
  BETTER_AUTH_SECRET="DZq9fTDhtTg0zlQUtpx4Jo9zIkqiyyBo"
  BETTER_AUTH_URL="http://localhost:3000"
  ```

- Start the docker container
  ```
  docker compose up -d
  ```

- Push the tables to the database
  ```
  pnpm drizzle:push
  ```

- Start the development server
  ```
  pnpm next:dev
  ```
