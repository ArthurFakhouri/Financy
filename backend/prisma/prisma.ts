import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { defineConfig, env } from "prisma/config";
import { PrismaClient } from "../src/generated/prisma/client";

export default defineConfig({
  schema: "schema.prisma",
  migrations: {
    path: "migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? '' });

export const prismaClient = new PrismaClient({ adapter })
