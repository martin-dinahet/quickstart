import "dotenv/config";
import { resolve } from "node:path";
import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

config({ path: resolve(__dirname, ".env") });

export default defineConfig({
	schema: resolve(__dirname, "prisma/schema.prisma"),
	migrations: {
		path: "prisma/migrations",
	},
	engine: "classic",
	datasource: {
		url: env("DATABASE_URL"),
	},
});
